import './style.css'
// import the Application from @caxperts/universal.api
import { Application, AttributeConditionComparison, ConsolidationMode, PackageCondition } from "@caxperts/universal.api";

export default function PackageConditions() {
  // This is an asynchronous function. This is required since we communicate with UPV that can cause a delay till a response is recieved.
  // the await keyword is used to await till the response is available
  async function selectElement() {
    // Retrieve a new filter element for the 3D scene. This is the main objects where objects can be specified and then excuted against UPV
    const filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter();
    // We set a match all condition for the filter.
    filter.Condition = "Uid=*";

    filter.APIPackageFilter = {
        Name: "APIFilter",
        Conditions: [
            // Every first Condition is a base Condition that the other ones are based upon
            // In this condition we create the condition Area System = Sulphur Recovery Area-A
            PackageCondition.createAttributeCondition(ConsolidationMode.Base, "Area System", AttributeConditionComparison.Equals, "Sulphur Recovery Area-A"),
            // The second condition extends the first by defining that Task should be Equipment-
            PackageCondition.createAttributeCondition(ConsolidationMode.And, "Task", AttributeConditionComparison.Equals, "Equipment"),
            // The last condition states stat the Name cannot be D-240
            PackageCondition.createAttributeCondition(ConsolidationMode.AndNot, "Name", AttributeConditionComparison.Equals, "D-240"),
            //Various other conditions are also possible. Live VolumeCOnditions or groups / INtelliGroups
        ]
    }

    // Send the command select to UPV. This will select all elements that match the condition
    await filter.select();
  }

  return (
    <div className="container">
      <h1>Sample 04: Package Conditions</h1>
      <p>Using regular conditions on the filter you can already acieve a lot. But if you need special logic you can use our packaging condition system</p>
      <p>If you click on the button it will select all equipments inside the Area 'Sulphur Recovery Area-A' except D-240</p>

      <button onClick={selectElement}>Select Package</button>
    </div>
  );
}