/*

  Angular ES6 Browserify Boilerplate
  Author: Matheen Pasha
  This is the entry file to the app.
*/

var angular = require('angular');
var app = require('./ngApp/conf');

window.name = "NG_DEFER_BOOTSTRAP!";
angular.element(document.getElementsByTagName('html')[0]);
angular.element().ready(function () {
  var ngApp = app();
  angular.resumeBootstrap([ngApp.name]);
});
