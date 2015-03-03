var compression = require('compression');
var express = require('express');
var serveStatic = require('serve-static');

var serverHelpers = require('./../util/server-helpers');

// TODO(shane): add tokens and throttling, like the SODA API does. As of now,
// someone could crash the server fairly easily through multiple requests
// with high limits.

// Invoked before routes
exports.pre = function(app) {
    app.set('port', process.env.PORT || 3000);
    app.use(compression());
    app.use(serveStatic(__dirname + '/../../app', {
        'setHeaders': serverHelpers.cacheControl
    }));
};

// Invoked after routes. As of now only error handlers.
exports.post = function(app) {
    app.use(serverHelpers.logErrors);
    app.use(serverHelpers.handleErrors);
};