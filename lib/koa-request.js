/* jslint node: true, esnext: true */

'use strict';

const Interceptor = require('kronos-interceptor').Interceptor,
	ee = require('expression-expander');

/**
 * Simply forwards the koa req as payload
 */
class KoaRequestInterceptor extends Interceptor {
	static get name() {
		return 'koa-request';
	}

	get type() {
		return KoaRequestInterceptor.name;
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

module.exports = KoaRequestInterceptor;
