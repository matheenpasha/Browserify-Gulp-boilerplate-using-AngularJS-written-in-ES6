"use strict"

/*
Angular ES6 Browserify Boilerplate
Author: Matheen Pasha


  This is the initialisation & configuration file. The module and all the controllers, directives and controllers are initialised here
*/

module.exports =  function() {
  var angular = require('angular');
  require('ngRoute');
  var routes = require('./routes');
  var controllers = require('./controllers');
  var directives = require('./directives');
  var services = require('./services');
  var ngApp = global.ngApp = angular.module('TestApp', ['ngRoute']).config(['$routeProvider', routes]);
  controllers.init(ngApp);
  directives.init(ngApp);
  services.init(ngApp);
  ngApp.config(["$sceProvider", function ($sceProvider) {
    $sceProvider.enabled(false);
  }]);
  return ngApp;
}
