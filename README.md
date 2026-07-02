# What are AppControls
AppControls are an enhancment to UPV that was introduced with Version 7.0.
They allow UPV users, powerusers and administrators to extend the functionality of UPV.
AppControls in UPV are run inside a browser inside UPV allowing to display their own UI inside UPV.
Comunication with UPV is possible using an api provided from CAXperts. It is available from npm [@caxperts/universal.api](https://www.npmjs.com/package/@caxperts/universal.api)
Information on the [CAXperts HelpPortal](https://help.caxperts.com/UDiTH%20App/AppControls)

# Offline AppControls
Offline AppControls empower UPV to seamlessly utilize AppControls even in the absence of an internet connection. In such instances, the entire website is encapsulated within a single index.html file, integrated into the UPV file tree. This approach ensures a smooth offline experience, allowing UPV to access and leverage AppControls without dependency on an internet connection. This streamlined integration enhances accessibility and usability, contributing to a more resilient and versatile software environment.



# WebsocketAPI (available starting from UDiTH 2026.2.0)
Starting with version 2026.2.0 we have a new mode where an App can run outside of UDiTH and is still able to comunicate with UDiTH. As this is packaged in the Universal.API no additional requirments are required to make this work.

A connection request from the Browser will need to be approved by the Viewer to establish a connection. For the first API commands executed, a no backed available error is expected.
It is best to call an initial request such as `Application.getInstance().ViewerVersion.get()` without awaiting it. After some time, the connection will become available, which can be verified via `Application.getInstance().available()`.

Please also visit [HelpPortal Websocket Feature](https://help.caxperts.com/UDiTH%20App/WebSocket%20Feature)

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