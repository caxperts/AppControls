
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { Application, SelectionChanged } from '@caxperts/universal.api';


function Content() {

    // Function gets called if a selection change happend
    async function callback(selection:SelectionChanged) {
        //Retrieve the scene and filter element
        let scene = (await Application.getInstance().Scenes3d.get())[0]
        let filter = scene.getNewFilter();

        //Depending on if we have 0 or more elements either call clearColor on all Elements or Color a specific one in Red (#FF0000)
        if(selection.Objects.length == 0){
            //Use a match all query like Uid=* to include all elements
            filter.Condition = "Uid=*"
            //call api to set the color of the objects back to default
            await filter.clearColor();
        }else{
            //selection.Objects is a list of all the Uids of the selected elements. with [0] we access the first element and create a UID condition
            filter.Condition = "Uid="+selection.Objects[0]
            //call api to set color to red
            await filter.color("#FF0000");

        }
    }

    //Use useEffect to register/deregister the event when the component loads/unloads
    useEffect( () => {
        //Obtain a reference to the Events system
        let events = Application.getInstance().Events;
        //use the useEffectWrapper to register for an event (in this case registerSelectionChangedEvent) and supply a callback
        //the return value of useEffectWrapper is a function that will remove the event again. This is needed for react to ensure on rerender only one event is registered
        return events.useEffectWrapper(events.registerSelectionChangedEvent, callback)

        /* Its also possible to not use the wrapper with the following code but its easier to use the wrapper
        //Register callback changed event the returned value is a promise that will in future contain the event id used for cleanup
        let response = Application.getInstance().Events.registerSelectionChangedEvent(callback);

        //if the content is un/reloaded make sure to remove the event before creating the new one by returning a cleanup function
        return () => {
        // if the initializing was not completed yet wait till it was completed and then remove the event.
            response.then(Application.getInstance().Events.removeEvent)
        };
        */

    });

    return (
        <>
            {/* Define a stack to place the Header and buttons underneath each other */}
            <Stack spacing={2} direction="column">
                {/* Center the header. This is possible with multiple ways but this is an easy variant */}
                <Typography align='center' variant='h4'>
                    AppControl Events
                </Typography>
                Select an object inside UPV to color it Red. Select no object to reset the colors of all objects
            </Stack>
        </>
    );
}

export default Content;
