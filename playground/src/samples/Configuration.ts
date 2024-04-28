import { SandpackFile } from "@codesandbox/sandpack-react"


export interface Configuration {
    files: {
        [file: string]: SandpackFile
    },
    dependencies:{[dependency: string]: string},
    name: string
}

export const defaultDependencies:{[dependency: string]: string}={
    "@caxperts/universal.api": "latest"
}
export const defaultAdditionalDTS:{[dependency: string]: string}={ }