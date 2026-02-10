# What are AppControls
AppControls are an enhancment to UPV that was introduced with Version 7.0.
They allow UPV users, powerusers and administrators to extend the functionality of UPV.
AppControls in UPV are run inside a browser inside UPV allowing to display their own UI inside UPV.
Comunication with UPV is possible using an api provided from CAXperts. It is available from npm [@caxperts/universal.api](https://www.npmjs.com/package/@caxperts/universal.api)

# Offline AppControls
Offline AppControls empower UPV to seamlessly utilize AppControls even in the absence of an internet connection. In such instances, the entire website is encapsulated within a single index.html file, integrated into the UPV file tree. This approach ensures a smooth offline experience, allowing UPV to access and leverage AppControls without dependency on an internet connection. This streamlined integration enhances accessibility and usability, contributing to a more resilient and versatile software environment.

# Testing AppControls
AppControls can be tested inside UPV via the [AppControls Playground](https://playground.universalplantviewer.com) which contains an Code Editor to edit the samples provided.
The Playground is only fully compatible with UPV 7.1.0 and higher

# WebsocketAPI (available starting from UDiTH 2026.2.0)
Starting with version 2026.2.0 we have a new mode where an App can run outside of UDiTH and is still able to comunicate with UDiTH. As this is packaged in the Universal.API no additional requirments are required to make this work.

A connection request from the Browser will need to be approved by the Viewer to establish a connection. For the first API commands executed a no backed available error is expected.
To properly use this system wait till `Application.getInstance().available()` becomes true

To disable this functionality please use
```typescript
import { Api } from "@caxperts/universal.api/Internal/APIConnector";
Api.disableWebsocketApi = true;
```

# More information
* [CodingGuidlines](wiki/CodingGuidlines.md)
* [HowToSetup](wiki/HowToSetup.md)
* [Q&A](wiki/Q&A.md)
* [Security](wiki/Security.md)
* [User Guide](https://www.caxperts.com/help/UniversalPlantViewer%20App/AppControl)