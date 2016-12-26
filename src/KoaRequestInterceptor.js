/* jslint node: true, esnext: true */

'use strict';

import {
	Interceptor
}
from 'kronos-interceptor';

/**
 * Simply forwards the koa req as payload
 */
export default class KoaRequestInterceptor extends Interceptor {
	static get name() {
		return 'koa-request';
	}

	receive(ctx, args) {
		return this.connected.receive({
			payload: ctx.req
		}, ctx).then(response => {
			ctx.body = response;
			return Promise.resolve();
		});
	}
}
