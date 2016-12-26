/* jslint node: true, esnext: true */
'use strict';


import {
	SendMultipartInterceptor, ReceiveMultipartInterceptor
}
from './transport-multipart-interceptor';

import KoaRequestInterceptor from './KoaRequestInterceptor';
import KoaDataRequestInterceptor from './KoaDataRequestInterceptor';

function registerWithManager(manager) {
	return Promise.all([
		manager.registerInterceptor(SendMultipartInterceptor),
		manager.registerInterceptor(ReceiveMultipartInterceptor),
		manager.registerInterceptor(KoaRequestInterceptor),
		manager.registerInterceptor(KoaDataRequestInterceptor)
	]);
}

export {
	registerWithManager,
	SendMultipartInterceptor,
	ReceiveMultipartInterceptor,
	KoaRequestInterceptor,
	KoaDataRequestInterceptor
};
