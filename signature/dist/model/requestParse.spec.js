"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestParse_1 = require("./requestParse");
describe('signing/requestParse.ts', function () {
    it('A sample authorization header gets parsed correctly.', function () {
        var expectedResult = {
            Algorithm: 'SomeAlgorithm',
            APIKey: 'testApiKey',
            SignedHeaders: [
                'host',
                'x-evri-date',
                'content-type',
            ],
            Signature: 'ehrmagherd_a_signature',
            CredentialScope: {
                Date: '20180815',
                Tenant: '8771500',
                Service: 'example_service',
            },
        };
        var authHeader = 'Authorization: SomeAlgorithm ' +
            'Credential=testApiKey/20180815/8771500/example_service/evri_request,' +
            ' SignedHeaders=Host;X-Evri-Date;content-type,' +
            ' Signature=ehrmagherd_a_signature';
        var result = requestParse_1.parseAuthorization(authHeader);
        expect(JSON.stringify(result, null, 4))
            .toBe(JSON.stringify(expectedResult, null, 4));
    });
});
