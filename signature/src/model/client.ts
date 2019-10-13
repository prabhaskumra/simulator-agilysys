import * as signingTypes from './interface/requestData';
import { createRequestData } from './requestCreation';
import { createSignature, createAuthorizationHeader } from './signature';
import { getDateTime } from './formatDateTime';

export const client = {
    signingTypes,
    createRequestData,
    createAuthorizationHeader,
    createSignature,
    getDateTime,
};
