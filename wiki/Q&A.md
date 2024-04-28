# FAQ
This file contains often asked questions. Before contacting support please check if your question is answered by this document.
## How can I open a second tab for my login flow
The AppControls implementation has no context for tabs. Please use redirect logins instead of popup/seperate tabs login for OIDC.
## Native HTML components dont work properly on windows (color, datefield, dropdown)
Due to a limitation on how these are rendered they are not possible to be displayed inside UPV. These are using browser native elements which are not available inside AppControls. Please use APIs from Material Ui or simelar to replace these and to also have the same look and feel across your AppControl.
## Why is my AppControl set to a white color when running inside UPV but has a diffrent one outside/to what I have configured.
There is a detection in place if the website has a color set as a background. This check only checks the body element. Most Frameworks dont use this element or set the color later. To fix this signal to UPV that this check should be disabled for your page via this meta tag in your header.
```html
<meta name="transparent" content="true">
```
## When loading my offline AppControl the screen stays grey.
There is a file size limit of 2mb. Please ensure that you AppControl is less then 2MB. If you include data used by the appcontrol try to load it afterwards via (APICommand still missing) or switch to a regular AppControl