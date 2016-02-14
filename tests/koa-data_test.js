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
  return {
    get name() {
      return name;
    },
    get path() {
      return '/get:id';
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
      "a": "XXX${id}YYY"
    }
  }, "koa-data-request", (itc, withConfig) => {
    if (!withConfig) return;

    itc.connected = dummyEndpoint('ep');
    itc.connected.receive = testResponseHandler;

    let ctx = {
      request: {
        path: '/get/1234'
      }
    };

    it('passing request', () => itc.receive(ctx, {
      id: 1234
    }).then(() => {
      assert.equal(ctx.body.data.a, 'XXX1234YYY');
    }));
  });
});
