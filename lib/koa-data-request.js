/* jslint node: true, esnext: true */

"use strict";

const Interceptor = require('kronos-interceptor').Interceptor,
	ee = require('expression-expander');

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

		Object.defineProperty(this, 'ec', {
			value: ee.createContext()
		});

		Object.defineProperty(this, 'data', {
			value: config ? config.data : {}
		});
	}

	toJSON() {
		const json = super.toJSON();
		json.data = this.data;
		return json;
	}

	receive(ctx, args) {
		this.ec.properties = args;

		return this.connected.receive({
			data: this.ec.expand(this.data)
		}, ctx).then(response => {
			ctx.body = response;
			return Promise.resolve();
		});
	}
}

module.exports = KoaDataRequestInterceptor;
