"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signingTypes = require("./interface/requestData");
var requestCreation_1 = require("./requestCreation");
var signature_1 = require("./signature");
var formatDateTime_1 = require("./formatDateTime");
exports.client = {
    signingTypes: signingTypes,
    createRequestData: requestCreation_1.createRequestData,
    createAuthorizationHeader: signature_1.createAuthorizationHeader,
    createSignature: signature_1.createSignature,
    getDateTime: formatDateTime_1.getDateTime,
};
