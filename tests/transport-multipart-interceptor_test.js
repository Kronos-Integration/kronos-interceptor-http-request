/* global describe, it, xit, before */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),

  llm = require('loglevel-mixin'),
  ksm = require('kronos-service-manager'),

  interceptorFactory = require('../index');


const stepMock = {
  "name": "dummy step name",
  "type": "dummy step type"
};
llm.defineLogLevelProperties(stepMock, llm.defaultLogLevels, llm.defaultLogLevels);


const managerPromise = ksm.manager().then(manager =>
  Promise.all([
    // ---------------------------
    // register all the interceptors
    // ---------------------------
    interceptorFactory.registerWithManager(manager),

  ]).then(() =>
    Promise.resolve(manager)
  ));


// !!!!!! This test does no real things. This is no good test !!!!!
describe('Transport Multipart Interceptor test', function () {

  let manager;

  before(done => {
    managerPromise.then(m => {
      manager = m;
      done();
    });
  });


  it('Send message', function (done) {

    const endpoint1 = {
      "owner": stepMock,
      "name": "gumbo 1"
    };
    const endpoint2 = {
      "owner": stepMock,
      "name": "gumbo 2"
    };

    const sendInterceptor = manager.createInterceptorInstanceFromConfig({
      "type": "transport-send-multipart"
    }, endpoint1);


    const mockEchoReceive = {
      receive(message) {
        //console.log(message);
        done();
        return Promise.resolve("OK");
      }
    };

    // Connect the echo terminator to the interceptor
    sendInterceptor.connected = mockEchoReceive;

    const sendMessage = {
      "info": {
        "request": {
          "header": {
            "content-type": "application/json"
          }
        }
      },
      "payload": {
        "req": "master request",
        "name": "lola"
      }
    };

    sendInterceptor.receive(sendMessage);

  });



});
