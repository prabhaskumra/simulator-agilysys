import {} from 'jasmine';
import { convert } from './signatureTests/adapter';
import { validate } from './signature';
import * as crypto from 'crypto-js';
import * as dt from './formatDateTime';
import { createSignature } from './signature';

describe('signing/signature tests', () =>
{

    it('The validate fails an out of date request', () =>
    {
        const reqData = convert({
            Path : 'this/is/some/path/that/is/accepted',
            Datetime : '20171228T123243Z',
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
        const valid = validate(dep, reqData, secretKey);

        expect(valid).toBe(false);
    });

    it('The validate accepts a valid request', () =>
    {
        const dateTime = dt.getDateTime(new Date());

        const reqData = convert({
            Path : 'this/is/some/path/that/is/accepted',
            Datetime : dateTime,
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
                ['x-EvRi-DaTe', dateTime],
            ]),
        });
        const secretKey = 'TEST_SECRET_KEY';
        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        reqData.AuthorizationHeader.Signature =
            createSignature(dep, reqData, secretKey);

        const valid = validate(dep, reqData, secretKey);

        expect(valid).toBe(true);
    });

});
