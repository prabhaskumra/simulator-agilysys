# Signing process unit tests-

### Happy Checks

### Test 1 - Mixed request should pass

Input:

```javascript
Path : 'this/is/some/path/that/is/accepted',
Datetime : '20191228T123243Z',
Tenant : 'some_example_tenant',
Service : 'some_example_service',
Algorithm : 'HmacSHA256',
API : 'test_api_version',
Version_Name : 'test_version',
Request_Type : 'TEST_REQUEST',
Payload : 'TEST_PAYLOAD',
API_Key : 'TEST_API_KEY',
Secret_Key : 'TEST_SECRET_KEY',
Signed_Headers : [
    'host',
    'x-EvRi-DaTe',
    'coNTenT-type'
],
Query : new Map([
    ['this_maps_to', 'that'],
    ['and_this_too','maps_to_that']
]),
Header_Values : new Map([
    ['host','www.everi.com'],
    ['coNTenT-type', 'application/json'],
    ['x-EvRi-DaTe','20191228T123243Z']
])
```

Output:

```
Authorization: HmacSHA256 Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_example_service%2Fevri1_request, SignedHeaders=content-type;host;x-evri-date, Signature=c1af186a0d635fa455e6535cf627b196cbeebdc0504882d38ef395b1cc6e8234
```



### Test 2 - Query only request should pass 

Input:

```javascript
Path : '/api/wallet/something/',
Datetime : '20001122T091221Z',
Tenant : '1214121242',
Service : 'wallet',
Algorithm : 'HmacSHA256',
API : 'tpv-api',
Version_Name : 'v1',
Request_Type : 'GET',
Payload : '',
API_Key : '15542975987127657289789487',
Secret_Key : '456766472774737474271237473',
Signed_Headers : [
    'HOST'
],
Query : new Map([
    ['this_maps_to', 'that'],
    ['and_this_too','maps_to_that'],
    ['X-Evri-Date', '20001122T091221Z']
]),
Header_Values : new Map([
    ['HOST','www.everi.com']
])
```

Output:

```
Authorization: HmacSHA256 Credential=15542975987127657289789487/20001122%2F1214121242%2Fwallet%2Fevri1_request, SignedHeaders=host, Signature=6bc3c86acec66577db48f04edc69cc70dcc977eff1bab403ae45fbc74db5ea92
```

### 

### Test 5 - A request with an empty query string should pass 

Input:

```javascript
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
Secret_Key : '456766472774737474271237473',
Signed_Headers : [
    'HOST',
],
Query : new Map([
]),
Header_Values : new Map([
    ['HOST','www.everi.com']
])
```

Output:

```
Authorization: HmacSHA256 Credential=15542975987127657289789487/20001122%2F1214121242%2Fwallet%2Fevri1_request, SignedHeaders=host, Signature=6d2b0a91fcb4986986b13f94577ca50d9b51c8bd65a39f3d926808cdece22ec0
```

### 

###  Test 13 - "/"

Input:

```javascript
Path : '/',
Datetime : '20191228T123243Z',
Tenant : 'some_example_tenant',
Service : 'some_example_service',
Algorithm : 'HmacSHA256',
API : 'test_api_version',
Version_Name : 'test_version',
Request_Type : 'TEST_REQUEST',
Payload : 'TEST_PAYLOAD',
API_Key : 'TEST_API_KEY',
Secret_Key : 'TEST_SECRET_KEY',
Signed_Headers : [
    'host'
],
Query : new Map([
]),
Header_Values : new Map([
    ['host','www.everi.com'],
])
```

Output:

```
Authorization: HmacSHA256 Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_example_service%2Fevri1_request, SignedHeaders=host, Signature=f0260c78dc883f5cf417965cf12aac5d8a992df99698b7f7bbc5e37d0c66f6b1
```

###  

### Encoding Checks

### Test 8 - A check to make sure sub paths are getting encoded 

Input:

