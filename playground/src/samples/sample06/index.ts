
import { Configuration, defaultDependencies } from '../Configuration';
import App from './App.tsx?raw';
import style from '../style.css?raw';


export const config: Configuration = {
    files: {
        ["/App.tsx"]: {
            code: App,
            active: true,
            hidden: false,
            readOnly: false
        },
        ["/style.css"]: {
            code: style,
            active: true,
            hidden: false,
            readOnly: false
        }
    },
    dependencies: defaultDependencies,
    name: "sample06"
}