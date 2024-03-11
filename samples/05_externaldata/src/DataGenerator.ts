import { useEffect, useState } from "react"
import { TabData } from "./Structures"
import { Application } from "@caxperts/universal.api";


export function useTabData() {

    const [tabData, setTabData] = useState<TabData[]>([])

    async function selectionChangedCallback(){
        const filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter()
        filter.IncludeAttributes = true
        const selected = await filter.getSelectedObjects()

        if(selected.length == 0){
            setTabData([])
            return;
        }

        let tabData : TabData[] = []

        tabData.push({
            name: "Attributes",
            data: selected[0].Attributes!.map((x) => { return {key: x.Key, value:x.Value} })
        })

        if(selected[0].getAttribute("Task") == "Equipment") {
            tabData.push({
                name: "Equipment",
                data: [
                    {key: "Name", value: selected[0].getAttribute("Name")},
                    {key: "Eqp Type 0", value: selected[0].getAttribute("Eqp Type 0")},
                    {key: "Eqp Type 1", value: selected[0].getAttribute("Eqp Type 1")},
                    {key: "Eqp Type 2", value: selected[0].getAttribute("Eqp Type 2")},
                    {key: "Eqp Type 3", value: selected[0].getAttribute("Eqp Type 3")},
                ]
            })
        }
        
        if(selected[0].getAttribute("Task") == "Piping") {
            tabData.push({
                name: "Piping",
                data: [
                    {key: "Pipeline", value: selected[0].getAttribute("Pipeline")},
                    {key: "PipeRun", value: selected[0].getAttribute("PipeRun")},
                    {key: "Commodity Code", value: selected[0].getAttribute("Commodity Code")},
                    {key: "Commodity Option", value: selected[0].getAttribute("Commodity Option")},
                    {key: "Cut length", value: selected[0].getAttribute("Cut length")},
                    {key: "Linkage", value: selected[0].getAttribute("Linkage")},
                    {key: "NPD", value: selected[0].getAttribute("NPD")},
                ]
            })
        }

        setTabData(tabData)
    }
    function intelliPidSelectionChangedCallback(){
        setTabData([])//TODO
    }

    useEffect(() => {
        selectionChangedCallback()

        const events = Application.getInstance().Events;
        //use the useEffectWrapper to register for an event (in this case registerSelectionChangedEvent) and supply a callback
        //the return value of useEffectWrapper is a function that will remove the event again. This is needed for react to ensure on rerender only one event is registered
        return events.useEffectWrapper(events.registerSelectionChangedEvent, selectionChangedCallback)
    }, []);
    useEffect(() => {
        const events = Application.getInstance().Events;
        //use the useEffectWrapper to register for an event (in this case registerSelectionChangedEvent) and supply a callback
        //the return value of useEffectWrapper is a function that will remove the event again. This is needed for react to ensure on rerender only one event is registered
        return events.useEffectWrapper(events.registerIntellipidSelectionChangedEvent, intelliPidSelectionChangedCallback)
    }, []);

    return tabData
}