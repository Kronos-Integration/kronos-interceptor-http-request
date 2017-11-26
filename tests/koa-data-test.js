import { interceptorTest, testResponseHandler } from 'kronos-test-interceptor';
import test from 'ava';
import { KoaDataRequestInterceptor } from '../src/koa-data-request-interceptor';

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
  KoaDataRequestInterceptor,
  dummyEndpoint('ep1'),
  {
    data: {
      a: 'XXX${id}YYY'
    }
  },
  'koa-data-request',
  async (t, interceptor, withConfig) => {
    if (!withConfig) return;
    t.deepEqual(interceptor.toJSON(), {
      type: 'koa-data-request',
      data: {
        a: 'XXX${id}YYY'
      }
    });

    interceptor.connected = dummyEndpoint('ep');
    interceptor.connected.receive = testResponseHandler;

    const ctx = {
      request: {
        path: '/get/1234'
      }
    };

    await interceptor.receive(ctx, {
      id: 1234
    });

    t.is(ctx.body.a, 'XXX1234YYY');
  }
);
