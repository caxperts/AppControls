import { Application } from '@caxperts/universal.api';

function App() {

  async function runAction() {
    let filter = (await Application.getInstance().Scenes3d.get())[0].getNewFilter();
    filter.Condition = "Task=Equipment";
    filter.color("#FF0000");
  }

  return (
    <button onClick={runAction}>Color Equipment Red</button>
  );
}

export default App;