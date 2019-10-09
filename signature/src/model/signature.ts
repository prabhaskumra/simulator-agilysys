import * as AuthorizationTypes from './interface/requestData';
import { config } from './config';

export function validate(dep: any, reqData: AuthorizationTypes.RequestData, secretKey: string): boolean
{
    if (RequestIsOld(reqData))
    {
        return false;
    }

    const signingKey = createSigningKey(dep, reqData, secretKey);
    const canonicalRequest = createCanonicalRequest(dep, reqData);
    const stringToSign = createStringToSign(dep, reqData, canonicalRequest);
    const serverSignature = sign(
            dep,
            stringToSign,
            signingKey,
        ).toString();

    if (serverSignature !== reqData.AuthorizationHeader.Signature)
    {
        return false;
    }

    return true;
}

function RequestIsOld(reqData: AuthorizationTypes.RequestData): boolean
{
    const moment = require('moment');
    const currDate = new moment();
    const passedDate: any = new moment(reqData.DateTime);
    const secDiff: number = currDate.diff(passedDate, 's');
    if (secDiff > 300)
    {
        return true;
    }
    return false;
}

export function createAuthorizationHeader(dep: any, reqData: AuthorizationTypes.RequestData, secretKey: string): string
{
    const signature: string = createSignature(dep, reqData, secretKey);
    const algorithm: string = reqData.AuthorizationHeader.Algorithm;
    const apiKey: string = reqData.AuthorizationHeader.APIKey;
    const credentialScope: string =
        reqData.AuthorizationHeader.CredentialScope.Date + '/'
        + reqData.AuthorizationHeader.CredentialScope.Tenant + '/'
        + reqData.AuthorizationHeader.CredentialScope.Service + '/'
        + config.requestVersion;

    const SignedHeaders: string = reqData.AuthorizationHeader.SignedHeaders
            .map((a: string) => a.toLowerCase())
            .sort()
            .join(';');
    return 'Authorization: ' + algorithm
    + ' Credential=' + apiKey + '/' + encodeURIComponent(credentialScope)
    + ', SignedHeaders=' + SignedHeaders
    + ', Signature=' + signature;
}

export function createSignature(dep: any, reqData: AuthorizationTypes.RequestData, secretKey: string): string
{
    const signingKey = createSigningKey(dep, reqData, secretKey);
    const canonicalRequest = createCanonicalRequest(dep, reqData);
    const stringToSign = createStringToSign(dep, reqData, canonicalRequest);

    return sign(
            dep,
            stringToSign,
            signingKey,
        ).toString();
}

function createSigningKey(dep: any,
        reqData: AuthorizationTypes.RequestData,
        secretKey: string)
{
    const signatureKey = calculateSigningKey(
        dep,
        secretKey,
        reqData.AuthorizationHeader.CredentialScope.Date,
        reqData.AuthorizationHeader.CredentialScope.Tenant,
        reqData.AuthorizationHeader.CredentialScope.Service,
    );

    return signatureKey;
}

function calculateSigningKey(
    dep: any,
    secretKey: string,
    date: string,
    authID: string,
    service: string)
{
    const kDate = sign(dep, date, 'EVRI' + secretKey);
    const kAuth = sign(dep, authID, kDate);
    const kService = sign(dep, service, kAuth);
    const kSign = sign(dep, config.requestVersion, kService);
    return kSign;
}

function sign(dep: any, stringToSign: string, key: string)
{
    return dep.algo[0](stringToSign, key);
}

function hash(dep: any, stringToHash: string)
{
    return dep.algo[1](stringToHash);
}

function createCanonicalRequest(dep: any,
    reqData: AuthorizationTypes.RequestData)
{
    const canonicalpath = createCanonicalPath(reqData.URI.Path);
    const canonicalQuerystring = createCanonicalQuery(reqData.URI.Query);
    const canonicalHeaders = createCanonicalHeaders(reqData);
    const payloadHash = hash(dep, reqData.Payload);
    const signedHeaders =
        createSignedHeaders(reqData.AuthorizationHeader.SignedHeaders);
    const canonicalRequest =
        reqData.RequestType + '\n'
        + canonicalpath + '\n'
        + canonicalQuerystring + '\n'
        + canonicalHeaders + '\n'
        + signedHeaders + '\n'
        + payloadHash;

    return canonicalRequest;
}

function createCanonicalPath(path: string): string
{
    if (path.length === 0)
    {
        throw Error('The path cannot be empty.');
    }
    if (path[0] !== '/')
    {
        path = '/' + path;
    }
    if (path[path.length - 1] !== '/')
    {
        path = path + '/';
    }

    const pathArray: string[] = path.split('/');
    const encodedPathArray: string[] = [];
    pathArray.forEach((pathSegment) =>
    {
        encodedPathArray.push(encodeURIComponent(pathSegment));
    });
    return encodedPathArray.join('/');
}

function createSignedHeaders(signedHeaders: string[])
{
    if (signedHeaders.length < 1)
    {
        throw Error('Signed headers cannot be empty.');
    }

    let result = signedHeaders
        .map((a: string) => a.toLowerCase())
        .sort()
        .reduce((prev: any, cur: any) =>
        {
            return prev + cur + ';';
        }, '');

    result = result.substr(0, result.length - 1);

    return result;
}

function createCanonicalHeaders(reqData: AuthorizationTypes.RequestData)
{
    const canonicalHeaders: string[] = [];

    for (const header of reqData.AuthorizationHeader.SignedHeaders)
    {
        if (!reqData.HeaderValues.has(header))
        {
            throw Error('Cannot find value of signed header.');
        }

        canonicalHeaders.push(header.toLowerCase() + ':'
            + trimall(reqData.HeaderValues.get(header)) + '\n');
    }
    return canonicalHeaders
        .sort()
        .join('');
}

function trimall(str: string)
{
    try
    {
        const result = str.trim()
                    .replace(/\s+/g, ' ');
        return result;
    }
    catch
    {
        return '';
    }
}

function createCanonicalQuery(query: Map <string, string>)
{
    if (query.size === 0)
    {
        return '';
    }

    const queryList = Array.from(query);
    let results = queryList
        .map( (element) =>
        {
            return [encodeURIComponent(
                element[0].toLowerCase()),
                encodeURIComponent(element[1])];
        })
        .sort()
        .filter( (element) =>
        {
            return element[0].toLowerCase() !== 'x-evri-signature';
        })
        .reduce(
            (prev: any, cur: any) =>
            {
                return prev + cur + '&';
            }, '');

    results = results.substr(0, results.length - 1);

    return results.split(',').join('=');
}

function createStringToSign(dep: any,
    reqData: AuthorizationTypes.RequestData,
    canonicalRequest: string)
{
    const result = reqData.AuthorizationHeader.Algorithm + '\n'
    + reqData.DateTime + '\n'
    + createCredentialScope(reqData) + '\n'
    + hash(dep, canonicalRequest);

    return result;
}

function createCredentialScope(reqData: AuthorizationTypes.RequestData)
{
    const result =  reqData.AuthorizationHeader.CredentialScope.Date + '/' +
        reqData.AuthorizationHeader.CredentialScope.Tenant + '/' +
        reqData.AuthorizationHeader.CredentialScope.Service + '/' +
        config.requestVersion;

    return result;
}