```javascript
Path : '/documents and settings/thing/',
Datetime : '19001122T091221Z',
Tenant : '8771500',
Service : 'thisIsAService',
Algorithm : 'HmacSHA256',
API : 'internal-api',
Version_Name : 'v233',
Request_Type : 'PUT',
Payload : 'SomeMessageThing',
API_Key : 'abebebabeba234546234522345245',
Secret_Key : '235447272775574552572',
Signed_Headers : [
    'host'
],
Query : new Map([
    ['this_maps_to', 'that_thing_over_there'],
    ['and_this_to','this_thing_here'],
    ['X-Evri-Date', '19001122T091221Z']
]),
Header_Values : new Map([
    ['host','www.everi.com']
])
```

Output:

```
Authorization: HmacSHA256 Credential=abebebabeba234546234522345245/19001122%2F8771500%2FthisIsAService%2Fevri1_request, SignedHeaders=host, Signature=eb6b156813d4aaef7101330db9bf2d6cbd5269dc3f29a03d5a9becb3479301f4
```

### Test 15 - Checking query keys are getting encoded

Input:

```
Path : '/documentsandsettings/thing/',
Datetime : '19001122T091221Z',
Tenant : '8771500',
Service : 'thisIsAService',
Algorithm : 'HmacSHA256',
API : 'internal-api',
Version_Name : 'v233',
Request_Type : 'PUT',
Payload : 'SomeMessageThing',
API_Key : 'abebebabeba234546234522345245',
Secret_Key : '235447272775574552572',
Signed_Headers : [
    'host'
],
Query : new Map([
  		['this maps to', 'that_thing_over_there'],
        ['and this to', 'this_thing_here'],
        ['X-Evri-Date', '19001122T091221Z']
]),
Header_Values : new Map([
    ['host','www.everi.com'],
])
```

Output:

```
Authorization: HmacSHA256 Credential=abebebabeba234546234522345245/19001122%2F8771500%2FthisIsAService%2Fevri1_request, SignedHeaders=host, Signature=fff87b0305d440f08d4f6cc65af9812db8fd64336afe756d3a55bca71d436ae9
```

### Test 16 - Checking query values are getting encoded

Input:

```
Path : '/documentsandsettings/thing/',
Datetime : '19001122T091221Z',
Tenant : '8771500',
Service : 'thisIsAService',
Algorithm : 'HmacSHA256',
API : 'internal-api',
Version_Name : 'v233',
Request_Type : 'PUT',
Payload : 'SomeMessageThing',
API_Key : 'abebebabeba234546234522345245',
Secret_Key : '235447272775574552572',
Signed_Headers : [
    'host'
],
Query : new Map([
  		['this_maps_to', 'that thing over there'],
        ['and_this_to', 'this thing here'],
        ['X-Evri-Date', '19001122T091221Z']
]),
Header_Values : new Map([
    ['host','www.everi.com'],
])

```

Output:

```
Authorization: HmacSHA256 Credential=abebebabeba234546234522345245/19001122%2F8771500%2FthisIsAService%2Fevri1_request, SignedHeaders=host, Signature=f46b7151c7369bb6485d7e5a5223e9c8a1ccff87ad4bfe775ae980df45875b8f
```

### Path Checks

These should all be the same.

### Test 9 - Path

Input:

```javascript
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
Secret_Key : 'TEST_SECRET_KEY',
Signed_Headers : [
    'host'
],
Query : new Map([
]),
Header_Values : new Map([
    ['host','www.everi.com'],
])
```

Output:

```
Authorization: HmacSHA256 Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_example_service%2Fevri1_request, SignedHeaders=host, Signature=b5a932421d742d1065dc69fc3068f3a144be3db6ce4f568df4368add97bc3a6b
```



### Test 10 - /Path

Input:

```javascript
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
Secret_Key : 'TEST_SECRET_KEY',
Signed_Headers : [
    'host'
],
Query : new Map([
]),
Header_Values : new Map([
    ['host','www.everi.com'],
])
```

Output:

