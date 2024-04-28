
import { Configuration } from "./Configuration"
import { config as intro } from "./intro"
import { config as sample1 } from "./sample01"
import { config as sample2 } from "./sample02"
import { config as sample3 } from "./sample03"
import { config as sample4 } from "./sample04"
import { config as sample5 } from "./sample05"
import { config as sample6 } from "./sample06"

export const configs: Sample[] = [
    {
        name: "Introduction",
        configuration: intro    
    },
    {
        name: "Sample 01: Simple Command Color",
        configuration: sample1    
    },
    {
        name: "Sample 02: Further Functions",
        configuration: sample2    
    },
    {
        name: "Sample 03: Events",
        configuration: sample3    
    },
    {
        name: "Sample 04: Package Conditions",
        configuration: sample4    
    },
    {
        name: "Sample 05: Camera Manipulation",
        configuration: sample5   
    },
    {
        name: "Sample 06: Projections",
        configuration: sample6    
    }
]

export interface Sample{
    name: string
    configuration: Configuration
}