

class Tabs {
  constructor() {
    this.restrict = 'E';
    this.transclude = true;
    this.scope = {};
    this.templateUrl = '../app/build/templates/tabs.html';
    this.controller.$inject = ['$scope'];
  }

  controller($scope) {
    var panes = $scope.panes = [];

     $scope.select = function(pane) {
       angular.forEach(panes, (otherPane) => {
         otherPane.selected = false;
       });
       pane.selected = true;
     };

     this.addPane = function(pane) {
       if (panes.length === 0) {
         $scope.select(pane);
       }
       panes.push(pane);
     };
  }

  static tabsFactory(){
    Tabs.instance = new Tabs();
    return Tabs.instance;
  }

}

exports.tabs = Tabs.tabsFactory;
