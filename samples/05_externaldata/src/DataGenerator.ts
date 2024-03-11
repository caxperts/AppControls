import { useEffect, useState } from "react"
import { TabData } from "./Structures"
import { Application, SelectionChanged } from "@caxperts/universal.api";

// We create a custom use hook this provides the data and capsules the UPV API
export function useTabData() {
    // we create a state variable. tabData is later returned to be used by our components. 
    // setTabData is used to update the data on updates
    const [tabData, setTabData] = useState<TabData[]>([])

    //Callback function for when a selection changed event is triggered
    async function selectionChangedCallback(_: SelectionChanged) {
        // Create a filter for the 3D Scene
        const filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter()
        // We are intrested in Attributes so we include them in the response
        filter.IncludeAttributes = true
        // We request the currently selected elements using the filter.
        // If we are only intrested in the UID we can skip the filter and use the passed parameter instead
        // this could be the case if the same UIDs are mappend in an external system
        const selected = await filter.getSelectedObjects()

        // if no elements are selected we return an empty array
        if (selected.length == 0) {
            setTabData([])
            return;
        }
        // If we have atleast one selected element we initialize the result array
        let result: TabData[] = []

        // this is the first tab and we just use all the attributes in here
        result.push({
            name: "Attributes",
            //This maps the UPV Attribute Array into the KeyValuePair array we need. We are only using attributes of the first element
            data: selected[0].Attributes!.map((x) => { return { key: x.Key, value: x.Value } })
        })

        // If the Task attribute is Equipment we create an Equipment Tab
        if (selected[0].getAttribute("Task") == "Equipment") {
            result.push({
                name: "Equipment",
                // In this case we are only intrested in some of the elements so we add them to the array individually.
                data: [
                    { key: "Name", value: selected[0].getAttribute("Name") },
                    { key: "Eqp Type 0", value: selected[0].getAttribute("Eqp Type 0") },
                    { key: "Eqp Type 1", value: selected[0].getAttribute("Eqp Type 1") },
                    { key: "Eqp Type 2", value: selected[0].getAttribute("Eqp Type 2") },
                    { key: "Eqp Type 3", value: selected[0].getAttribute("Eqp Type 3") },
                ]
            })
        }

        // If the Task attribute is Piping we create an Piping Tab
        if (selected[0].getAttribute("Task") == "Piping") {
            result.push({
                name: "Piping",
                // In this case we are only intrested in some of the elements so we add them to the array individually
                data: [
                    { key: "Pipeline", value: selected[0].getAttribute("Pipeline") },
                    { key: "PipeRun", value: selected[0].getAttribute("PipeRun") },
                    { key: "Commodity Code", value: selected[0].getAttribute("Commodity Code") },
                    { key: "Commodity Option", value: selected[0].getAttribute("Commodity Option") },
                    { key: "Cut length", value: selected[0].getAttribute("Cut length") },
                    { key: "Linkage", value: selected[0].getAttribute("Linkage") },
                    { key: "NPD", value: selected[0].getAttribute("NPD") },
                ]
            })
        }

        setTabData(result)
    }

    // This Callback performs the same actions its just called for PID elements
    function intelliPidSelectionChangedCallback() {
        setTabData([])//TODO
    }

    // We create a useeffect hook to handle selection Changed UPV events. This is simelar to 04_events
    useEffect(() => {
        // To show data without recieving an aditional event we call the callback one time manually 
        selectionChangedCallback({Objects:[]})

        const events = Application.getInstance().Events;
        //use the useEffectWrapper to register for an event (in this case registerSelectionChangedEvent) and supply a callback
        //the return value of useEffectWrapper is a function that will remove the event again. This is needed for react to ensure on rerender only one event is registered
        return events.useEffectWrapper(events.registerSelectionChangedEvent, selectionChangedCallback)
    }, []);

    // another useffect is used for IntelliPid Events
    useEffect(() => {
        const events = Application.getInstance().Events;
        //use the useEffectWrapper to register for an event (in this case registerSelectionChangedEvent) and supply a callback
        //the return value of useEffectWrapper is a function that will remove the event again. This is needed for react to ensure on rerender only one event is registered
        return events.useEffectWrapper(events.registerIntellipidSelectionChangedEvent, intelliPidSelectionChangedCallback)
    }, []);

    // Finally we return the tabData variable that is updated everytime new data is available
    return tabData
}