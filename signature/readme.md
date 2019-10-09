## Signing Module Usage:

#### Server Side typical usage: 

##### You receive a signed request.

1. You use `server.requestParse(authorizationHeaderString)` to convert the header into an AuthorizationHeader as defined in model/interface/requestData

2. You will use server.createRequestData to create the input for the signing procedure. 

   ```typescript
   createRequestData(
   	method : string, 	// The http request method e.g. POST, GET, ...
       path : string,   	// The path of the incoming request
       algorithm : string, // This comes from Authorization Header
       tenantID : string,	// This comes from the Auth Header's Credential Scope
       payload : string, 	// The payload of the incoming request
       apikey : string,	// This comes from the Authorization Header
       api : string,		// This comes from the path
       version : string, 	// This comes from the path
       service : string,	// This comes from the path
       query : Map<string,string>,	// These all come from the path
       signedHeaders : string[],	// These are in the Authorization Header
       headersMap : Map<string, string>, // These are all headers in the request
       datetime : string,	// This comes from the X-Evri-Date header
       signature : string)	// This comes from the Authorization Header
   ```

3. You will take your result from the previous step, the request Data, and pass that into server.validate which will check the datetime of the request and the signature. You can optionally pass it into createSignature if you'd prefer to do the comparison and datetime checking yourself. ***Note:*** you need to pass in the signing dependencies like shown below. 

   Validate will return true if the signature matches **and** the request isn't too old. Validate will check the signature included in RequestData.AuthorizationHeader.Signature with the signature it generates, so make sure it is populated if you use it.

   ```typescript
   import * as crypto from 'crypto-js'
   import { server } from 'signing'
   
   let dep = { algo: [crypto.HmacSHA256, crypto.SHA256] }
   let validSignature = server.validate(
   dep : any,
   reqData : RequestData, 
   secretKey : string) : boolean
   
   // Or do it this way to bypass the time check
   let dep = { algo: [crypto.HmacSHA256, crypto.SHA256] }
   let serverSignature = createSignature(
   dep : any,
   reqData : RequestData, 
   secretKey : string) : boolean
   ```

4. If the signature was valid let the request continue, else return 401 Unauthorized.

#### Client Side:

##### You wish to send out a signed request. 

1. You use client.createRequestData to create the data structure to be passed in. 

   ```typescript
   createRequestData(
   	method : string, 	// The HTTP request method you will use
       path : string,   	// The path you are sending the request to
       algorithm : string, // The algorithm you wish to use (make sure it's supported)
       tenantID : string,	// The tenantID the request will be sent under
       payload : string, 	// The payload of your request
       apikey : string,	// This your api key you will send to the server
       api : string,		// The api identifier included in the path
       version : string, 	// The version of the API you will be using
       service : string,	// The service name included in the path
       query : Map<string,string>,	// Any query arguments you are passing
       signedHeaders : string[],	// Any headers which you will sign
       headersMap : Map<string, string>, // All signed headers you will send will
       								  // need to be included in this map
       datetime : string,	// The datetime that will be sent in the X-Evri-Date header
       signature : string)	// Leave this blank
   ```

2. You will pass in your RequestData generated in the previous step, into client.createAuthorizationHeader. This will return the value of the authorization header formatted to be sent to the server. You can also pass it into createSignature if you'd prefer to format the authorization header yourself.

   ```typescript
   import * as crypto from 'crypto-js'
   import { client } from 'signing'
   
   let dep = { algo: [crypto.HmacSHA256, crypto.SHA256] }
   let authHeader = client.createAuthorizationHeader(
   dep : any,
   reqData : RequestData, 
   secretKey : string) : boolean
   ```

3. Attach the authorization header to your request along with **all** headers that were signed. Here is what it looks like in node.js using Koa:

   ```
   ctx.set("Authorization", authHeader)
   ctx.set("Host", hostName)
   ctx.set("content-type", "application/json")
   // ... any other signed headers
   ```

   Your request is ready to be sent.
