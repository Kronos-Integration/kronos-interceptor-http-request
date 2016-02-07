/* jslint node: true, esnext: true */
"use strict";

const PostJsonInterceptor = require('./lib/post-json-interceptor').Interceptor;

exports.PostJsonInterceptor = PostJsonInterceptor;

exports.registerWithManager = manager => manager.registerInterceptor(PostJsonInterceptor);
