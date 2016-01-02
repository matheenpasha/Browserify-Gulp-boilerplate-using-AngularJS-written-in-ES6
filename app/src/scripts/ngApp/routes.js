// angular inner routing configuration to route to various views in a single page app.

module.exports = function ($routeProvider) {
       $routeProvider
           .when('/test', {
               templateUrl: '/app/src/views/dash-board.html',
               controller: 'TestCtrl'
           })
           .otherwise({
               redirectTo: '/'
           });
};
