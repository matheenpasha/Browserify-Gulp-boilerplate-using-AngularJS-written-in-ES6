
//register all directives here
exports.init = function(module) {
  console.log("directives initialised");
  module.directive('tabs', require('./tabs').tabs);
  module.directive('pane', require('./tabPane').pane);
};
