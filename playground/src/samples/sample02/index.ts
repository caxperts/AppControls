
import { Configuration, defaultDependencies } from '../Configuration';
import App from './App.tsx?raw';
import style from '../style.css?raw';
import CustomDropdowntsx from './CustomDropdown.tsx?raw';
import customDropdowncss from './customDropdown.css?raw';


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
        },
        ["/CustomDropdown.tsx"]: {
            code: CustomDropdowntsx,
            active: true,
            hidden: false,
            readOnly: false
        },
        ["/customDropdown.css"]: {
            code: customDropdowncss,
            active: true,
            hidden: false,
            readOnly: false
        }
    },
    dependencies: defaultDependencies,
    name: "sample02"
}