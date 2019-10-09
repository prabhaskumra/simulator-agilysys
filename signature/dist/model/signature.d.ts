import * as AuthorizationTypes from './interface/requestData';
export declare function test(): void;
export declare function validate(dep: any, reqData: AuthorizationTypes.RequestData, secretKey: string): boolean;
export declare function createAuthorizationHeader(dep: any, reqData: AuthorizationTypes.RequestData, secretKey: string): string;
export declare function createSignature(dep: any, reqData: AuthorizationTypes.RequestData, secretKey: string): string;
