import { CircularProgress, Tab, Tabs } from "@mui/material";
import TableComponent from "./TableComponent";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTabData } from "./DataGenerator";

export function Content() {

  //async loading
  const tabData = useTabData()

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTabName, setSelectedTabName] = useState<string|null>(null);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setSelectedTabName(tabData[newValue].name);
  };

  useEffect(() => {
    for (let index = 0; index < tabData.length; index++) {
      const element = tabData[index];
      if(element.name == selectedTabName){
        setSelectedTab(index)
        return;
      }
    }
    setSelectedTab(0)
  },[tabData, selectedTabName])

  return (<>
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
        {tabData.map((row) => (
          <Tab label={row.name} key={row.name} />
        ))}
      </Tabs>
    {tabData.length != 0 ? <TableComponent tabData={tabData[selectedTab]} /> : <CircularProgress />}
  </>)
}

export default Content;