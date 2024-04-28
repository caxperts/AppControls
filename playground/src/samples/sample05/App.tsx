import { useState } from 'react';
import './style.css'
// import the Application from @caxperts/universal.api
import { Application, CameraView } from "@caxperts/universal.api";

export default function CameraManipulation() {

  const[position, setPosition] = useState<CameraView>()

  // This function requests the current camera position and rotation and stores it inside the position state
  async function savePosition() {
    // Retrieve camera for the 3D scene
    const camera = (await Application.getInstance().Scenes3d.get())[0].Camera;
    // Retrieve the current camera view
    setPosition(await camera.CameraView.get())
  }
  
  // THis function uses the position state and restores the camera position in UPV
  async function loadPosition() {
    // Retrieve camera for the 3D scene
    const camera = (await Application.getInstance().Scenes3d.get())[0].Camera;
    // Check if position is defined. If it is set the new camera view
    if(position)
      await camera.CameraView.set(position)
  }
  async function resetCamera() {
    // Retrieve camera for the 3D scene
    const camera = (await Application.getInstance().Scenes3d.get())[0].Camera;
    // Call the reset Camera function
    await camera.resetView();
  }

  return (
    <div className="container">
      <h1>Sample 05: Camera Manipulation</h1>
      <p>This sample shows you how to read the current camera postion, store it and reload it again, and reset it</p>
      <p>Current saved Position: X:{position?.Position?.X} Y:{position?.Position?.Y} Z:{position?.Position?.Z}</p>
      <button onClick={savePosition}>Save Position</button>
      <button onClick={loadPosition}>Load Position</button>
      <button onClick={resetCamera}>Reset Camera</button>
    </div>
  );
}