```
Authorization: HmacSHA256 Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_example_service%2Fevri1_request, SignedHeaders=host, Signature=b5a932421d742d1065dc69fc3068f3a144be3db6ce4f568df4368add97bc3a6b
```



### Test 11 - /Path/

Input:

```javascript
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
Secret_Key : 'TEST_SECRET_KEY',
Signed_Headers : [
    'host'
],
Query : new Map([
]),
Header_Values : new Map([
    ['host','www.everi.com'],
])
```

Output:

```
Authorization: HmacSHA256 Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_example_service%2Fevri1_request, SignedHeaders=host, Signature=b5a932421d742d1065dc69fc3068f3a144be3db6ce4f568df4368add97bc3a6b
```



### Test 12 - Path/

Input:

```javascript
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
Secret_Key : 'TEST_SECRET_KEY',
Signed_Headers : [
    'host'
],
Query : new Map([
]),
Header_Values : new Map([
    ['host','www.everi.com'],
])
```

Output:

```
Authorization: HmacSHA256 Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_example_service%2Fevri1_request, SignedHeaders=host, Signature=b5a932421d742d1065dc69fc3068f3a144be3db6ce4f568df4368add97bc3a6b
```

### 

### Error Checks



### Test 3 - Empty Signed Headers and Header Values should fail 

Input:

```javascript
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
Secret_Key : 'aedcdeaecada75434573433457343457',
Signed_Headers : [
],
Query : new Map([
    ['this_maps_to', 'that_thing_over_there'],
    ['and_this_to','this_thing_here'],
    ['X-Evri-Date', '19001122T091221Z']
]),
Header_Values : new Map([
])
```

Output:

```
Signed headers cannot be empty.
```



### Test 4 - Passing a signed header in the query string should fail 

Input:

```javascript
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
Secret_Key : '456766472774737474271237473',
Signed_Headers : [
    'HOST',
    'this_maps_to'
],
Query : new Map([
    ['this_maps_to', 'that'],
    ['and_this_too','maps_to_that'],
    ['X-Evri-Date', '20001122T091221Z']
]),
Header_Values : new Map([
    ['host','www.everi.com']
])
```

Output:

```
Cannot find value of signed header.
```



### 

### Test 6 - The signing should fail if a signed header has no corresponding value

Input:

```javascript
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
    'host'
],
Query : new Map([
    ['this_maps_to', 'that_thing_over_there'],
    ['and_this_to','this_thing_here'],
    ['X-Evri-Date', '19001122T091221Z']
]),
Header_Values : new Map([
])
```

Output:

```
Could not find value of signed header.
```



### Test 7 - Empty Signed Headers should fail 

Input:

```javascript
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
    ['and_this_to','this_thing_here'],
    ['X-Evri-Date', '19001122T091221Z']
]),
Header_Values : new Map([
    ['host','www.everi.com']
])
```

Output:

```
Signed headers cannot be empty.

```



### Test 14 - An Empty path should fail

Input:

```javascript
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
Secret_Key : 'TEST_SECRET_KEY',
Signed_Headers : [
    'host'
],
Query : new Map([
]),
Header_Values : new Map([
    ['host','www.everi.com'],
])
```

Output:

```
The path cannot be empty.
```



### Test 17 - A stringified object payload should pass

Input:

```javascript
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
Secret_Key : 'TEST_SECRET_KEY',
Signed_Headers : [
    'host',
    'x-EvRi-DaTe',
    'coNTenT-type'
],
Query : new Map([
    ['this_maps_to', 'that'],
    ['and_this_too','maps_to_that']
]),
Header_Values : new Map([
    ['host','www.everi.com'],
    ['coNTenT-type', 'application/json'],
    ['x-EvRi-DaTe','20191228T123243Z']
])
```

Output:

```
Authorization: HmacSHA256 Credential=TEST_API_KEY/20191228%2Fsome_example_tenant%2Fsome_example_service%2Fevri1_request, SignedHeaders=content-type;host;x-evri-date, Signature=8b13a10bf3d99a2c5145ef8e320078960f55c35dbc068751ba8b27d6e4f1f4d7
```



### 