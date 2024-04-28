import { SandpackLayout, SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";
import MonacoEditor from "./MonacoEditor";
import { Configuration } from "./samples/Configuration";

interface EditorProps {
    config: Configuration
}

export default function Editor({ config }: EditorProps) {

    return (<>
        <SandpackProvider template="react-ts" 
            customSetup={{dependencies: config.dependencies}}
            theme="dark"
            key={config.name}
            options={{ autorun: true, autoReload: true }}
            files={config.files}>
            <SandpackLayout style={{  height: "100vh" }}>
                <MonacoEditor config={config}/>
                <SandpackPreview style={{ height: "100vh" }} showOpenInCodeSandbox={false} showRefreshButton={false} />
            </SandpackLayout>
        </SandpackProvider>
    </>)
}