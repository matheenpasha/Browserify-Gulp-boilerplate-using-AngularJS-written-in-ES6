
//register all controllers here
exports.init = function(module) {
  console.log("controllers initialised");
  module.controller('TestCtrl', require('./test').testCtrl);
};
