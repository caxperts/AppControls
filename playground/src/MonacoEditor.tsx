import Editor, { Monaco } from "@monaco-editor/react";
import {
	useActiveCode,
	SandpackStack,
	FileTabs,
	useSandpack,
} from "@codesandbox/sandpack-react";
import universalapi from "./definitions/universal_api.d.ts?raw";
import jsxruntime from "./definitions/jsx-runtime.d.ts?raw";
import global from "./definitions/global.d.ts?raw";
import index from "./definitions/index.d.ts?raw";
import indexReact from "./definitions/indexReact.d.ts?raw";
import { editor } from "monaco-editor";
import { Configuration } from "./samples/Configuration";

interface MonacoEditorProps {
    config: Configuration
}

export default function MonacoEditor({ config }: MonacoEditorProps) {
	const { code, updateCode } = useActiveCode();
	const { sandpack } = useSandpack();

	function onMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
		monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
			target: monaco.languages.typescript.ScriptTarget.ES2016,
			allowNonTsExtensions: true,
			moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
			jsx: 4
		});
		monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
			noSemanticValidation: true,
			noSyntaxValidation: true
		});
		monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)

		monaco.editor.getModels().forEach(model => model.dispose());

		console.log("adding extra libs and creating models")

		monaco.languages.typescript.javascriptDefaults.addExtraLib(universalapi, "ts:filename/index.d.ts");
		monaco.languages.typescript.javascriptDefaults.addExtraLib(jsxruntime, "ts:filename/index2.d.ts");
		monaco.languages.typescript.javascriptDefaults.addExtraLib(global, "ts:filename/index3.d.ts");
		monaco.languages.typescript.javascriptDefaults.addExtraLib(index, "ts:filename/index4.d.ts");
		monaco.languages.typescript.javascriptDefaults.addExtraLib(indexReact, "ts:filename/index_react.d.ts");

		monaco.editor.createModel(universalapi, "typescript", monaco.Uri.parse("ts:filename/index.d.ts"));
		monaco.editor.createModel(jsxruntime, "typescript", monaco.Uri.parse("ts:filename/index2.d.ts"));
		monaco.editor.createModel(global, "typescript", monaco.Uri.parse("ts:filename/index3.d.ts"));
		monaco.editor.createModel(index, "typescript", monaco.Uri.parse("ts:filename/index4.d.ts"));
		monaco.editor.createModel(indexReact, "typescript", monaco.Uri.parse("ts:filename/index_react.d.ts"));

		let modelToLoad = null;

		for (const [key, value] of Object.entries(config.files)) {
			console.log("Loading: "+key)
			let model = monaco.editor.createModel(value.code, key.endsWith("css") ? "css" : "typescript", monaco.Uri.parse(key));
			if(key == sandpack.activeFile){
				modelToLoad = model;
			}
		}
		if(modelToLoad != null)
			editor.setModel(modelToLoad)
	}

	return (
		<SandpackStack style={{ height: "100vh", margin: 0 }}>
			<FileTabs />
			<div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
				<Editor
					onMount={onMount}
					width="100%"
					height="100%"
					language={sandpack.activeFile.endsWith("css") ? "css" : "typescript"}
					theme="vs-dark"
					options={{
						wordWrap: "on"
					}}
					key={sandpack.activeFile+config.name}
					defaultValue={code}
					onChange={(value) => updateCode(value || '')}
					value={code}
				/>
			</div>
		</SandpackStack>
	);
}