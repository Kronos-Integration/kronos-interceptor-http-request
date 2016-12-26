/* jslint node: true, esnext: true */

'use strict';

import {
	Interceptor
}
from 'kronos-interceptor';

import {
	mergeAttributes, createAttributes
}
from 'model-attributes';

import {
	createContext
}
from 'expression-expander';

/**
 * Forms a data request (no stream) from a koa ctx
 */
export default class KoaDataRequestInterceptor extends Interceptor {

	static get configurationAttributes() {
		return mergeAttributes(createAttributes({
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
			value: createContext()
		});
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
