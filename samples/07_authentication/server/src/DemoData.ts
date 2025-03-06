import { ElementTypeEnum, StatusEnum } from "./Enum";

// Function to generate some sample data upon starting the server. For a real server this needs to be removed
export function getDemoData() {
    const pipeRunList = `SC-1656-6\"-1C0031-03
SC-1656-3\"-1C0031-01
SC-1668-2\"-1C0031-03
SC-1656-1.5\"-1C0031-06
SC-1656-6\"-1C0031-02
SC-1656-1.5\"-1C0031-05
SC-1668-3\"-1C0031-01
SC-1656-3\"-1C0031-04
SC-1668-1\"-1C0031-02
P-1676-10\"-1C0031-02
P-1676-2\"-1C0031-01
P-1677-2\"-1C0031-01
P-1676-10\"-1C0031-03
P-1677-10\"-1C0031-02
P-1676-8\"-1C0031-04
S-1674-6\"-1C0031-02
S-1674-6\"-1C0031-06
S-1674-8\"-1C0031-05
S-1674-6\"-1C0031-04
S-1674-2\"-1C0031-01
S-1674-2\"-1C0031-07
S-1674-4\"-1C0031-03
S-1675-8\"-1C0031-01
S-1687-2\"-1C0031-01
S-1672-12\"-1C0031-07
S-1672-2\"-1C0031-01
S-1672-4\"-1C0031-09
S-1672-6\"-1C0031-06
S-1672-8\"-1C0031-03
S-1672-8\"-1C0031-05
S-1672-8\"-1C0031-08
S-1672-2\"-1C0031-04
S-1672-4\"-1C0031-02
S-1672-6\"-1C0031-10`;

    const dummyData : any[] = [
        { elementName: "D-240", currentElementStatus: StatusEnum.WaitingForMaterial, elementType: ElementTypeEnum.Equipment },
        { elementName: "E-240", currentElementStatus: StatusEnum.Build, elementType: ElementTypeEnum.Equipment },
        { elementName: "P-102A", currentElementStatus: StatusEnum.Build, elementType: ElementTypeEnum.Equipment },
        { elementName: "P-102B", currentElementStatus: StatusEnum.Build, elementType: ElementTypeEnum.Equipment },
        { elementName: "T-240", currentElementStatus: StatusEnum.ReadyForConstruction, elementType: ElementTypeEnum.Equipment }
    ]

    pipeRunList.split("\n").forEach(element => {
        dummyData.push({
            elementName: element.trim(), 
            currentElementStatus: StatusEnum.ReadyForConstruction, 
            elementType: ElementTypeEnum.Piping });
    });

    return dummyData;
} 