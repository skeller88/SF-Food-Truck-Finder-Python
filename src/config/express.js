var bodyParser = require('body-parser');
var express = require('express');
var serveStatic = require('serve-static');

module.exports = function(app) {
    app.set('port', process.env.PORT || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(serveStatic(__dirname + '/../../app'));
};