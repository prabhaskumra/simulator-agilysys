import { createRequestData } from './requestCreation';
import { RequestData } from './interface/requestData';
import {} from 'jasmine';

describe('signing/requestCreation.ts', () =>
{

    it('A sample request gets formatted correctly.', () =>
    {
        const expectedResult: RequestData = {
            AuthorizationHeader: {
                Algorithm: 'HmacSHA256',
                APIKey: 'someApiKey',
                CredentialScope: {
                    Date: '20180815',
                    Tenant: 'the_tenant_Id',
                    Service: 'wallets',
                },
                SignedHeaders: [
                    'Host',
                    'X-Evri-Date',
                    'content-type',
                ],
                Signature: 'signature',
            },
            RequestType: 'A_METHOD',
            HeaderValues: new Map(),
            URI: {
                Path: '/a/path/to/the/api',
                Query: new Map(),
                API: 'tpv-api',
                VersionName: 'v2',
                TennantID: 'the_tenant_Id',
                ServiceName: 'wallets',
            },
            DateTime: '20180815',
            Payload: '',
        };
        const result: RequestData = createRequestData(
            'A_METHOD',
            '/a/path/to/the/api',
            'HmacSHA256',
            'the_tenant_Id',
            '',
            'someApiKey',
            'tpv-api',
            'v2',
            'wallets',
            new Map(),
            [
                'Host',
                'X-Evri-Date',
                'content-type',
            ],
            new Map(),
            '20180815',
            'signature',
        );

        expect(JSON.stringify(result, null, 4))
            .toBe(JSON.stringify(expectedResult, null, 4));
    });

});
