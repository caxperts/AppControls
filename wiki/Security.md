# Security
We use a whitelist to ensure only AppControls in this list can be displayed and access the model.
The file is saved as an appcontrol.json file in the Data folder of the model.
## Whitelist
Each whitelist entry has the following setting
```
Host = The host allowed. This can also be used to allow subdomains
Scheme = https|http|file
Subnet4 = provide a subnet notation. Note that this only will be used if an IP is entered
AllowOfflineAppControl = Are offline AppControls allowed. These are stored in the file tree
Url=A direct URL that is available
Api=Does this entry have access to the api.
```
If an url is not allowed users will be redirected to the blocked url. Make sure to only whitelist trusted websites.

## Settings
```
UserAgent=UserAgent that should be used
IgnoreCertificateErrors=Are certificates ignored (default false)
StorageEnabled=Are cookies and localstorage saved (default false on BBV else on)
RemoteDebugging=Can you use remote debugging to debug the appcontrol (default false on BBV else on)
WindowsCachePath=Redirect the cookie and localstorage path
```

## Example full config
```json
{
    "Type": "whitelist",
    "Version": 1,
    "Redirect": {
        "Default": "https://caxperts.com",
        "Blocked": "https://caxperts.com"
    },
    "Whitelist": [
        {
            "Host": "*.universalplantviewer.com",
            "Scheme": "https",
            "Api": true
        },
        {
            "Host": "localhost",
            "Scheme": "https",
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