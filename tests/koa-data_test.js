/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  kti = require('kronos-test-interceptor'),
  KoaDataRequestInterceptor = require('../lib/koa-data-request');

const mochaInterceptorTest = kti.mochaInterceptorTest,
  testResponseHandler = kti.testResponseHandler;

const logger = {
  debug(a) {
    console.log(a);
  }
};

/* simple owner with name */
function dummyEndpoint(name) {
  return {get name() {
      return name;
    },
    toString() {
      return this.name;
    },
    "step": logger
  };
}

describe('interceptors', () => {
  const ep = dummyEndpoint('ep');

  mochaInterceptorTest(KoaDataRequestInterceptor, ep, {
    "data": {
      "a": 1
    }
  }, "koa-data-request", (itc, withConfig) => {
    if (!withConfig) return;

    itc.connected = dummyEndpoint('ep');

    // request value is the timeout
    itc.connected.receive = testResponseHandler;

    it('passing request', done => itc.receive({}).then(fullfilled => done()).catch(done));
  });
});
