/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  kti = require('kronos-test-interceptor'),
  KoaRequestInterceptor = require('../lib/koa-request');

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

  mochaInterceptorTest(KoaRequestInterceptor, ep, {}, "koa-request", (itc, withConfig) => {
    if (!withConfig) return;

    describe('json', () => {
      it('toJSON', () => {
        assert.deepEqual(itc.toJSON(), {
          type: "koa-request"
        });
      });
    });

    itc.connected = dummyEndpoint('ep');
    itc.connected.receive = testResponseHandler;

    let ctx = {
      req: "request"
    };

    it('passing request', () => itc.receive(ctx).then(() => {
      assert.deepEqual(ctx.body, {
        payload: 'request'
      });
    }));
  });
});
