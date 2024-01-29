# Create new AppControl
- Install latest stable version of [Node](https://nodejs.org/en)
- Install a code editor you are comfortable with. For example [Visual Studio Code](https://code.visualstudio.com/)
- Run `npm create vite@latest <appname> -- --template react-ts`
- Switch to the newly created folder. `cd <appname>`
- Run `npm i @caxperts/universal.api` to install the apy
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
On Windows an AppControl can be debugged using the Chrome Debugger. Ensure that `RemoteDebugging` is enabled in the AppControls security settings. In the current version this is enabled by default. By visiting `http://localhost:8080` you can access the chrome debugger and start debugging the AppControl running inside UPV.