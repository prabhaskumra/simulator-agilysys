"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createRequestData(method, path, algorithm, tenantID, payload, apikey, api, version, service, query, signedHeaders, headersMap, datetime, signature) {
    var CredentialScope = {
        Date: datetime.substr(0, 8),
        Tenant: tenantID.toString(),
        Service: service,
    };
    var AuthorizationHeader = {
        Algorithm: algorithm,
        APIKey: apikey,
        CredentialScope: CredentialScope,
        SignedHeaders: signedHeaders,
        Signature: signature,
    };
    var URI = {
        Path: path,
        Query: query,
        API: api,
        VersionName: version,
        TennantID: tenantID.toString(),
        ServiceName: service,
    };
    var reqData = {
        AuthorizationHeader: AuthorizationHeader,
        RequestType: method,
        HeaderValues: headersMap,
        URI: URI,
        DateTime: datetime,
        Payload: payload,
    };
    return reqData;
}
exports.createRequestData = createRequestData;
