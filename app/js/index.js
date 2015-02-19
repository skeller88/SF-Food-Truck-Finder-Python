_ = require('underscore');
$ = require('jquery');
Backbone = require('backbone');
Backbone.$ = $;

var AppView = require('./views/AppView');
var AppModel = require('./models/AppModel');

$(function() {
    new AppView({ model: new AppModel() });
});