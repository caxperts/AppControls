## Create new AppControl
- Install latest stable version of [Node](https://nodejs.org/en)
- Run `npm create vite@latest <appname> -- --template react-ts`
- Switch to the newly created folder. `cd <appname>`
- Run `npm i @caxperts/universal.api` to install the apy
## Adding Offline AppControl Support
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