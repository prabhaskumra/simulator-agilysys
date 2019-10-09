"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convert(args) {
    var credScope = {
        Date: args.Datetime.substring(0, 8),
        Tenant: args.Tenant,
        Service: args.Service,
    };
    var authHeader = {
        Algorithm: args.Algorithm,
        CredentialScope: credScope,
        APIKey: args.API_Key,
        SignedHeaders: args.Signed_Headers,
        Signature: 'blank',
    };
    var URI = {
        Path: args.Path,
        Query: args.Query,
        API: args.API,
        VersionName: args.Version_Name,
        TennantID: args.Tenant,
        ServiceName: args.Service,
    };
    var reqData = {
        AuthorizationHeader: authHeader,
        RequestType: args.Request_Type,
        HeaderValues: args.Header_Values,
        URI: URI,
        DateTime: args.Datetime,
        Payload: args.Payload,
    };
    return reqData;
}
exports.convert = convert;
