const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
var rp = require('request-promise');
var sig = require('signature');
var crypto = require('crypto-js');


const writeToTerminal = require("./writeToTerminal")


module.exports = {
    BalanceInquiry : async function BalanceInquiry(accountNumber){
        //db.read()

        //onsubmit(accountNumber);

        let foundAccount = undefined;
        // var playerData = db.get('players').value()
        // console.log(playerData)
        // for(let i = 0; i < playerData.length; i++)
        //     if(playerData[i].accountNumber === String(accountNumber)){
        //       foundAccount = playerData[i]
        //     }
                

        // if(foundAccount === undefined)
        //     return
        
        // console.log(foundAccount)


        var request = '';
        var response = '';
    
        var body = {
            playerCardNumber: accountNumber,
            retailCode: '1234',
            merchantId: '2508',
            retailMerchantId: 'SEM',
            terminalId: '1111',
        };
    
        // const baseUrl = environment.environments[environment.selectedEnvironment].scheme
        //     + '://' + environment.environments[environment.selectedEnvironment].host
        //   //  + ':' + environment.environments[environment.selectedEnvironment].port
        //     + '/' + environment.api + '/retail'
        //     + '/' + environment.ver
        //     + '/';
        const baseUrl = 'http://mobilewallet.qa.everi.com:8000/tpv/retail/v2/';
    
        // const url = baseUrl
        //     + environment.environments[environment.selectedEnvironment].tenantId
        //     + '/balances/'
        //     + this.balanceForm.value.referenceId;
    
        
        // var referenceId = '6372374344876' ; //need to change!!!!
        var num = Math.floor(Math.random() * 100000000 + 600000000);
        var referenceId = num.toString(10);

        const url = baseUrl + '2'+ '/balances/' + referenceId;
    
        // for signature only
        // const path = '/' + environment.api + '/retail'
        //     + '/' + environment.ver
        //     + '/' + environment.environments[environment.selectedEnvironment].tenantId
        //     + '/balances/'
        //     + this.balanceForm.value.referenceId;
        const path = '/tpv/retail/v2/2/balances/' + referenceId;
    
        const reqData = sig.client.createRequestData(
            'POST',  // method,
            path,
            'HmacSHA256', // algorithm,
            // environment.environments[environment.selectedEnvironment].tenantId,  // tenantID,
            1,
            JSON.stringify(body),  // payload,
            // environment.environments[environment.selectedEnvironment].apiKey,  // apikey,
            'abed1254abcd1234', //in dev mode
            // environment.api,  // api,
            'tpv',
            // environment.ver,  // version,
            'v2',
            // environment.service,  // service,
            'wallet',
           new Map(),
            ['host', 'content-type'],  // signedHeaders,
            new Map([   // headersMap,
                // ['host', environment.environments[environment.selectedEnvironment].host],// + ':'
                ['host', 'mobilewallet.qa.everi.com' + ':' + '8000'],
             //    + environment.environments[environment.selectedEnvironment].port],
                ['content-type', 'application/json']
            ]),
            sig.client.getDateTime(new Date()),
            'noSignatureOnClientSide', // signature
        );
        //console.log(reqData)
    
        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
    
        const authHeader = sig.client.createAuthorizationHeader(
            dep,
            reqData,
            // environment.environments[environment.selectedEnvironment].secretKey
            'abed1234abcd1234'
        );
    
        //console.log(authHeader);
    
        let headersObject = {};       // tslint:disable-line
        reqData.HeaderValues.forEach((value, key, map) => {
            headersObject[key] = value;
        });
        const req = {
            Query: '',
            Path: reqData.URI.Path,
            Body: body,
            SignedHeaders: reqData.AuthorizationHeader.SignedHeaders,
            HeaderValues: headersObject,
            Authorization: authHeader
        };
        this.request += 'URL: ' + url + '\n';
        this.request += JSON.stringify(req, null, 4);
    
        var options = {
            method: 'POST',
            uri: url,
            headers:{
                'Authorization': authHeader,
                'X-Evri-Date': reqData.DateTime,
                'content-type': 'application/json'
            },
            body,
            json: true // Automatically stringifies the body to JSON
        };
         

        // let PatronResponse = []
        // PatronResponse.push({
        //     ClubStateId: 40,//hardcoded for rn
        //     AccountNumber: accountNumber,
        //     FirstName: "Alice",
        //     LastName: "Bob", 
        //     ClubState: "Gold",
        //     DateOfBirth: "01/01/40",
        //     PointsBalance: 2000,
        //     PointsBalanceInDollars: 230.76,
        //     CompBalance: 0,
        //     Promo2Balance: 0,
        //     IsInActive: false,
        //     IsPinLocked: false,
        //     IsBanned: false,
        //     ResponseResult: {
        //         IsSuccess: true,
        //         ErrorMessage: "",
        //         ErrorCode: ""
        //     }
        // })

        // let ResponseStatus = {
        //         IsSuccess: true,
        //         ErrorMessage: "",
        //         ErrorCode: ""
        //     }
        

        return rp(options)
            .then((httpResponse) => {
                // POST succeeded...
                
                //PatronResponse.PointsBalance = httpResponse.availableBalance;
                // console.log(httpResponse.availableBalance);
                console.log(httpResponse);
                return httpResponse;
                // console.log("PATTTT");
                // console.log(PatronResponse.PointsBalance);
                // console.log("here");
                
                //return httpResponse;
                //foundAccount = await httpResponse;
                //return foundAccount;

            })
            .catch((err) => {
                // POST failed...
                console.log(err);
            });
        console.log("Break");

        // this.http
        //     .POST(url,
        //         JSON.stringify(body),
        //         {
        //             headers: {
        //                 'Authorization': authHeader,
        //                 'X-Evri-Date': reqData.DateTime,
        //                 'content-type': 'application/json'
        //                 // additional headers would go here.
        //                 // content-type and host should be in by default
        //             }
        //         })
        //     .toPromise()
        //     .then((httpResponse) => {
        //         this.response = JSON.stringify(httpResponse, null, 4);
        //     })
        //     .catch((err) => {
        //         this.response = JSON.stringify(err, null, 4);
        //     });
    
        
        // console.log("outside pointsbalance")
        // console.log(PatronResponse.PointsBalance);

        // return {
        //     PatronResponse,
        //     ResponseStatus
        // };
    }
}

