import * as signingTypes from './interface/requestData';
import { parseAuthorization } from './requestParse';
import { createRequestData } from './requestCreation';
import { validate, createSignature } from './signature';
import { getDateTime } from './formatDateTime';
export declare const server: {
    signingTypes: typeof signingTypes;
    parseAuthorization: typeof parseAuthorization;
    createRequestData: typeof createRequestData;
    validate: typeof validate;
    createSignature: typeof createSignature;
    getDateTime: typeof getDateTime;
};
