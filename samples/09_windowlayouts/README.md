# Window Layouts
This example shows how to read and modify the UPV window layout from an AppControl.

It provides two buttons that move the App panel below the 3D view, one operating on the
JSON representation of the layout and one on the XML representation. The layout is read via
`Application.getInstance().Settings.WindowLayoutJson` / `WindowLayoutXML`, transformed, and
written back.

To run it excute the following functions
```bash
npm install
npm run dev
```

Have a look at [App.tsx](src/App.tsx) for implementation on how this works
