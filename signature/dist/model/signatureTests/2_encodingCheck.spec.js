"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signature_1 = require("../signature");
var crypto = require("crypto-js");
var adapter_1 = require("./adapter");
describe('Checking various examples with encoding', function () {
    it('Test 8 - A check to make sure subpaths are getting encoded', function () {
        var reqData = adapter_1.convert({
            Path: '/documents and settings/thing/',
            Datetime: '19001122T091221Z',
            Tenant: '8771500',
            Service: 'thisIsAService',
            Algorithm: 'HmacSHA256',
            API: 'internal-api',
            Version_Name: 'v233',
            Request_Type: 'PUT',
            Payload: 'SomeMessageThing',
            API_Key: 'abebebabeba234546234522345245',
            Signed_Headers: [
                'host',
            ],
            Query: new Map([
                ['this_maps_to', 'that_thing_over_there'],
                ['and_this_to', 'this_thing_here'],
                ['X-Evri-Date', '19001122T091221Z'],
            ]),
            Header_Values: new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        var secretKey = '235447272775574552572';
        var dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        var generatedAuthorizationHeader = signature_1.createAuthorizationHeader(dep, reqData, secretKey);
        var expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
            'Credential=abebebabeba234546234522345245/19001122%2F8771500%2F' +
            'thisIsAService%2Fevri1_request, SignedHeaders=host, Signature=' +
            'eb6b156813d4aaef7101330db9bf2d6cbd5269dc3f29a03d5a9becb3479301f4';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });
    it('Test 15 - A check to make sure query keys are getting encoded', function () {
        var reqData = adapter_1.convert({
            Path: '/documentsandsettings/thing/',
            Datetime: '19001122T091221Z',
            Tenant: '8771500',
            Service: 'thisIsAService',
            Algorithm: 'HmacSHA256',
            API: 'internal-api',
            Version_Name: 'v233',
            Request_Type: 'PUT',
            Payload: 'SomeMessageThing',
            API_Key: 'abebebabeba234546234522345245',
            Signed_Headers: [
                'host',
            ],
            Query: new Map([
                ['this maps to', 'that_thing_over_there'],
                ['and this to', 'this_thing_here'],
                ['X-Evri-Date', '19001122T091221Z'],
            ]),
            Header_Values: new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        var secretKey = '235447272775574552572';
        var dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        var generatedAuthorizationHeader = signature_1.createAuthorizationHeader(dep, reqData, secretKey);
        var expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
            'Credential=abebebabeba234546234522345245/19001122%2F8771500%2F' +
            'thisIsAService%2Fevri1_request, SignedHeaders=host, Signature=' +
            'fff87b0305d440f08d4f6cc65af9812db8fd64336afe756d3a55bca71d436ae9';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });
    it('Test 16 - A check to make sure query values are getting encoded', function () {
        var reqData = adapter_1.convert({
            Path: '/documentsandsettings/thing/',
            Datetime: '19001122T091221Z',
            Tenant: '8771500',
            Service: 'thisIsAService',
            Algorithm: 'HmacSHA256',
            API: 'internal-api',
            Version_Name: 'v233',
            Request_Type: 'PUT',
            Payload: 'SomeMessageThing',
            API_Key: 'abebebabeba234546234522345245',
            Signed_Headers: [
                'host',
            ],
            Query: new Map([
                ['this_maps_to', 'that thing over there'],
                ['and_this_to', 'this thing here'],
                ['X-Evri-Date', '19001122T091221Z'],
            ]),
            Header_Values: new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        var secretKey = '235447272775574552572';
        var dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        var generatedAuthorizationHeader = signature_1.createAuthorizationHeader(dep, reqData, secretKey);
        var expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
            'Credential=abebebabeba234546234522345245/19001122%2F8771500%2Fth' +
            'isIsAService%2Fevri1_request, SignedHeaders=host, Signature=' +
            'f46b7151c7369bb6485d7e5a5223e9c8a1ccff87ad4bfe775ae980df45875b8f';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });
});
