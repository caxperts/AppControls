import { Application } from "@caxperts/universal.api/Application";

export enum Actions {
    OpenUrl = "Open Url", HideSteel = "Hide Steel", Reset = "Reset", EricTest = "Testing"
}

export async function execute(action: Actions) {
    switch (action) {
        case Actions.OpenUrl:
            console.log("Opening Google")
            await Application.getInstance().openPath("https://www.google.com");
            break;
        case Actions.HideSteel:
            let filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter();
            filter.Condition = "Task=Structure";
            filter.setVisibility(false);
            break;
        case Actions.Reset:
            await (await Application.getInstance().Scenes3d.get())[0].Camera.resetView();
            break;
        case Actions.EricTest:
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