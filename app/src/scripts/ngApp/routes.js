// angular inner routing configuration to route to various views in a single page app.

module.exports = function ($routeProvider) {
       $routeProvider
           .when('/', {
               templateUrl: '/app/src/scripts/templates/home.html',
               controller: 'TestCtrl',
               controllerAs: 'home'
           })
           .otherwise({
               redirectTo: '/'
           });
};
