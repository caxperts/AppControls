# Create new AppControl
- Install latest stable version of [Node](https://nodejs.org/en)
- Install a code editor you are comfortable with. For example [Visual Studio Code](https://code.visualstudio.com/)
- Run `npm create vite@latest <appname> -- --template react-ts`
- Switch to the newly created folder. `cd <appname>`
- Run `npm i @caxperts/universal.api` to install the api
- Checkout the Samples to find usage examples for the API
# Adding Offline AppControl Support
- Run `npm install vite-plugin-singlefile --save-dev`
- Set vite.config.ts to
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import  { viteSingleFile } from 'vite-plugin-singlefile'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
})
```

# Running an AppControl for Development
Ensure that once you have all the requirements installed by running `npm i` to install all dependecies if not done yet. Node is still required to be installed first.
After all requirements are installed you can start a development server by calling `npm run dev`. This will start a development server on the log provided in the console. 

Example: `http://localhost:5173/`

Inside UPV you can now create an AppControl with this URL and view the AppControl. Depending on if the AppControl was setup to require to be running in an UPV instance you can also visit this URL outside of UPV.

Using this development server all changes inside the src folder are automatically loaded inside UPV or your browser.

If you are recieving errors that the AppControl was blocked please refer to [Security.md](Security.md) and ensure that the site is allowed. For offline AppControls this requires the `AllowOfflineAppControl` setting.

# How to build an (offline) AppControl
Building an AppControl is the step of creating a release build. Depending on if your `vite.config.ts` file contains the `viteSingleFile` plugin you will either build an offline AppControl or an AppControl.

Running `npm run build` will generate the build. The result is saved inside the dist folder. For offline AppControls a single `index.html` file is generated that can be saved inside the UPV Filetree. Non offline AppControls will instead create multiple files that can be served from a webserver. A offline AppControl can also be placed on a webserver and will work the same but the single index.html has the full bundled code which can slowdown the AppControl start. 

If you are recieving errors that the AppControl was blocked please refer to [Security.md](Security.md) and ensure that the site is allowed. For offline AppControls this requires the `AllowOfflineAppControl` setting.

# How to debug
Starting with UDiTH (and UPV 7.5.1) Remote debugging has changed and is now available via Edge or Chrome Remote Dev tools. These are available via edge/chrome://inspect and search for local network debugging targets.

With this change the `RemoteDebuggingPort` was changed to 9222 which is the default port for chrome and edge.

```
OLD, Only use for UPV before 7.5.1
On Windows an AppControl can be debugged using the Chrome Debugger. Ensure that `RemoteDebugging` is enabled in the AppControls security settings. By visiting `http://localhost:8080` you can access the chrome debugger and start debugging the AppControl running inside UPV. A diffrent port can be specified via `RemoteDebuggingPort` which is by default set to 8080.
```


# Styling
- We provide a Material UI theme definition to get a simelar style to UPV itself. The theme is available via our API. 
- Run `npm install @mui/material @emotion/styled @emotion/react` to install the components required
- Make sure to add `<meta name="transparent" content="true">` to the meta tags of the index.html file
- Use this App.tsx to get started
```tsx
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import Content from './Content';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Theme } from '@caxperts/universal.api'


export default function App() {

  const [themeData, setThemeData] = useState<ThemeOptions | null>(null);

  useEffect(() => {
    async function load() {
      setThemeData(createTheme(await Theme.getTheme()))
    }
    load();
  }, [])


  return (
    <>
      {themeData == null ? (
        <CircularProgress />
      ) : (
          < ThemeProvider theme={themeData}>
            {/* Set the Theme and add the CSSBaseline to add full MUI support */}
            <CssBaseline />
            {/* The main content of my AppControl */}
            <Content />

          </ThemeProvider >
        )

      }
    </>
  );
}
```
