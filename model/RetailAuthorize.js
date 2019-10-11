const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

var rp = require('request-promise');
var sig = require('signature');
var crypto = require('crypto-js');

const writeToTerminal = require("./writeToTerminal")

module.exports = {
    RetailAuthorize : async function RetailAuthorize(accountNumber, compList){
        db.read()



    var request = '';
    var response = '';

    
    var amountRedeem = compList[0].RedeemAmount;
    var taxCalculated = (8.25*amountRedeem)/100;
    // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    // console.log(amountRedeem);

    var body = {
        playerCardNumber: accountNumber,
        retailCode: "1234",
        merchantId: "2508",
        retailMerchantId: "SEM",
        terminalId: '1111',
        transactionAmount: amountRedeem,
        taxAmount: taxCalculated,
        currencyCode: 'USD',
        allowPartialApproval: false,
        additionalProperties: 'test'

    };

    // const baseUrl = environment.environments[environment.selectedEnvironment].scheme
    //     + '://' + environment.environments[environment.selectedEnvironment].host
    //   //  + ':' + environment.environments[environment.selectedEnvironment].port
    //     + '/' + environment.api + '/retail'
    //     + '/' + environment.ver
    //     + '/';

    //var referenceId = '6587813749989072896' ; //need to change!!!!
    var num = Math.floor(Math.random() * 100000000 + 600000000);
    var referenceId = num.toString(10);

    const baseUrl = 'http://mobilewallet.qa.everi.com:8000/tpv/retail/v2/';

    // const url = baseUrl
    //     + environment.environments[environment.selectedEnvironment].tenantId
    //     + '/balances/'
    //     + this.balanceForm.value.referenceId;

    const url = baseUrl + '1'+ '/authorizations/' + referenceId;

    // for signature only
    // const path = '/' + environment.api + '/retail'
    //     + '/' + environment.ver
    //     + '/' + environment.environments[environment.selectedEnvironment].tenantId
    //     + '/balances/'
    //     + this.balanceForm.value.referenceId;
    const path = '/tpv/retail/v2/1/authorizations/' + referenceId;

    const reqData = sig.client.createRequestData(
        'PUT',  // method,
        path,
        'HmacSHA256', // algorithm,
        // environment.environments[environment.selectedEnvironment].tenantId,  // tenantID,
        1,
        JSON.stringify(body),  // payload,
        // environment.environments[environment.selectedEnvironment].apiKey,  // apikey,
        '21c0e607ab389394fa92d74b5c69cda3', //in dev mode
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
        '8ecf8cbd03b061fc5edc50fe970f1120'
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
        method: 'PUT',
        uri: url,
        headers:{
            'Authorization': authHeader,
            'X-Evri-Date': reqData.DateTime,
            'content-type': 'application/json'
        },
        body,
        json: true // Automatically stringifies the body to JSON
    };
     
    return rp(options)
        .then((httpResponse) => {
            // POST succeeded...
            console.log('succeeded????');
            console.log(httpResponse);
            return httpResponse;
        })
        .catch((err) => {
            // POST failed...
            console.log('error');
            console.log(err);
        });

        // return {
        //     AccountNumber: 1234,
        //     RedeemCouponResultList: [],
        //     ResponseStatus: {
        //         IsSuccess: true,
        //         ErrorMessage: "",
        //         ErrorCode: ""
        //     }
        // }

        
    }
}