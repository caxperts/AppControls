import { Application } from "@caxperts/universal.api/Application";

// Enums that contains possible actions. Their functions are handled inside the execute function
export enum Actions {
    OpenUrl = "Open Url", HideSteel = "Hide Steel", Reset = "Reset", EricTest = "Testing"
}

export async function execute(action: Actions) {
    switch (action) {
        case Actions.OpenUrl:
            console.log("Opening Google")
            // Opeing a webpage outside of UPV
            await Application.getInstance().openPath("https://www.google.com");
            break;
        case Actions.HideSteel:
            //Hide steel element by setting the visibility to false for all Elements that have Task=Structure
            let filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter();
            filter.Condition = "Task=Structure";
            await filter.setVisibility(false);
            break;
        case Actions.Reset:
            //Can the Camera reset funtion. This will not only reset the camera but also reset the model to the initial state
            await (await Application.getInstance().Scenes3d.get())[0].Camera.resetView();
            break;
        case Actions.EricTest:
            // Testing functions for eric
            let filter2 = (await Application.getInstance().Scenes3d.get())[0].getNewFilter();
            filter2.Condition = "Area System=Sulphur Recovery Area-A";
            await filter2.color("#FF0000");

            filter2.Condition = "Area System=Sulphur Recovery Area-B";
            await filter2.color("#00FF00");

            break;
        default:
            break;
    }
}