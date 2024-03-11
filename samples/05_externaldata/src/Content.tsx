import { CircularProgress, Tab, Tabs } from "@mui/material";
import TableComponent from "./TableComponent";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTabData } from "./DataGenerator";

export function Content() {

  //use a custom hook top abstract data loading away
  const tabData = useTabData()

  //Tab index currently selected
  const [selectedTab, setSelectedTab] = useState(0);
  //The name of the tab. Used to jump to the same tab if another element has the same tab
  const [selectedTabName, setSelectedTabName] = useState<string|null>(null);

  //In this function we perform the first of the selectedTab handeling
  const handleTabChange = (_: SyntheticEvent, newIndex: number) => {
    //First we only set the name. The index is calculated later
    setSelectedTabName(tabData[newIndex].name);
  };

  //This useeffect is excecuted whenever tabData or selectedTabName is changed
  useEffect(() => {
    //We loop through all tabs and find if the selectedTabName matches. 
    // This also happns after the handleTabChange event
    for (let index = 0; index < tabData.length; index++) {
      if(tabData[index].name == selectedTabName){
        //if we find the correct tab set the index and return from the fuction
        setSelectedTab(index)
        return;
      }
    }
    //If we didnt return we reset the index to 0
    setSelectedTab(0)
  },[tabData, selectedTabName])

  return (<>
      {/* We create a Tabs control that will contain all the tabs and defines the callback for the change event */}
      <Tabs value={selectedTab} onChange={handleTabChange}>
        {/* We map each individual TabData element to a Tab. Since this happens in order the tabindex matches the array index*/}
        {tabData.map((row) => (
          <Tab label={row.name} key={row.name} />
        ))}
      </Tabs>
      {/* If we have tabs we load the corresponding tab in a TableComponent else we display a spinner */}
    {tabData.length != 0 ? <TableComponent tabData={tabData[selectedTab]} /> : <CircularProgress />}
  </>)
}

export default Content;