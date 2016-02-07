/* jslint node: true, esnext: true */
"use strict";


const bodyParser = require('co-body');

const Interceptor = require('kronos-interceptor').Interceptor;



/**
 * This interceptor will read the incomming http request and will convert the
 * request data from a stream back to JSON
 */
class PostInterceptor extends Interceptor {
	static get name() {
		return "http-request-post-json";
	}

	get type() {
		return PostInterceptor.name;
	}

	receive(request, oldRequest) {
		// only parse 'application/json'
		if (request.info.request.header['content-type'] === 'application/json' && request.payload) {

			const newRequest = {
				"hops": request.hops,
				"info": request.info
			};

			// Parses the request stream and get the back the JSON object
			let bodyPromise = bodyParser.json(request.payload);
			return bodyPromise.then((res) => {
				newRequest.payload = res;
				return this.connected.receive(newRequest, oldRequest);
			});


		}
		return this.connected.receive(request, oldRequest);
	}
}
exports.Interceptor = PostInterceptor;
