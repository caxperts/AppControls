import Stack from '@mui/material/Stack';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import { Application, AttributeConditionComparison, CombineModes, ConsolidationMode, PackageCondition } from '@caxperts/universal.api';


function Content() {

    // We define a reference to a HTMLInputElement. This will be later bound and used to access the value of the input field
    const conditionRef = useRef<HTMLInputElement>();
    const actionRef = useRef<HTMLSelectElement>();
    const combineModeRef = useRef<HTMLSelectElement>();
    const packageFilterRef = useRef<HTMLSelectElement>();

    async function execute() {
        // Check if we are running inside UPV
        const runningInUPV = Application.getInstance().available();
        console.log(runningInUPV);

        // get a 3D scene element
        const scene = (await Application.getInstance().Scenes3d.get())[0];
        // get a new filter
        const filter = scene.getNewFilter();
        // Set the condition of the filter based on the value of the text field the & symbol can be used to combine multiple queries. THe combinemode defines how they are combined.
        filter.Condition = conditionRef.current?.value;

        // Based on the action value we either select, fit or highlight
        switch (combineModeRef.current?.value) {
            case "And":
                filter.CombineMode = CombineModes.And;
                break;
            case "Or":
                filter.CombineMode = CombineModes.Or;
                break;
        }
        
        switch (combineModeRef.current?.value) {
            // if we say yes we will peform the action using this Package filter. This is applied on top of the condition and combinemode.
            case "Yes":
                filter.APIPackageFilter = {
                    Name: "APIFilter",
                    Conditions: [
                        // Every first Condition is a base Condition that the other ones are based upon
                        // In this condition we create the condition Area System = Sulphur Recovery Area-A
                        PackageCondition.createAttributeCondition(ConsolidationMode.Base, "Area System", AttributeConditionComparison.Equals, "Sulphur Recovery Area-A"),
                        // The second condition extends the first by defining that Task should be Equipment-
                        PackageCondition.createAttributeCondition(ConsolidationMode.And, "Task", AttributeConditionComparison.Equals, "Equipment"),
                        // The last condition states stat the Name cannot be D-240
                        PackageCondition.createAttributeCondition(ConsolidationMode.AndNot, "Name", AttributeConditionComparison.Equals, "D-240"),
                        //Various other conditions are also possible. Live VolumeConditions or groups / IntelliGroups
                    ]
                }
                break;
        }

        // Based on the action value we either select, fit or highlight
        switch (actionRef.current?.value) {
            case "Select":
                await filter.select();
                break;
            case "Fit":
                await filter.fit();
                break;
            case "Highlight":
                await filter.highlight();
                break;
            case "All":
                //The can be called one after the other to perform all the actions
                await filter.select();
                await filter.fit();
                await filter.highlight();
                break;
        }
    }

    return (
        <>
            {/* Define a stack to place the Header and buttons underneath each other */}
            <Stack spacing={2} direction="column">
                {/* Center the header. This is possible with multiple ways but this is an easy variant */}
                <Typography align='center' variant='h4'>
                    AppControl input field & Dropdown sample
                </Typography>

                {/* Define the MUI Textfield. A defaultvalue can be set using the defaultValue parameter. We also link the reference we created earlier */}
                <TextField variant='filled' defaultValue={"Name=D-240"} inputRef={conditionRef} label='Condition' />
                { /* Create a Textfield that acts as a select element. There is also a Select MUi element that allows more customisation */}
                <TextField label='Action' variant='filled' defaultValue={"Select"} select inputRef={actionRef}>
                    {/* Create 3 Menuitems for the actions we want to perform */}
                    <MenuItem value="Select">Select</MenuItem>
                    <MenuItem value="Fit">Fit</MenuItem>
                    <MenuItem value="Highlight">Highlight</MenuItem>
                    <MenuItem value="All">All</MenuItem>
                </TextField>
                { /* Create a Textfield that acts as a select element. There is also a Select MUi element that allows more customisation */}
                <TextField label='Condition Combine Mode' variant='filled' defaultValue={"And"} select inputRef={combineModeRef}>
                    {/* Create 3 Menuitems for the actions we want to perform */}
                    <MenuItem value="And">And</MenuItem>
                    <MenuItem value="Or">Or</MenuItem>
                </TextField>
                { /* Create a Textfield that acts as a select element. There is also a Select MUi element that allows more customisation */}
                <TextField label='Use Package Filter (defined in code)' variant='filled' defaultValue={"No"} select inputRef={packageFilterRef}>
                    {/* Create 3 Menuitems for the actions we want to perform */}
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Yes">Yes</MenuItem>
                </TextField>
                { /* Define the MUI Button that calls our function if clicked */}
                <Button variant='contained' onClick={execute}>Run Action</Button>

            </Stack>

        </>
    );
}

export default Content;
