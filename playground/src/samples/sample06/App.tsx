import { useEffect, useState } from 'react';
import './style.css'
import { Application, ProjectionSphereElement } from "@caxperts/universal.api";

export default function Projections() {
  const[projections, setProjections] = useState<ProjectionSphereElement[]>()
  const[savedProjection, setSavedProjection] = useState<ProjectionSphereElement>()

  // Upon starting the AppControl load all Projections into a state
  useEffect(() => {
    // Initialisers via useEffect dont support async function directly. So we need to use this workaround
    async function loadProjections() {
      const model = (await Application.getInstance().Models.get())[0];
      setProjections(await model.Projections.get());
    }

    //Call our workaround
    loadProjections();
  }, [])

  async function saveProjection() {
    // Retrieve the Projection the User is currently in
    const model = (await Application.getInstance().Models.get())[0];
    setSavedProjection(await model.CurrentProjection.get());
  }
  
  async function loadProjection() {
    // if we have saved a projection lets jump back into it
    await savedProjection?.EnterProjectionSphere()
  }

  return (
    <div className="container">
      <h1>Sample 06: Projections</h1>
      <p>This sample shows you how to interact with panorams</p>
      <p>Projections inside model: {projections?.length} Saved Projection: {savedProjection?.projectionSphere.Name}</p>
      <button onClick={saveProjection}>Save Projection</button>
      <button onClick={loadProjection}>Load Projection</button>
    </div>
  );
}