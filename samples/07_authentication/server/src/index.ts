import express, { Request, Response } from 'express';
import cors from 'cors'

// JWT verification libaries
import { JwtHeader, JwtPayload, SigningKeyCallback, verify } from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';

//the issuer we trust (IDP). Either read it from the .env file or fall back to the sample value
const issuer = process.env.issuer || "https://auth.universalplantviewer.com/realms/sample_authentication"
//the audience we trust (IDP client). Either read it from the .env file or fall back to the sample value.
//for the sample connector this has been set to the same name by default
const audience = process.env.audience || "sample-connector"
//the openid configuration endpoint
const oidcConfiguration = issuer+"/.well-known/openid-configuration"

// will after initialisation contain the jwks client to retrieve the public key of the IDP
let client: JwksClient

// Helper functions to retrieve the public key of the IDP
function getKey(header: JwtHeader, callback: SigningKeyCallback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}


// Setup the token validation
async function setupVerification() {
    // load the oidc configuration
    const config = await(await fetch(oidcConfiguration)).json()
    //initialize the jwks client with the url in the configuration
    client = new JwksClient({
        jwksUri: config["jwks_uri"]
    });
}
// create a new express server
const app = express();
// use Cors to define what websites can connent. in this case we allow everything
app.use(cors())
// We expect JSON in and output so we tell express to use json
app.use(express.json());
app.use(express.static("../client/dist"))
// get the port from the config file
const port = process.env.PORT || 3000;

// endpoint that retrieves all elements
app.get('/userDetails', async (req: Request, res: Response) => {
    //We verify the token in the Authorization header and validate that the issuer is the one we trust (or multiple)
    verify(req.header("Authorization") as string, getKey, {issuer: issuer, audience: audience}, function(err, decoded) {
        //if we have an error send a message to the client
        if(err){
            console.log(err)
            res.send("Invalid Token")
        }else{
            //if the token is valid send back the parsed payload
            console.log(decoded)
            res.send((decoded as JwtPayload)["name"])
        }
    })
});


// First setup the authentication and then start the server on the specified port
setupVerification().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
