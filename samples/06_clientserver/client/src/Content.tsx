import { useEffect, useRef, useState } from "react"
import { URLBase } from "./Config"
import { PieChart } from "@mui/x-charts/PieChart"
import { PieValueType } from "@mui/x-charts"
import { Button, MenuItem, Stack, TextField, Typography } from "@mui/material"
import { Application } from "@caxperts/universal.api"
import { ElementStatus, StatusEnum, getColor, getCondition, getIdentifier, getPrettyName } from "./DataStructures"


export default function Content() {
    // A state storing the data loaded directly from the API
    const [loadedData, setLoadedData] = useState<ElementStatus[]>([])
    // state used for the PieChart visualisation
    const [seriesData, setSeriesData] = useState<PieValueType[]>([])
    // Message to display to the user
    const [message, setMessage] = useState<string>("")
    // Reference to the select element that is used to select the new state
    const statusSelectRef = useRef<HTMLSelectElement>()

    // Function to load data from the API and apply it to the model as colors
    async function fetchData() {
        // URLBase is defined in the config.ts file and should point to the API server
        // on the /status endpoint it returns all the element statuses inside an array
        const data: ElementStatus[] = await (await fetch(URLBase + "/status")).json();
        //we store the data in our state for the other series data generration to start
        setLoadedData(data)

        // This section applies the colors to the 3d elements of the scene
        const filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter()
        // We iterate through all the statuses eturned from the api to apply the colors.
        // Note that a foreach loop itself doesnt handle async fucntion. 
        // They can be used but it will start multiple request simultaniuosly. But in this case this wouldnt matter
        for (const element of data) {
            // We create a new condition using a helper function
            filter.Condition = getCondition(element)
            // We apply the color with the color provided by the getColor helper function
            filter.color(getColor(element.currentElementStatus))
            // We are not awaiting the color command since the order of excution is not important for us and the result doesnt matter..
            // This has the additional benefit of improving the Api throuput a lot.
            // Normally if awaited in most cases the API is UPV Framebound. So each response can only be send on a frame border (60fps)
            // For more performance batching can be used to combine multiple conditions into one
        }
    }

    // On loading this component start the data fetching
    useEffect(() => {
        fetchData();
    }, [])

    // If loaded data is updated calculate the PieChart data
    useEffect(() => {
        let counter = 0;
        const dict: { [key: string]: PieValueType } = {}
        // Iterate through all elements and count the elements per each state
        loadedData.forEach(element => {
            if (!(element.currentElementStatus in dict)) {
                dict[element.currentElementStatus] = { id: counter++, value: 0, label: getPrettyName(element.currentElementStatus), color: getColor(element.currentElementStatus) }
            }
            dict[element.currentElementStatus].value++;
        });
        setSeriesData(Object.values(dict))

    }, [loadedData])

    // This funtion calls an API to update the state of the selected elements
    async function updateStatusOfSelected() {
        // Get a new filter
        const filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter()
        // Include all attributes
        filter.IncludeAttributes = true;
        // Get the currely selected objects
        const elements = await filter.getSelectedObjects();
        // Counter to keep tract of the updated elements
        let updatedElementsCounter = 0;
        // retrieve the identifier of the element and only keep unique values
        let unique = [...new Set(elements.map(getIdentifier))];
        for (const element of unique) {
            // if an element does not exist on the database a 400 error is returned. This will cause fetch to return an exception
            try {
                // /updatestatus is a post endpoint that will update the status of an element
                await fetch(URLBase + '/updatestatus', {
                    // Method type is POST
                    method: 'POST',
                    // Since we transfer a json element that the content type here
                    headers: { 'Content-Type': 'application/json' },
                    // Send the element as a json string in the body
                    body: JSON.stringify({
                        elementName: element,
                        currentElementStatus: statusSelectRef.current?.value
                    })
                });
                // If succesful update the counter
                updatedElementsCounter++;
            } catch (error) {
                // Ignored
            }
        }
        // Set Message to display to the user
        setMessage(`Udpated status of ${elements.length} elements (${updatedElementsCounter} tags) to ${getPrettyName(statusSelectRef.current?.value as StatusEnum)}`)
        // Retrieve the newest data from the Api and display it to the user again
        fetchData();
    }

    return (<> {/* Define a stack to place the Header and buttons underneath each other */}
        <Stack spacing={2} direction="column">
            {/* Center the header. This is possible with multiple ways but this is an easy variant */}
            <Typography align='center' variant='h4'>
                Database
            </Typography>
            <Typography align='center'>
                This shows graphs feed from a database and allows the updating of the values inside the database
            </Typography>
            <Typography align='left'>
                {message}
            </Typography>
            {/* Select element that contains the possibilities for the new status */}
            <TextField label='New Status' variant='filled' defaultValue={StatusEnum.Build} select inputRef={statusSelectRef}>
                {/* Create 3 Menuitems for the actions we want to perform */}
                <MenuItem value={StatusEnum.Build}>{getPrettyName(StatusEnum.Build)}</MenuItem>
                <MenuItem value={StatusEnum.InstallationOngoing}>{getPrettyName(StatusEnum.InstallationOngoing)}</MenuItem>
                <MenuItem value={StatusEnum.ReadyForConstruction}>{getPrettyName(StatusEnum.ReadyForConstruction)}</MenuItem>
                <MenuItem value={StatusEnum.WaitingForMaterial}>{getPrettyName(StatusEnum.WaitingForMaterial)}</MenuItem>
            </TextField>
            {/* Button to send the new status to the database */}
            <Button variant="contained" onClick={updateStatusOfSelected}>Update Status for Element</Button>
        </Stack>
        {/* Pie chart that shows the count of the diffrent tags for each status*/}
        <PieChart series={[{ data: seriesData, cx: 140 }]} width={450} height={200} />
    </>)
}