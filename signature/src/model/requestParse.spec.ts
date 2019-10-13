import { parseAuthorization } from './requestParse';
import { AuthorizationHeader } from './interface/requestData';
import {} from 'jasmine';

describe('signing/requestParse.ts', () =>
{

    it('A sample authorization header gets parsed correctly.', () =>
    {
        const expectedResult: AuthorizationHeader = {
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

        const authHeader: string = 'Authorization: SomeAlgorithm ' +
        'Credential=testApiKey/20180815/8771500/example_service/evri_request,' +
        ' SignedHeaders=Host;X-Evri-Date;content-type,' +
        ' Signature=ehrmagherd_a_signature';
        const result: AuthorizationHeader = parseAuthorization(authHeader);

        expect(JSON.stringify(result, null, 4))
            .toBe(JSON.stringify(expectedResult, null, 4));
    });

});
