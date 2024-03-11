import { Application } from "@caxperts/universal.api/Application";

// Enums that contains possible actions. Their functions are handled inside the execute function
export enum Actions {
    OpenUrl = "Open Url", HideSteel = "Hide Steel", Reset = "Reset", EricTest = "Testing"
}

export async function execute(action: Actions) {
    switch (action) {
        case Actions.OpenUrl: {
            console.log("Opening Google")
            // Opeing a webpage outside of UPV
            await Application.getInstance().openPath("https://www.google.com");
            break;
        }
        case Actions.HideSteel: {
            //Hide steel element by setting the visibility to false for all Elements that have Task=Structure
            const filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter();
            filter.Condition = "Task=Structure";
            await filter.setVisibility(false);
            break;
        }
        case Actions.Reset: {
            //Can the Camera reset funtion. This will not only reset the camera but also reset the model to the initial state
            await (await Application.getInstance().Scenes3d.get())[0].Camera.resetView();
            break;
        }
        case Actions.EricTest: {
            // Testing functions for eric
            const scene = (await Application.getInstance().Scenes3d.get())[0]
            
            const filter3 = scene.getNewFilter()
            filter3.Condition = "Name=P-1011"
            filter3.color("#FF0000")
            /*break;
            let scene = (await Application.getInstance().Scenes3d.get())[0]
            Application.getInstance().Events.registerSelectionChangedEvent(async (data) => {
                let filter2 = scene.getNewFilter()
                if(data.Objects.length == 0){
                    filter2.Condition = "Uid=*"
                    filter2.clearColor()
                }else{
                    
                    filter2.IncludeAttributes = true
                    let response = await filter2.getSelectedObjects()
                    
                    filter2.Condition= "Name="+response[0].getAttribute("Name")
                    filter2.color("#FF0000")
                }

                
            });

            
            let filter2 = scene.getNewFilter()
            filter2.IncludeAttributes = true
            let response = await filter2.getSelectedObjects()
            
            filter2.Condition= "Name="+response[0].getAttribute("Name")
            filter2.clearColor()
*/
            break;
        }
        default:
            break;
    }
}