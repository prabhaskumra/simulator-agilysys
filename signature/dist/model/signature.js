"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
function test() {
    console.log('This same path can call Validate,' +
        'createAuthorizationHeader, createSignature');
}
exports.test = test;
function validate(dep, reqData, secretKey) {
    // dateTime Check
    if (RequestIsOld(reqData)) {
        return false;
    }
    var signingKey = createSigningKey(dep, reqData, secretKey);
    var canonicalRequest = createCanonicalRequest(dep, reqData);
    var stringToSign = createStringToSign(dep, reqData, canonicalRequest);
    var serverSignature = sign(dep, stringToSign, signingKey).toString();
    // signature Match Check
    if (serverSignature !== reqData.AuthorizationHeader.Signature) {
        return false;
    }
    return true;
}
exports.validate = validate;
function RequestIsOld(reqData) {
    var moment = require('moment');
    var currDate = new moment();
    var passedDate = new moment(reqData.DateTime);
    var secDiff = currDate.diff(passedDate, 's');
    if (secDiff > 300) {
        return true;
    }
    return false;
}
function createAuthorizationHeader(dep, reqData, secretKey) {
    var signature = createSignature(dep, reqData, secretKey);
    var algorithm = reqData.AuthorizationHeader.Algorithm;
    var apiKey = reqData.AuthorizationHeader.APIKey;
    var credentialScope = reqData.AuthorizationHeader.CredentialScope.Date + '/'
        + reqData.AuthorizationHeader.CredentialScope.Tenant + '/'
        + reqData.AuthorizationHeader.CredentialScope.Service + '/'
        + config_1.config.requestVersion;
    var SignedHeaders = reqData.AuthorizationHeader.SignedHeaders
        .map(function (a) { return a.toLowerCase(); })
        .sort()
        .join(';');
    return 'Authorization: ' + algorithm
        + ' Credential=' + apiKey + '/' + encodeURIComponent(credentialScope)
        + ', SignedHeaders=' + SignedHeaders
        + ', Signature=' + signature;
}
exports.createAuthorizationHeader = createAuthorizationHeader;
function createSignature(dep, reqData, secretKey) {
    var signingKey = createSigningKey(dep, reqData, secretKey);
    var canonicalRequest = createCanonicalRequest(dep, reqData);
    var stringToSign = createStringToSign(dep, reqData, canonicalRequest);
    return sign(dep, stringToSign, signingKey).toString();
}
exports.createSignature = createSignature;
function createSigningKey(dep, reqData, secretKey) {
    var signatureKey = calculateSigningKey(dep, secretKey, reqData.AuthorizationHeader.CredentialScope.Date, reqData.AuthorizationHeader.CredentialScope.Tenant, reqData.AuthorizationHeader.CredentialScope.Service);
    return signatureKey;
}
function calculateSigningKey(dep, secretKey, date, authID, service) {
    var kDate = sign(dep, date, 'EVRI' + secretKey);
    var kAuth = sign(dep, authID, kDate);
    var kService = sign(dep, service, kAuth);
    var kSign = sign(dep, config_1.config.requestVersion, kService);
    return kSign;
}
function sign(dep, stringToSign, key) {
    return dep.algo[0](stringToSign, key);
}
function hash(dep, stringToHash) {
    return dep.algo[1](stringToHash);
}
function createCanonicalRequest(dep, reqData) {
    var canonicalpath = createCanonicalPath(reqData.URI.Path);
    var canonicalQuerystring = createCanonicalQuery(reqData.URI.Query);
    var canonicalHeaders = createCanonicalHeaders(reqData);
    var payloadHash = hash(dep, reqData.Payload);
    var signedHeaders = createSignedHeaders(reqData.AuthorizationHeader.SignedHeaders);
    var canonicalRequest = reqData.RequestType + '\n'
        + canonicalpath + '\n'
        + canonicalQuerystring + '\n'
        + canonicalHeaders + '\n'
        + signedHeaders + '\n'
        + payloadHash;
    return canonicalRequest;
}
function createCanonicalPath(path) {
    if (path.length === 0) {
        throw Error('The path cannot be empty.');
    }
    if (path[0] !== '/') {
        path = '/' + path;
    }
    if (path[path.length - 1] !== '/') {
        path = path + '/';
    }
    var pathArray = path.split('/');
    var encodedPathArray = [];
    pathArray.forEach(function (pathSegment) {
        encodedPathArray.push(encodeURIComponent(pathSegment));
    });
    return encodedPathArray.join('/');
}
function createSignedHeaders(signedHeaders) {
    if (signedHeaders.length < 1) {
        throw Error('Signed headers cannot be empty.');
    }
    var result = signedHeaders
        .map(function (a) { return a.toLowerCase(); })
        .sort()
        .reduce(function (prev, cur) {
        return prev + cur + ';';
    }, '');
    result = result.substr(0, result.length - 1);
    return result;
}
function createCanonicalHeaders(reqData) {
    var canonicalHeaders = [];
    for (var _i = 0, _a = reqData.AuthorizationHeader.SignedHeaders; _i < _a.length; _i++) {
        var header = _a[_i];
        if (!reqData.HeaderValues.has(header)) {
            throw Error('Cannot find value of signed header.');
        }
        canonicalHeaders.push(header.toLowerCase() + ':'
            + trimall(reqData.HeaderValues.get(header)) + '\n');
    }
    return canonicalHeaders
        .sort()
        .join('');
}
function trimall(str) {
    try {
        var result = str.trim()
            .replace(/\s+/g, ' ');
        return result;
    }
    catch (_a) {
        return '';
    }
}
function createCanonicalQuery(query) {
    if (query.size === 0) {
        return '';
    }
    var queryList = Array.from(query);
    var results = queryList
        .map(function (element) {
        return [encodeURIComponent(element[0].toLowerCase()),
            encodeURIComponent(element[1])];
    })
        .sort()
        .filter(function (element) {
        return element[0].toLowerCase() !== 'x-evri-signature';
    })
        .reduce(function (prev, cur) {
        return prev + cur + '&';
    }, '');
    results = results.substr(0, results.length - 1);
    return results.split(',').join('=');
}
function createStringToSign(dep, reqData, canonicalRequest) {
    var result = reqData.AuthorizationHeader.Algorithm + '\n'
        + reqData.DateTime + '\n'
        + createCredentialScope(reqData) + '\n'
        + hash(dep, canonicalRequest);
    return result;
}
function createCredentialScope(reqData) {
    var result = reqData.AuthorizationHeader.CredentialScope.Date + '/' +
        reqData.AuthorizationHeader.CredentialScope.Tenant + '/' +
        reqData.AuthorizationHeader.CredentialScope.Service + '/' +
        config_1.config.requestVersion;
    return result;
}
