/* jslint node: true, esnext: true */

"use strict";

const Interceptor = require('kronos-interceptor').Interceptor;

/**
 * Forms a data request (no stream) from a koa ctx
 */
class KoaDataRequestInterceptor extends Interceptor {
	static get name() {
		return "koa-data-request";
	}

	get type() {
		return KoaDataRequestInterceptor.name;
	}

	constructor(config, endpoint) {
		super(config, endpoint);

		Object.defineProperty(this, 'data', {
			value: config ? config.data : {}
		});
	}

	receive(ctx) {
		return this.connected.receive({
			data: this.data
		}, ctx).then(response => {
			ctx.body = response;
		});
	}
}

module.exports = KoaDataRequestInterceptor;
