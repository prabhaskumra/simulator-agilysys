import * as AuthorizationTypes from './interface/requestData';

export function parseAuthorization(authheader: string): AuthorizationTypes.AuthorizationHeader
{
    let tempauth = authheader.split(' ');
    if (tempauth[0] !== 'Authorization:' ||
      tempauth[2].substr(0, 11) !== 'Credential=' ||
      tempauth[3].substr(0, 14) !== 'SignedHeaders=' ||
      tempauth[4].substr(0, 10) !== 'Signature=')
    {
      throw new Error('Invalid Static Values');
    }

    const algorithm = tempauth[1];
    tempauth = tempauth.splice(2).join('').split(',');
    const credentialScope = createCredentialScope(tempauth[0]);

    const signedHeader = tempauth[1]
        .split('=')[1]
        .split(';')
        .map((element) => element.toLowerCase());
    const sig = tempauth[2].split('=')[1];
    const apiKey = tempauth[0].split('/')[0].split('=')[1];

    return { Algorithm: algorithm, APIKey: apiKey, SignedHeaders: signedHeader,
        Signature: sig, CredentialScope: credentialScope};
    }

    function createCredentialScope(
        credString: string): AuthorizationTypes.CredentialScope
    {
    const credScope = decodeURIComponent(credString).split('/');
    return {
        Date : credScope[1],
        Tenant: credScope[2],
        Service: credScope[3],
    };
    }
