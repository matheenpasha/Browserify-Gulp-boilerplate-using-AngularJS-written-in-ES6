

class TestController {


  constructor($scope) {
    console.log('hello')
    $scope.message = "hello";
  }


}

TestController.$inject = ["$scope"]

exports.testCtrl = TestController
