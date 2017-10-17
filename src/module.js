import {
  SendMultipartInterceptor,
  ReceiveMultipartInterceptor
} from './transport-multipart-interceptor';

import KoaRequestInterceptor from './koa-request-interceptor';
import KoaDataRequestInterceptor from './koa-data-request-interceptor';

export function registerWithManager(manager) {
  return Promise.all([
    manager.registerInterceptor(SendMultipartInterceptor),
    manager.registerInterceptor(ReceiveMultipartInterceptor),
    manager.registerInterceptor(KoaRequestInterceptor),
    manager.registerInterceptor(KoaDataRequestInterceptor)
  ]);
}

export {
  SendMultipartInterceptor,
  ReceiveMultipartInterceptor,
  KoaRequestInterceptor,
  KoaDataRequestInterceptor
};
