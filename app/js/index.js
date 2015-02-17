_ = require('underscore');
$ = require('jquery');
Backbone = require('backbone');
Backbone.$ = $;

var AppView = require('./views/AppView');

console.log(AppView);
$(function() {
    new AppView();
});