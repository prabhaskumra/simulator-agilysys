import * as AuthorizationTypes from './interface/requestData';

export function createRequestData(
    method: string,
    path: string,
    algorithm: string,
    tenantID: string,
    payload: string,
    apikey: string,
    api: string,
    version: string,
    service: string,
    query: Map<string, string>,
    signedHeaders: string[],
    headersMap: Map<string, string>,
    datetime: string,
    signature: string,
  ): AuthorizationTypes.RequestData
  {
    const CredentialScope: AuthorizationTypes.CredentialScope = {
      Date : datetime.substr(0, 8),
      Tenant : tenantID.toString(),
      Service : service,
    };

    const AuthorizationHeader: AuthorizationTypes.AuthorizationHeader = {
      Algorithm : algorithm,
      APIKey : apikey,
      CredentialScope,
      SignedHeaders : signedHeaders,
      Signature : signature,
    };

    const URI: AuthorizationTypes.Uri = {
      Path : path,
      Query : query,
      API : api,
      VersionName: version,
      TennantID: tenantID.toString(),
      ServiceName: service,
    };

    const reqData: AuthorizationTypes.RequestData = {
        AuthorizationHeader,
        RequestType : method,
        HeaderValues : headersMap,
        URI,
        DateTime : datetime,
        Payload : payload,
      };
    return reqData;
  }
