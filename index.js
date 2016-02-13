/* jslint node: true, esnext: true */
"use strict";

const TransportInterceptor = require('./lib/transport-multipart-interceptor');

exports.SendMultipartInterceptor = TransportInterceptor.SendMultipartInterceptor;
exports.ReceiveMultipartInterceptor = TransportInterceptor.ReceiveMultipartInterceptor;

exports.registerWithManager = manager => Promise.all([
	manager.registerInterceptor(TransportInterceptor.SendMultipartInterceptor),
	manager.registerInterceptor(TransportInterceptor.ReceiveMultipartInterceptor)
]);
