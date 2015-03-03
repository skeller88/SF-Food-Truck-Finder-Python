var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');
var serveStatic = require('serve-static');

var serverHelpers = require('./../util/server-helpers');

module.exports = function(app) {
    app.set('port', process.env.PORT || 3000);
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // app.use(serverHelpers.logErrors);
    app.use(serverHelpers.handleErrors);

    if (process.env.NODE_ENV === 'production') {
        app.use(serveStatic(__dirname + '../../dist', {
            'setHeaders': serverHelpers.cacheControl
        }));
    } else {
        app.use(serveStatic(__dirname + '/../../app', {
            'setHeaders': serverHelpers.cacheControl
        }));
    }
};