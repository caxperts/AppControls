import Stack from '@mui/material/Stack';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import { Application } from '@caxperts/universal.api';


function Content() {

    // We define a reference to a HTMLInputElement. This will be later bound and used to access the value of the input field
    let conditionRef = useRef<HTMLInputElement>()
    let actionRef = useRef<HTMLSelectElement>()

    async function execute() {
        // Check if we are running inside UPV
        let runningInUPV = Application.getInstance().available()
        console.log(runningInUPV)

        // get a 3D scene element
        let scene = (await Application.getInstance().Scenes3d.get())[0]
        // get a new filter
        let filter = scene.getNewFilter();
        // Set the condition of the filter based on the value of the text field
        filter.Condition = conditionRef.current?.value;

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
                </TextField>
                { /* Define the MUI Button that calls our function if clicked */}
                <Button variant='contained' onClick={execute}>Run Action</Button>

            </Stack>

        </>
    );
}

export default Content;
