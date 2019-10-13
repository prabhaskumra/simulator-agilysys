"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_1 = require("./signatureTests/adapter");
var signature_1 = require("./signature");
var crypto = require("crypto-js");
var dt = require("./formatDateTime");
var signature_2 = require("./signature");
describe('signing/signature tests', function () {
    it('The validate fails an out of date request', function () {
        var reqData = adapter_1.convert({
            Path: 'this/is/some/path/that/is/accepted',
            Datetime: '20171228T123243Z',
            Tenant: 'some_example_tenant',
            Service: 'some_example_service',
            Algorithm: 'HmacSHA256',
            API: 'test_api_version',
            Version_Name: 'test_version',
            Request_Type: 'TEST_REQUEST',
            Payload: 'TEST_PAYLOAD',
            API_Key: 'TEST_API_KEY',
            Signed_Headers: [
                'host',
                'x-EvRi-DaTe',
                'coNTenT-type',
            ],
            Query: new Map([
                ['this_maps_to', 'that'],
                ['and_this_too', 'maps_to_that'],
            ]),
            Header_Values: new Map([
                ['host', 'www.everi.com'],
                ['coNTenT-type', 'application/json'],
                ['x-EvRi-DaTe', '20191228T123243Z'],
            ]),
        });
        var secretKey = 'TEST_SECRET_KEY';
        var dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        var valid = signature_1.validate(dep, reqData, secretKey);
        expect(valid).toBe(false);
    });
    it('The validate accepts a valid request', function () {
        var dateTime = dt.getDateTime(new Date());
        var reqData = adapter_1.convert({
            Path: 'this/is/some/path/that/is/accepted',
            Datetime: dateTime,
            Tenant: 'some_example_tenant',
            Service: 'some_example_service',
            Algorithm: 'HmacSHA256',
            API: 'test_api_version',
            Version_Name: 'test_version',
            Request_Type: 'TEST_REQUEST',
            Payload: 'TEST_PAYLOAD',
            API_Key: 'TEST_API_KEY',
            Signed_Headers: [
                'host',
                'x-EvRi-DaTe',
                'coNTenT-type',
            ],
            Query: new Map([
                ['this_maps_to', 'that'],
                ['and_this_too', 'maps_to_that'],
            ]),
            Header_Values: new Map([
                ['host', 'www.everi.com'],
                ['coNTenT-type', 'application/json'],
                ['x-EvRi-DaTe', dateTime],
            ]),
        });
        var secretKey = 'TEST_SECRET_KEY';
        var dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        reqData.AuthorizationHeader.Signature =
            signature_2.createSignature(dep, reqData, secretKey);
        var valid = signature_1.validate(dep, reqData, secretKey);
        expect(valid).toBe(true);
    });
});
