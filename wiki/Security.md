# Security
We use a allowlist to ensure only AppControls in this list can be displayed and access the model.
The file is saved as an appcontrols.json file in the Data folder of the model.
## Allowlist
Each allowlist entry has the following setting
```
Host = The host allowed. This can also be used to allow subdomains
Scheme = https|http|file
Subnet4 = provide a subnet notation. Note that this only will be used if an IP is entered
AllowOfflineAppControl = Are offline AppControls allowed. These are stored in the file tree
Url=A direct URL that is available
Api=Does this entry have access to the api.
```
If an url is not allowed users will be redirected to the blocked url. Make sure to only allowlist trusted websites.

## Settings
```
UserAgent=UserAgent that should be used
IgnoreCertificateErrors=Are certificates ignored (default false)
StorageEnabled=Are cookies and localstorage saved (default true; blocked on BBV)
RemoteDebugging=Can you use remote debugging to debug the appcontrol (default false; blocked on BBV)
WindowsCachePath=Redirect the cookie and localstorage path
```

## Example appcontrols.json
```json
{
    "Version": 1,
    "Redirect": {
        "Default": "https://caxperts.com",
        "Blocked": "https://caxperts.com"
    },
    "Allowlist": [
        {
            "Host": "*.universalplantviewer.com",
            "Scheme": "https",
            "Api": true
        },
        {
            "Host": "localhost",
            "Scheme": "http",
            "Api": true
        },
        {
            "AllowOfflineAppControl": true,
            "Api": true
        }
    ],
    "WebConfig": {
        "RemoteDebugging": true
    }
}
```