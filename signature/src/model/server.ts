import * as signingTypes from './interface/requestData';
import { parseAuthorization } from './requestParse';
import { createRequestData } from './requestCreation';
import { validate, createSignature } from './signature';
import { getDateTime } from './formatDateTime';

export const server = {
    signingTypes,
    parseAuthorization,
    createRequestData,
    validate,
    createSignature,
    getDateTime,
};
