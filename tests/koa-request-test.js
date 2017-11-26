import { interceptorTest, testResponseHandler } from 'kronos-test-interceptor';
import test from 'ava';
import { KoaRequestInterceptor } from '../src/koa-request-interceptor';

const logger = {
  debug(a) {
    console.log(a);
  }
};

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
    step: logger
  };
}

test(
  'basic',
  interceptorTest,
  KoaRequestInterceptor,
  dummyEndpoint('ep1'),
  {},
  'koa-request',
  async (t, interceptor, withConfig) => {
    t.deepEqual(interceptor.toJSON(), {
      type: 'koa-request'
    });

    interceptor.connected = dummyEndpoint('ep');
    interceptor.connected.receive = testResponseHandler;

    const ctx = {
      req: 'request'
    };

    await interceptor.receive(ctx);

    t.deepEqual(ctx.body, {
      payload: 'request'
    });
  }
);
