import { interceptorTest, testResponseHandler } from 'kronos-test-interceptor';
import test from 'ava';
import { SendMultipartInterceptor } from '../src/transport-multipart-interceptor';

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

test.skip(
  'basic',
  interceptorTest,
  SendMultipartInterceptor,
  dummyEndpoint('ep1'),
  {},
  'transport-send-multipart',
  async (t, interceptor, withConfig) => {
    t.deepEqual(interceptor.toJSON(), {
      type: 'transport-send-multipart'
    });

    interceptor.connected = dummyEndpoint('ep');
    interceptor.connected.receive = testResponseHandler;

    const sendMessage = {
      info: {
        request: {
          header: {
            'content-type': 'application/json'
          }
        }
      },
      payload: {
        req: 'master request',
        name: 'lola'
      }
    };

    const response = await interceptor.receive(sendMessage);

    t.is(response, {});
  }
);
