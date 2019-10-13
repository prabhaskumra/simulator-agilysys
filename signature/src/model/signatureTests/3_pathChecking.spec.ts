import { createAuthorizationHeader } from '../signature';
import * as crypto from 'crypto-js';
import { convert } from './adapter';
import {} from 'jasmine';

describe('Testing that different path variants have the same signature.', () =>
{

    it ('Test 9 - Path', () =>
    {
        const reqData = convert({
            Path : 'path',
            Datetime : '20191228T123243Z',
            Tenant : 'some_example_tenant',
            Service : 'some_example_service',
            Algorithm : 'HmacSHA256',
            API : 'test_api_version',
            Version_Name : 'test_version',
            Request_Type : 'TEST_REQUEST',
            Payload : 'TEST_PAYLOAD',
            API_Key : 'TEST_API_KEY',
            Signed_Headers : [
                'host',
            ],
            Query : new Map([
            ]),
            Header_Values : new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        const secretKey = 'TEST_SECRET_KEY';

        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        const generatedAuthorizationHeader = createAuthorizationHeader(
            dep,
            reqData,
            secretKey);
        const expectedAuthorizationHeader = 'Authorization: HmacSHA256 Cred' +
        'ential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_example_' +
        'service%2Fevri1_request, SignedHeaders=host, Signature=b5a932421d74' +
        '2d1065dc69fc3068f3a144be3db6ce4f568df4368add97bc3a6b';
        expect(generatedAuthorizationHeader).toBe(expectedAuthorizationHeader);
    });

    it ('Test 10 - /Path', () =>
    {
        const reqData = convert({
            Path : '/path',
            Datetime : '20191228T123243Z',
            Tenant : 'some_example_tenant',
            Service : 'some_example_service',
            Algorithm : 'HmacSHA256',
            API : 'test_api_version',
            Version_Name : 'test_version',
            Request_Type : 'TEST_REQUEST',
            Payload : 'TEST_PAYLOAD',
            API_Key : 'TEST_API_KEY',
            Signed_Headers : [
                'host',
            ],
            Query : new Map([
            ]),
            Header_Values : new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        const secretKey = 'TEST_SECRET_KEY';

        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        const generatedAuthorizationHeader = createAuthorizationHeader(
            dep,
            reqData,
            secretKey);
        const expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
        'Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_ex' +
        'ample_service%2Fevri1_request, SignedHeaders=host, Signature=b5a9' +
        '32421d742d1065dc69fc3068f3a144be3db6ce4f568df4368add97bc3a6b';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });

    it ('Test 11 - /Path/', () =>
    {
        const reqData = convert({
            Path : '/path/',
            Datetime : '20191228T123243Z',
            Tenant : 'some_example_tenant',
            Service : 'some_example_service',
            Algorithm : 'HmacSHA256',
            API : 'test_api_version',
            Version_Name : 'test_version',
            Request_Type : 'TEST_REQUEST',
            Payload : 'TEST_PAYLOAD',
            API_Key : 'TEST_API_KEY',
            Signed_Headers : [
                'host',
            ],
            Query : new Map([
            ]),
            Header_Values : new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        const secretKey = 'TEST_SECRET_KEY';

        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        const generatedAuthorizationHeader = createAuthorizationHeader(
            dep,
            reqData,
            secretKey);
        const expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
        'Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_' +
        'example_service%2Fevri1_request, SignedHeaders=host, Signature=b' +
        '5a932421d742d1065dc69fc3068f3a144be3db6ce4f568df4368add97bc3a6b';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });

    it ('Test 12 - Path/', () =>
    {
        const reqData = convert({
            Path : 'path/',
            Datetime : '20191228T123243Z',
            Tenant : 'some_example_tenant',
            Service : 'some_example_service',
            Algorithm : 'HmacSHA256',
            API : 'test_api_version',
            Version_Name : 'test_version',
            Request_Type : 'TEST_REQUEST',
            Payload : 'TEST_PAYLOAD',
            API_Key : 'TEST_API_KEY',
            Signed_Headers : [
                'host',
            ],
            Query : new Map([
            ]),
            Header_Values : new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        const secretKey = 'TEST_SECRET_KEY';

        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        const generatedAuthorizationHeader = createAuthorizationHeader(
            dep,
            reqData,
            secretKey);
        const expectedAuthorizationHeader = 'Authorization: HmacSHA256 ' +
        'Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_e' +
        'xample_service%2Fevri1_request, SignedHeaders=host, Signature=' +
        'b5a932421d742d1065dc69fc3068f3a144be3db6ce4f568df4368add97bc3a6b';
        expect(generatedAuthorizationHeader)
            .toBe(expectedAuthorizationHeader);
    });

});
