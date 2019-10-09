import { RequestData } from '../interface/requestData';
export function convert(args: any): RequestData
{
    const credScope = {
        Date : args.Datetime.substring(0, 8),
        Tenant : args.Tenant,
        Service : args.Service,
    };
    const authHeader = {
        Algorithm : args.Algorithm,
        CredentialScope : credScope,
        APIKey : args.API_Key,
        SignedHeaders : args.Signed_Headers,
        Signature : 'blank',
    };
    const URI = {
        Path : args.Path,
        Query : args.Query,
        API : args.API,
        VersionName : args.Version_Name,
        TennantID : args.Tenant,
        ServiceName : args.Service,
    };
    const reqData = {
        AuthorizationHeader : authHeader,
        RequestType : args.Request_Type,
        HeaderValues : args.Header_Values,
        URI,
        DateTime : args.Datetime,
        Payload : args.Payload,
    };
    return reqData;
}
