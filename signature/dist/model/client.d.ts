import * as signingTypes from './interface/requestData';
import { createRequestData } from './requestCreation';
import { createSignature, createAuthorizationHeader } from './signature';
import { getDateTime } from './formatDateTime';
export declare const client: {
    signingTypes: typeof signingTypes;
    createRequestData: typeof createRequestData;
    createAuthorizationHeader: typeof createAuthorizationHeader;
    createSignature: typeof createSignature;
    getDateTime: typeof getDateTime;
};
