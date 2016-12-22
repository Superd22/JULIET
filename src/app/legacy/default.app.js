var Default = angular.module('legacy.default', [
    "angularUtils.directives.dirPagination",
    'ui.bootstrap',
]);

Default.directive('juMainDefault', function() {
  return {
    templateUrl: "app/legacy/default/templates/main-default.tmpl.html",
    restrict:'E',
    controller:'Default.main',
  };
});

Default.controller('Default.main', ["$scope","$http", function ($scope,$http) {
  
  $http.get('app/default/welcome.txt').then(function(data) {
    words = data.data.split(/\r?\n/);
    n = Math.floor(Math.random() * (words.length));

    $scope.motr = words[n];
    console.log(words[n]);
  });


}]);
