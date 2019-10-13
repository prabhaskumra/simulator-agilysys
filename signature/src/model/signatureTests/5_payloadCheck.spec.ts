import { createAuthorizationHeader } from '../signature';
import * as crypto from 'crypto-js';
import { convert } from './adapter';
import {} from 'jasmine';

describe('Checking various payloads have the expected result', () =>
{

    it ('Test 17 - Mixed request should pass,'
        + ' also tests sorting of signed headers', () =>
    {
        const reqData = convert({
            Path : 'this/is/some/path/that/is/accepted',
            Datetime : '20191228T123243Z',
            Tenant : 'some_example_tenant',
            Service : 'some_example_service',
            Algorithm : 'HmacSHA256',
            API : 'test_api_version',
            Version_Name : 'test_version',
            Request_Type : 'TEST_REQUEST',
            Payload : '{TEST_PAYLOAD : Answer}',
            API_Key : 'TEST_API_KEY',
            Signed_Headers : [
                'host',
                'x-EvRi-DaTe',
                'coNTenT-type',
            ],
            Query : new Map([
                ['this_maps_to', 'that'],
                ['and_this_too', 'maps_to_that'],
            ]),
            Header_Values : new Map([
                ['host', 'www.everi.com'],
                ['coNTenT-type', 'application/json'],
                ['x-EvRi-DaTe', '20191228T123243Z'],
            ]),
        });
        const secretKey = 'TEST_SECRET_KEY';

        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        const generatedAuthorizationHeader = createAuthorizationHeader(
            dep,
            reqData,
            secretKey);
        const expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
        'Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_exa' +
        'mple_service%2Fevri1_request, SignedHeaders=content-type;host;x-e' +
        'vri-date, Signature=8b13a10bf3d99a2c5145ef8e320078960f55c35dbc0687' +
        '51ba8b27d6e4f1f4d7';
        expect(generatedAuthorizationHeader).toBe(expectedAuthorizationHeader);
    });

});