// async function onsubmit(accountNumber)  {

    // Need HTTP Client for JS
    // URL of Service
    // Body of Request
    // Add Signature
    
    
    //     var request = '';
    //     var response = '';
    
    //     var body = {
    //         playerCardNumber: accountNumber,
    //         retailCode: '1234',
    //         merchantId: '2508',
    //         retailMerchantId: 'SEM',
    //         terminalId: '1111',
    //     };
    
    //     // const baseUrl = environment.environments[environment.selectedEnvironment].scheme
    //     //     + '://' + environment.environments[environment.selectedEnvironment].host
    //     //   //  + ':' + environment.environments[environment.selectedEnvironment].port
    //     //     + '/' + environment.api + '/retail'
    //     //     + '/' + environment.ver
    //     //     + '/';
    //     const baseUrl = 'http://mobilewallet.qa.everi.com:8000/tpv/retail/v2/';
    
    //     // const url = baseUrl
    //     //     + environment.environments[environment.selectedEnvironment].tenantId
    //     //     + '/balances/'
    //     //     + this.balanceForm.value.referenceId;
    
    //     var referenceId = '6654354876' ; //need to change!!!!
    //     const url = baseUrl + '1'+ '/balances/' + referenceId;
    
    //     // for signature only
    //     // const path = '/' + environment.api + '/retail'
    //     //     + '/' + environment.ver
    //     //     + '/' + environment.environments[environment.selectedEnvironment].tenantId
    //     //     + '/balances/'
    //     //     + this.balanceForm.value.referenceId;
    //     const path = '/tpv/retail/v2/1/balances/' + referenceId;
    
    //     const reqData = sig.client.createRequestData(
    //         'POST',  // method,
    //         path,
    //         'HmacSHA256', // algorithm,
    //         // environment.environments[environment.selectedEnvironment].tenantId,  // tenantID,
    //         1,
    //         JSON.stringify(body),  // payload,
    //         // environment.environments[environment.selectedEnvironment].apiKey,  // apikey,
    //         '21c0e607ab389394fa92d74b5c69cda3', //in dev mode
    //         // environment.api,  // api,
    //         'tpv',
    //         // environment.ver,  // version,
    //         'v2',
    //         // environment.service,  // service,
    //         'wallet',
    //        new Map(),
    //         ['host', 'content-type'],  // signedHeaders,
    //         new Map([   // headersMap,
    //             // ['host', environment.environments[environment.selectedEnvironment].host],// + ':'
    //             ['host', 'mobilewallet.qa.everi.com' + ':' + '8000'],
    //          //    + environment.environments[environment.selectedEnvironment].port],
    //             ['content-type', 'application/json']
    //         ]),
    //         sig.client.getDateTime(new Date()),
    //         'noSignatureOnClientSide', // signature
    //     );
    //     //console.log(reqData)
    
    //     const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
    
    //     const authHeader = sig.client.createAuthorizationHeader(
    //         dep,
    //         reqData,
    //         // environment.environments[environment.selectedEnvironment].secretKey
    //         '8ecf8cbd03b061fc5edc50fe970f1120'
    //     );
    
    //     //console.log(authHeader);
    
    //     let headersObject = {};       // tslint:disable-line
    //     reqData.HeaderValues.forEach((value, key, map) => {
    //         headersObject[key] = value;
    //     });
    //     const req = {
    //         Query: '',
    //         Path: reqData.URI.Path,
    //         Body: body,
    //         SignedHeaders: reqData.AuthorizationHeader.SignedHeaders,
    //         HeaderValues: headersObject,
    //         Authorization: authHeader
    //     };
    //     this.request += 'URL: ' + url + '\n';
    //     this.request += JSON.stringify(req, null, 4);
    
    //     var options = {
    //         method: 'POST',
    //         uri: url,
    //         headers:{
    //             'Authorization': authHeader,
    //             'X-Evri-Date': reqData.DateTime,
    //             'content-type': 'application/json'
    //         },
    //         body,
    //         json: true // Automatically stringifies the body to JSON
    //     };
         
    //     rp(options)
    //         .then((httpResponse) => {
    //             // POST succeeded...
    //             console.log(httpResponse);
    //         })
    //         .catch((err) => {
    //             // POST failed...
    //             console.log(err);
    //         });
    
    //     // this.http
    //     //     .POST(url,
    //     //         JSON.stringify(body),
    //     //         {
    //     //             headers: {
    //     //                 'Authorization': authHeader,
    //     //                 'X-Evri-Date': reqData.DateTime,
    //     //                 'content-type': 'application/json'
    //     //                 // additional headers would go here.
    //     //                 // content-type and host should be in by default
    //     //             }
    //     //         })
    //     //     .toPromise()
    //     //     .then((httpResponse) => {
    //     //         this.response = JSON.stringify(httpResponse, null, 4);
    //     //     })
    //     //     .catch((err) => {
    //     //         this.response = JSON.stringify(err, null, 4);
    //     //     });
    // }
    

