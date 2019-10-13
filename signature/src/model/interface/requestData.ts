export interface RequestData {
    AuthorizationHeader: AuthorizationHeader;
    RequestType: string;
    HeaderValues: Map <string, string>;
    URI: Uri;
    DateTime: string;
    Payload: string;
}

export interface AuthorizationHeader {
    Algorithm: string;
    CredentialScope: CredentialScope;
    SignedHeaders: string[];
    APIKey: string;
    Signature?: string;
}

export interface CredentialScope {
    Date: string;
    Tenant: string;
    Service: string;
}

export interface Uri {
    Path: string;
    Query: Map <string, string>;
    API: string;
    VersionName: string;
    TennantID: string;
    ServiceName: string;
}
