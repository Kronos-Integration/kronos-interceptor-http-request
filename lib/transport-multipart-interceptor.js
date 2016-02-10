/* jslint node: true, esnext: true */
"use strict";

const stream = require('stream');

const Busboy = require('busboy');
const FormData = require('form-data');


const Interceptor = require('kronos-interceptor').Interceptor;

/**
 * Copies the fields 'info' and 'hops' into the new message.
 * Then create a formdata object containing 'info', 'hops' and 'payload'.
 * Stores the formdata object as the payload of the 'newMessage' object.
 * @param message The message to transform
 * @return newMessage The transformed message
 */
function transformMessageToRequestMessage(message) {
	const newMessage = {
		"info": message.info,
		"hops": message.hops
	};

	let payLoad;
	if (message.payload === 'string') {
		payLoad = message.payload;
	} else if (message.payload instanceof stream.Stream) {
		payLoad = message.payload;
	} else {
		// expect that it is JSON
		payLoad = JSON.stringify(message.payload);
	}


	// make the message a form
	const formData = new FormData();
	formData.append('info', JSON.stringify(message.info));
	formData.append('hops', JSON.stringify(message.hops));
	formData.append('payload', payLoad);

	newMessage.payload = formData;

	return newMessage;
}

/**
 * This interceptor will read the incomming http request and will convert the
 * request data from a stream back to JSON
 */
class SendMultipartInterceptor extends Interceptor {
	static get name() {
		return "transport-send-mutipart";
	}

	get type() {
		return SendMultipartInterceptor.name;
	}

	receive(request, oldRequest) {
		const newMessage = transformMessageToRequestMessage(request);
		const res = this.connected.receive(newMessage, oldRequest);
		return res.then(response => {
			// console.log("LOG sTatus");
			// console.log(response.status);
			// console.log(response.url);
			//console.log(response.headers._headers["content-type"]);

			if (response.status === 200) {
				// return unpackToMessage(response.body, {
				// 	"content-type": "multipart/form-data"
				// });

				const myHeader = {
					"content-type": response.headers._headers["content-type"][0]
				};

				return unpackToMessage(response.body, myHeader);

			} else {
				return Promise.reject(`Error in connection. Status = ${response.status}`);
			}
		});
	}
}


/**
 * Unpacks a message from a multipart http request
 *
 * @param request The incomming http request
 * @param headers The headers of the incomming http request
 * @param forwardFunction The function to call with the new generated message.
 *        The function must return a Promise. If no 'forwardFunction' is given
 *        It will return the message in the promise
 *
 * @return Promise A promise with the result of the forwardFunction
 */
function unpackToMessage(request, headers, forwardFunction) {
	const busboy = new Busboy({
		headers: headers
	});


	return new Promise((resolve, reject) => {

		// the message which will be forwarded
		const newMessage = {};

		let resultPromise;

		busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
			if (fieldname === 'payload') {
				// This is a stream payload
				newMessage.payload = file;
				if (forwardFunction) {
					resolve(resultPromise = forwardFunction(newMessage));
				} else {
					resolve(resultPromise = Promise.resolve(newMessage));
				}

			}
		});

		busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
			if (fieldname === 'info' || fieldname === 'hops' || fieldname === 'payload') {
				newMessage[fieldname] = JSON.parse(val);
			}
		});

		busboy.on('finish', function () {
			if (!resultPromise) {
				if (forwardFunction) {
					resultPromise = forwardFunction(newMessage);
				} else {
					resultPromise = Promise.resolve(newMessage);
				}
			}
			resolve(resultPromise);
		});
		request.pipe(busboy);
	});

}


/**
 * This interceptor will read the incomming http request and will convert the
 * request data from a stream back to JSON
 */
class ReceiveMultipartInterceptor extends Interceptor {
	static get name() {
		return "transport-receive-mutipart";
	}

	get type() {
		return ReceiveMultipartInterceptor.name;
	}

	receive(request, oldRequest) {
		const self = this;

		//	console.log(request);

		// only parse 'application/json'
		if (request.info.request.method === 'POST') {
			if (request.info.request.header['content-type'].startsWith('multipart/form-data') && request.payload) {
				const req = request.payload;

				const res = unpackToMessage(req, req.headers, this.connected.receive);

				return res.then(value => {
					if (value && value.info) {
						const newMessage = transformMessageToRequestMessage(value);
						return Promise.resolve(newMessage);
					}
				});


			}
		}
		return this.connected.receive(request, oldRequest);
	}
}



exports.ReceiveMultipartInterceptor = ReceiveMultipartInterceptor;
exports.SendMultipartInterceptor = SendMultipartInterceptor;
