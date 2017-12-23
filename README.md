[![npm](https://img.shields.io/npm/v/kronos-interceptor-http-request.svg)](https://www.npmjs.com/package/kronos-interceptor-http-request)
[![Greenkeeper](https://badges.greenkeeper.io/Kronos-Integration/kronos-interceptor-http-request.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/Kronos-Integration/kronos-interceptor-http-request)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://secure.travis-ci.org/Kronos-Integration/kronos-interceptor-http-request.png)](http://travis-ci.org/Kronos-Integration/kronos-interceptor-http-request)
[![bithound](https://www.bithound.io/github/Kronos-Integration/kronos-interceptor-http-request/badges/score.svg)](https://www.bithound.io/github/Kronos-Integration/kronos-interceptor-http-request)
[![codecov.io](http://codecov.io/github/Kronos-Integration/kronos-interceptor-http-request/coverage.svg?branch=master)](http://codecov.io/github/Kronos-Integration/kronos-interceptor-http-request?branch=master)
[![Coverage Status](https://coveralls.io/repos/Kronos-Integration/kronos-interceptor-http-request/badge.svg)](https://coveralls.io/r/Kronos-Integration/kronos-interceptor-http-request)
[![Known Vulnerabilities](https://snyk.io/test/github/Kronos-Integration/kronos-interceptor-http-request/badge.svg)](https://snyk.io/test/github/Kronos-Integration/kronos-interceptor-http-request)
[![GitHub Issues](https://img.shields.io/github/issues/Kronos-Integration/kronos-interceptor-http-request.svg?style=flat-square)](https://github.com/Kronos-Integration/kronos-interceptor-http-request/issues)
[![Stories in Ready](https://badge.waffle.io/Kronos-Integration/kronos-interceptor-http-request.svg?label=ready&title=Ready)](http://waffle.io/Kronos-Integration/kronos-interceptor-http-request)
[![Dependency Status](https://david-dm.org/Kronos-Integration/kronos-interceptor-http-request.svg)](https://david-dm.org/Kronos-Integration/kronos-interceptor-http-request)
[![devDependency Status](https://david-dm.org/Kronos-Integration/kronos-interceptor-http-request/dev-status.svg)](https://david-dm.org/Kronos-Integration/kronos-interceptor-http-request#info=devDependencies)
[![docs](http://inch-ci.org/github/Kronos-Integration/kronos-interceptor-http-request.svg?branch=master)](http://inch-ci.org/github/Kronos-Integration/kronos-interceptor-http-request)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![downloads](http://img.shields.io/npm/dm/kronos-interceptor-http-request.svg?style=flat-square)](https://npmjs.org/package/kronos-interceptor-http-request)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

kronos-interceptor-http-request
===
Interceptor to convert messages into multipart form data and back

# API Reference

* <a name="transformMessageToRequestMessage"></a>

## transformMessageToRequestMessage(message) ⇒
Copies the fields 'info' and 'hops' into the new message.
Then create a formdata object containing 'info', 'hops' and 'payload'.
Stores the formdata object as the payload of the 'newMessage' object.

**Kind**: global function  
**Returns**: newMessage The transformed message  

| Param | Description |
| --- | --- |
| message | The message to transform |


* <a name="unpackToMessage"></a>

## unpackToMessage(request, forwardFunction) ⇒
Unpacks a message from a multipart http request

**Kind**: global function  
**Returns**: Promise A promise with the result of the forwardFunction  

| Param | Description |
| --- | --- |
| request | The incomming http request |
| forwardFunction | The function to call with the new generated message.        The function must return a Promise. If no 'forwardFunction' is given        It will return the message in the promise |


* * *

install
=======

With [npm](http://npmjs.org) do:

```shell
npm install kronos-interceptor-http-request
```

license
=======

BSD-2-Clause
