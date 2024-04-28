import { useEffect } from 'react';
import './style.css'
import { Application, SelectionChanged } from "@caxperts/universal.api";

export default function Events() {

    // This function will be called if an element was selected or deselected. The eventData contains all elements currently selected
    async function callback(eventData: SelectionChanged) {
        //Retrieve the scene and filter element
        let scene = (await Application.getInstance().Scenes3d.get())[0]
        let filter = scene.getNewFilter();

        //Depending on if we have 0 or more elements either call clearColor on all Elements or Color a specific one in Red (#FF0000)
        if(eventData.Objects.length == 0){
            //Use a match all query like Uid=* to include all elements
            filter.Condition = "Uid=*"
            //call api to set the color of the objects back to default
            await filter.clearColor();
        }else{
            //selection.Objects is a list of all the Uids of the selected elements. with [0] we access the first element and create a UID condition
            filter.Condition = "Uid="+eventData.Objects[0]
            //call api to set color to red
            await filter.color("#FF0000");

        }
    }

    useEffect(() => {
        const events = Application.getInstance().Events;

        return events.useEffectWrapper(events.registerSelectionChangedEvent, callback);
    }, [])

    return (
        <div className="container">
            <h1>Sample 03: Events</h1>
            <p>This a sample on how you can use the Universal Api to listen to events from UPV</p>
            <p> If you click on an object in UPV it will be colored red. If you click nothing it will reset the color on all elements</p>
        </div>
    );
}