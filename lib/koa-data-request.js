/* jslint node: true, esnext: true */

'use strict';

const Interceptor = require('kronos-interceptor').Interceptor,
	mat = require('model-attributes'),
	ee = require('expression-expander');

/**
 * Forms a data request (no stream) from a koa ctx
 */
class KoaDataRequestInterceptor extends Interceptor {

	static get configurationAttributes() {
		return Object.assign(mat.createAttributes({
			data: {
				description: 'additional request data',
				attributes: {}
			}
		}), Interceptor.configurationAttributes);
	}

	static get name() {
		return 'koa-data-request';
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

		return this.connected.receive(
			this.ec.expand(this.data), ctx).then(response => {
			ctx.body = response;
			return Promise.resolve();
		});
	}
}

module.exports = KoaDataRequestInterceptor;
