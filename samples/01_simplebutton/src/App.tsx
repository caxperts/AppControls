import { Application, CombineModes } from '@caxperts/universal.api';

function App() {

  async function helloWorld() {
    // Application.getInstance() is our entrypoint to the UPV API
    // showMessage is a funtion that displayes a message box inside UPV
    // since showMessage is an asynchronous funtion we await the response.
    await Application.getInstance().showMessage("Hello World")
  }

  async function color() {
    // Scenes3d references to all 3D scenes. In future this will query UPVs window managment. all .get() funtions are async and need to be awaited.
    // Filters are our main interaction point between AppCOntrols and the API. using getNewFilter a new one can be generated.
    const filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter();
    // A filter condition can be set on the filter that is based on the structure Key=Value. * is a supported wildcard. 
    // You can also combine multiple condition using the & sign. Example: Key1=Value1&Key2=Value2
    filter.Condition = "Task=Equipment";
    // the CombineMode defines how multiple conditions are evaluated. Possibilities are AND and OR. 
    filter.CombineMode = CombineModes.And
    // to execute an action on the filter just call a funtion. Since these are again comunicating with UPV they are async
    await filter.color("#FF0000");
  }

  return (
    <>
      {/* Button labled "Hello World" that excutes the helloWorld function */}
      <button onClick={helloWorld}>Hello World</button>
      {/* Second Button to color elements */}
      <button onClick={color}>Color Equipment Red</button>
    </>
  );
}

export default App;