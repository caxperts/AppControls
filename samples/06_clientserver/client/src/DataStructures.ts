// This file contains support structures and functions used inside the Content.tsx file

import { ModelObject } from "@caxperts/universal.api"

// Possible statuses
export enum StatusEnum {
    Undefined = "Undefined",
    WaitingForMaterial = "WaitingForMaterial",
    ReadyForConstruction = "ReadyForConstruction",
    InstallationOngoing = "InstallationOngoing",
    Build = "Build"
}

//Diffrent Element Type possibilities.
// Add things like structural
export enum ElementTypeEnum {
    Equipment = "Equipment",
    Piping = "Piping",
}
// data returned by the API
export interface ElementStatus {
    elementName: string
    elementType: ElementTypeEnum
    currentElementStatus: StatusEnum
}

// Generate a pretty name to display in the UI
export function getPrettyName(status: StatusEnum) {
    switch (status) {
        case StatusEnum.Build:
            return "Build"
        case StatusEnum.InstallationOngoing:
            return "Installation ongoing"
        case StatusEnum.ReadyForConstruction:
            return "Ready for construction"
        case StatusEnum.WaitingForMaterial:
            return "Waiting for material"
        case StatusEnum.Undefined:
            return "Undefined";
        default:
            return "Error";
    }
}

// Convert a status to a hex color used inside the model
export function getColor(status: StatusEnum) {
    switch (status) {
        case StatusEnum.Build:
            return "#00FF00"
        case StatusEnum.InstallationOngoing:
            return "#FFFF00"
        case StatusEnum.ReadyForConstruction:
            return "#00f7ff"
        case StatusEnum.WaitingForMaterial:
            return "#7e00fc"
        default:
            return "#757575";
    }
}

// Create a condition based on the element. For diffrent ElementTypes this is generated diffrent
export function getCondition(element: ElementStatus) {
    switch (element.elementType) {
        case ElementTypeEnum.Equipment:
            return "Name=" + element.elementName
        case ElementTypeEnum.Piping:
            return "PipeRun=" + element.elementName
        default:
            return "";
    }
}

// Get the identifier from a model object
export function getIdentifier(element: ModelObject) {
    if (element.getAttribute("PipeRun") != null)
        return element.getAttribute("PipeRun");
    return element.getAttribute("Name");
}