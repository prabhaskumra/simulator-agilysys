"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signature_1 = require("../signature");
var crypto = require("crypto-js");
var adapter_1 = require("./adapter");
describe('Checking different use cases pass', function () {
    it('Test 1 - Mixed request should pass,' +
        ' also tests sorting of signed headers', function () {
        var reqData = adapter_1.convert({
            Path: 'this/is/some/path/that/is/accepted',
            Datetime: '20191228T123243Z',
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
        var generatedAuthorizationHeader = signature_1.createAuthorizationHeader(dep, reqData, secretKey);
        var expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
            'Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_e' +
            'xample_service%2Fevri1_request, SignedHeaders=content-type;host;' +
            'x-evri-date, Signature=c1af186a0d635fa455e6535cf627b196cbeebdc05' +
            '04882d38ef395b1cc6e8234';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });
    it('Test 2 - Query only request should pass', function () {
        var reqData = adapter_1.convert({
            Path: '/api/wallet/something/',
            Datetime: '20001122T091221Z',
            Tenant: '1214121242',
            Service: 'wallet',
            Algorithm: 'HmacSHA256',
            API: 'tpv-api',
            Version_Name: 'v1',
            Request_Type: 'GET',
            Payload: '',
            API_Key: '15542975987127657289789487',
            Signed_Headers: [
                'HOST',
            ],
            Query: new Map([
                ['this_maps_to', 'that'],
                ['and_this_too', 'maps_to_that'],
                ['X-Evri-Date', '20001122T091221Z'],
            ]),
            Header_Values: new Map([
                ['HOST', 'www.everi.com'],
            ]),
        });
        var secretKey = '456766472774737474271237473';
        var dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        var generatedAuthorizationHeader = signature_1.createAuthorizationHeader(dep, reqData, secretKey);
        var expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
            'Credential=15542975987127657289789487/20001122%2F1214121242%2Fw' +
            'allet%2Fevri1_request, SignedHeaders=host, Signature=6bc3c86acec' +
            '66577db48f04edc69cc70dcc977eff1bab403ae45fbc74db5ea92';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });
    it('Test 5 - A request with an empty query string should pass', function () {
        var reqData = adapter_1.convert({
            Path: '/api/wallet/something',
            Datetime: '20001122T091221Z',
            Tenant: '1214121242',
            Service: 'wallet',
            Algorithm: 'HmacSHA256',
            API: 'tpv-api',
            Version_Name: 'v1',
            Request_Type: 'PUT',
            Payload: 'A_NONEMPTY_PAYLOAD',
            API_Key: '15542975987127657289789487',
            Signed_Headers: [
                'HOST',
            ],
            Query: new Map([]),
            Header_Values: new Map([
                ['HOST', 'www.everi.com'],
            ]),
        });
        var secretKey = '456766472774737474271237473';
        var dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        var generatedAuthorizationHeader = signature_1.createAuthorizationHeader(dep, reqData, secretKey);
        var expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
            'Credential=15542975987127657289789487/20001122%2F1214121242%2Fwa' +
            'llet%2Fevri1_request, SignedHeaders=host, Signature=6d2b0a91fcb49' +
            '86986b13f94577ca50d9b51c8bd65a39f3d926808cdece22ec0';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });
    it('Test 13 - "/"', function () {
        var reqData = adapter_1.convert({
            Path: '/',
            Datetime: '20191228T123243Z',
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
            ],
            Query: new Map([]),
            Header_Values: new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        var secretKey = 'TEST_SECRET_KEY';
        var dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        var generatedAuthorizationHeader = signature_1.createAuthorizationHeader(dep, reqData, secretKey);
        var expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
            'Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_' +
            'example_service%2Fevri1_request, SignedHeaders=host, Signature=' +
            'f0260c78dc883f5cf417965cf12aac5d8a992df99698b7f7bbc5e37d0c66f6b1';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });
});
