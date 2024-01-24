# FAQ
This file contains often asked questions. Before contacting support please check if your question is answered by this document.
## How can I open a second tab for my login flow
The AppControls implementation has no context for tabs. Please use redirect logins instead of popup/seperate tabs login for OIDC.
## Native HTML components dont work properly on windows (color, datefield, dropdown)
Due to a limitation on how these are rendered they are not possible to be displayed inside UPV. These are using browser native elements which are not available inside AppControls. Please use APIs from Material Ui or simelar to replace these and to also have the same look and feel across your AppControl.