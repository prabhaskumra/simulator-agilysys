"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseAuthorization(authheader) {
    var tempauth = authheader.split(' ');
    if (tempauth[0] !== 'Authorization:' ||
        tempauth[2].substr(0, 11) !== 'Credential=' ||
        tempauth[3].substr(0, 14) !== 'SignedHeaders=' ||
        tempauth[4].substr(0, 10) !== 'Signature=') {
        throw new Error('Invalid Static Values');
    }
    var algorithm = tempauth[1];
    tempauth = tempauth.splice(2).join('').split(',');
    var credentialScope = createCredentialScope(tempauth[0]);
    var signedHeader = tempauth[1]
        .split('=')[1]
        .split(';')
        .map(function (element) { return element.toLowerCase(); });
    var sig = tempauth[2].split('=')[1];
    var apiKey = tempauth[0].split('/')[0].split('=')[1];
    return { Algorithm: algorithm, APIKey: apiKey, SignedHeaders: signedHeader,
        Signature: sig, CredentialScope: credentialScope };
}
exports.parseAuthorization = parseAuthorization;
function createCredentialScope(credString) {
    var credScope = decodeURIComponent(credString).split('/');
    return {
        Date: credScope[1],
        Tenant: credScope[2],
        Service: credScope[3],
    };
}
