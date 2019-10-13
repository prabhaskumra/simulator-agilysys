import { createAuthorizationHeader } from '../signature';
import * as crypto from 'crypto-js';
import { convert } from './adapter';
import {} from 'jasmine';

describe('These should all fail due to error checking', () =>
{
    it ('Test 3 - Empty Signed Headers and Header Values should fail', () =>
    {
        const reqData = convert({
            Path : '/',
            Datetime : '19001122T091221Z',
            Tenant : '8771500',
            Service : 'thisIsAService',
            Algorithm : 'InvalidAlgorithm',
            API : 'internal-api',
            Version_Name : 'v233',
            Request_Type : 'PUT',
            Payload : 'SomeMessageThing',
            API_Key : 'abebebabeba234546234522345245',
            Signed_Headers : [
            ],
            Query : new Map([
                ['this_maps_to', 'that_thing_over_there'],
                ['and_this_to', 'this_thing_here'],
                ['X-Evri-Date', '19001122T091221Z'],
            ]),
            Header_Values : new Map([
            ]),
        });
        const secretKey = 'aedcdeaecada75434573433457343457';

        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        try
        {
            createAuthorizationHeader(dep, reqData, secretKey);
            fail('Should have thrown an error.');
        }
        catch (err)
        {
            expect(err.message)
                .toBe('Signed headers cannot be empty.');
        }
    });

    it ('Test 4 - Passing a signed header in ' +
        'the query string should fail', () =>
    {
        const reqData = convert({
            Path : '/api/wallet/something',
            Datetime : '20001122T091221Z',
            Tenant : '1214121242',
            Service : 'wallet',
            Algorithm : 'HmacSHA256',
            API : 'tpv-api',
            Version_Name : 'v1',
            Request_Type : 'PUT',
            Payload : 'A_NONEMPTY_PAYLOAD',
            API_Key : '15542975987127657289789487',
            Signed_Headers : [
                'HOST',
                'this_maps_to',
            ],
            Query : new Map([
                ['this_maps_to', 'that'],
                ['and_this_too', 'maps_to_that'],
                ['X-Evri-Date', '20001122T091221Z'],
            ]),
            Header_Values : new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        const secretKey = '456766472774737474271237473';

        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        try
        {
            createAuthorizationHeader(dep, reqData, secretKey);
            fail('Should throw and error');
        }
        catch (err)
        {
            expect(err.message)
                .toBe('Cannot find value of signed header.');
        }

    });

    it ('Test 6 - The signing should fail if a signed' +
        ' header has no corresponding value', () =>
        {
        const reqData = convert({
            Path : '/',
            Datetime : '19001122T091221Z',
            Tenant : '8771500',
            Service : 'thisIsAService',
            Algorithm : 'HmacSHA256',
            API : 'internal-api',
            Version_Name : 'v233',
            Request_Type : 'PUT',
            Payload : 'SomeMessageThing',
            API_Key : 'abebebabeba234546234522345245',
            Signed_Headers : [
                'host',
            ],
            Query : new Map([
                ['this_maps_to', 'that_thing_over_there'],
                ['and_this_to', 'this_thing_here'],
                ['X-Evri-Date', '19001122T091221Z'],
            ]),
            Header_Values : new Map([
            ]),
        });
        const secretKey = 'aedcdeaecada75434573433457343457';

        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        try
        {
            createAuthorizationHeader(dep, reqData, secretKey);
            fail('Should have thrown an error');
        }
        catch (err)
        {
            expect(err.message).toBe('Cannot find value of signed header.');
        }

    });

    it ('Test 7 - Empty Signed Headers should fail', () =>
    {
        const reqData = convert({
            Path : '/',
            Datetime : '19001122T091221Z',
            Tenant : '8771500',
            Service : 'thisIsAService',
            Algorithm : 'HmacSHA256',
            API : 'internal-api',
            Version_Name : 'v233',
            Request_Type : 'PUT',
            Payload : 'SomeMessageThing',
            API_Key : 'abebebabeba234546234522345245',
            Secret_Key : 'aedcdeaecada75434573433457343457',
            Signed_Headers : [
            ],
            Query : new Map([
                ['this_maps_to', 'that_thing_over_there'],
                ['and_this_to', 'this_thing_here'],
                ['X-Evri-Date', '19001122T091221Z'],
            ]),
            Header_Values : new Map([
                ['host', 'www.everi.com'],
            ]),
        });
        const secretKey = 'aedcdeaecada75434573433457343457';

        const dep = { algo: [crypto.HmacSHA256, crypto.SHA256] };
        try
        {
            createAuthorizationHeader(dep, reqData, secretKey);
            fail('Should throw an error');
        }
        catch (err)
        {
            expect(err.message).toBe('Signed headers cannot be empty.');
        }
    });

    it ('Test 14 - Empty path should fail', () =>
    {
        const reqData = convert({
            Path : '',
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
        try
        {
            createAuthorizationHeader(dep, reqData, secretKey);
            fail('Should throw an error');
        }
        catch (err)
        {
            expect(err.message).toBe('The path cannot be empty.');
        }
    });

});
