/* jslint node: true, esnext: true */

"use strict";

const Interceptor = require('kronos-interceptor').Interceptor,
	ee = require('expression-expander');

/**
 * Forms a data request (no stream) from a koa ctx
 */
class KoaRequestInterceptor extends Interceptor {
	static get name() {
		return "koa-request";
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
