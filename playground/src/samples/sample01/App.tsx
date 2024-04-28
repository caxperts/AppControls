import './style.css'
// import the Application from @caxperts/universal.api
import { Application, CombineModes } from "@caxperts/universal.api";

export default function SimpleColorCommand() {
  // This is an asynchronous function. This is required since we communicate with UPV that can cause a delay till a response is recieved.
  // the await keyword is used to await till the response is available
  async function colorElement() {
    // Retrieve a new filter element for the 3D scene. This is the main objects where objects can be specified and then excuted against UPV
    const filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter();
    // We set a condition for the filtewr. More advanced techniques are also possible. This will follow in future samples. In this case we just check if the Attribute Name is equal to D-240
    filter.Condition = "Name=D-240";
    // Set the combinemode to and (default). In this case it doesnt matter but if you would combine multiple conditions unsing & can can define the behavior
    filter.CombineMode = CombineModes.And;
    // Send the command color to UPV. This colors all elements that match the condition red
    await filter.color("#ff0000");
  }

  return (
    <div className="container">
      <h1>Sample 01: Color Element</h1>
      <p>This a sample on how you can use the Universal Api to send a simple color command to UPV</p>
      <p>If you click on the button it will color all elements with the name D-240 to <span style={{color: "#ff0000"}}>red (#ff0000)</span></p>
      <p>Inside the Condition you can use & to combine multiple queries. You can also set a combine mode with either 'and' or 'or'</p>

      <button onClick={colorElement}>Color D-240</button>
    </div>
  );
}