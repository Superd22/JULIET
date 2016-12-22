var PayPal = angular.module('Paypal', []);
var BaseUrl = GLOBAL_URL_PATH_TO_JU || "";

PayPal.controller('headerForum', ["$scope", "$http", function ($scope,$http) {

  $scope.goal = 30;
  $http.get(BaseUrl+'API/paypal.php').then(function(data) {
    $scope.paypal = data.data;
  });

  $scope.getPercent = function() {
    var p = ($scope.paypal.count / 30) * 100;
    if(p > 100) return 100;
    else return p;
  }

}]);

PayPal.directive('paypalForumHeader', function() {
  return {
    templateUrl: BaseUrl+"PayPal/templates/headerForum.tmpl.html",
    restrict:'E',
    replace: true
  };
});
