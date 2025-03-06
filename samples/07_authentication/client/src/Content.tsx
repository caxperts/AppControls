import { useEffect, useState } from "react"
import { AUTH_SERVER, CLIENT_ID, LOGIN_REDIRECT, REALM, URLBase, WEB_SERVICES } from "./Config"
import { Button, Stack, Typography } from "@mui/material"
import { Application } from "@caxperts/universal.api"
import { AuthenticationContext } from "@caxperts/universal.api/Objects/AuthenticationManager";


export default function Content() {
    // authentication context to later close it (or perform logout in UPV 7.2)
    const [context, setContext] = useState<AuthenticationContext>()
    // token to use against the server
    const [token, setToken] = useState<string>()
    // Message to display to the user
    const [message, setMessage] = useState<string>()

    //Perform the Login
    async function login() {
        //Due to differences in the libary between Standalone and BBV currently 2 json strings need to be provided
        //Webservices after 2.6.0 are required for BBV logins to work which at the point of this publish are not yet available for public use
        const authContext = await Application.getInstance().Authentication.openAuthenticationContext(JSON.stringify({
            //The authority of the oid server. For other IDPs then Keycloak this needs to be adjusted
            "Authority": `${AUTH_SERVER}/realms/${REALM}`,
            //the client id of the oidc client
            "ClientId": CLIENT_ID,
            //the scopes to login with
            "Scope": "openid profile",
            //the redirect URL. This should point to the loginRedirect.html or simelar
            "RedirectUri": LOGIN_REDIRECT,
        }), JSON.stringify({
            //The authority of the oid server. For other IDPs then Keycloak this needs to be adjusted
            "authority": `${AUTH_SERVER}/realms/${REALM}`,
            //the redirect url of the webservices instance
            "popup_redirect_uri": `${WEB_SERVICES}/signaling/loginPopup.html`,
            //the client id of the oidc client
            "client_id": CLIENT_ID,
            //the scopes to login with
            "scope": "openid profile",
            //keep this
            "automaticSilentRenew": true,
            //keep this
            "response_type": "code"
        }));
        //We get send a event once new tokens are available as they expire
        authContext.registerContextChangedEvent(x=>setToken(x.AccessToken))
        //save the context
        setContext(authContext)
    }
    
    async function logout() {
        //This only closes the context. With 7.2 a new api will become available to perform a hard logout
        context?.closeAuthenticationContext()
        //Reset the context and the token
        setContext(undefined)
        setToken(undefined)
    }

    //Fetch the userdetails from the server as a sample of the server validating the authentication 
    //and retrieving the information stored in the token
    useEffect(() => {
        // async helper function as useEffect does not have native support for this
        async function getUserDetails() {
            //fetching the user details
            const fetchResult = await fetch(URLBase+"/userDetails", { headers: {
                "Authorization" : token!
            }})
            //show the response to the user
            setMessage(await fetchResult.text())
        }
        //only call the api if we have a token else just show that we are not logged in
        console.log(token)
        if(token){
            getUserDetails();
        }else{
            setMessage("Not logged in")
        }
    }, [token])
    

    return (<> {/* Define a stack to place the Header and buttons underneath each other */}
        <Stack spacing={2} direction="column">
            {/* Center the header. This is possible with multiple ways but this is an easy variant */}
            <Typography align='center' variant='h4'>
                Authentication
            </Typography>
            <Typography align='center'>
                This example demonstrates SSO authentication via OIDC
                To login press the login button and enter either user and the password "password" without the quotes
                In 7.1 of UPV the logout just terminates the context. With 7.2 a new API is introduced to perform a logout against the IDP
            </Typography>
            <Stack direction="row">
                <Button variant="contained" onClick={login}>Login</Button>
                <Button variant="contained" onClick={logout}>Logout</Button>
            </Stack>
            <Typography align='left'>
                {message}
            </Typography>
        </Stack>
    </>)
}