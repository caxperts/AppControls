import { useState } from 'react';
import Dropdown from './CustomDropdown';
import './style.css'
import { Application } from "@caxperts/universal.api";

export default function FurtherFunctions() {
    const options: string[] = ["Select", "Hightlight", "Fit", "All"];
    // state variableto store the used Action
    const [action, setAction] = useState<string>("Select");

    async function excecute() {
        // Retrieve a new filter element for the 3D scene. This is the main objects where objects can be specified and then excuted against UPV
        const filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter();
        // We set a condition for the filtewr. More advanced techniques are also possible. This will follow in future samples. In this case we just check if the Attribute Name is equal to D-240
        filter.Condition = "Name=D-240";

        // Send the command to UPV depending on the selected action
        switch (action) {
            case "Select":
                await filter.select();
                break;
            case "Hightlight":
                await filter.highlight();
                break;
            case "Fit":
                await filter.fit();
                break;
            case "All":
                filter.select();
                filter.highlight();
                filter.fit();
                break;
        }
    }

    return (
        <div className="container">
            <h1>Sample 02: Color Element</h1>
            <p>This a sample on how you can use the Universal Api to send a simple color command to UPV</p>
            <p>If you click on the button it will color all elements with the name D-240 to <span style={{ color: "#ff0000" }}>red (#ff0000)</span></p>
            {/** use a display flex div to place elements next to each other */}
            <div className='displayFlex'>
                <button onClick={excecute}>Excecute Action</button>
                { /** 
                 * Using a custom Dropdown component with custom styling
                 * Providing the available options and a onselect function. 
                 * The implementation is inside CustomDropdown.tsx
                 */}
                <Dropdown options={options} onSelect={setAction} />
            </div>
        </div>
    );
}