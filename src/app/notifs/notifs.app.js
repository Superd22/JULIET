var services = services || angular.module('services', []);
var Notifs = angular.module('Notifs', [
    'ui.router',
    'services',
    "angularUtils.directives.dirPagination",
    'ui.bootstrap',
]);

Notifs.service('DataTrans', ['$http','$sce', function($http,$sce) {
  var DataTrans = {};
  var models

    DataTrans.parseNotif = function(notif) {

        //
      var t = notif.time.split(/[- :]/);
      var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
      notif.time = d;
      notif.msg = $sce.trustAsHtml(String(notif.msg));
      return notif;
    }

    DataTrans.getNotifs = function(target) {
      if(!target) target = "";
      var p = $http.get("Notifs/get_notifs.php?target="+target).then(function(data) {
        angular.forEach(data.data.NOTIFS, function(notif, key) {
          data.data.NOTIFS[key] = DataTrans.parseNotif(notif);
        });

        return data.data;
      });

      return p;
    }

    DataTrans.getParams = function() {
      var p = $http.get("Notifs/get_params.php").then(function(data) {
        return data.data;
      });

      return p;
    }


    DataTrans.setSeen = function(target) {
      var p = $http.post("Notifs/update_notifs.php", {target:target}).then(function(data) {
        return true;
      });
      return p;
    }


    DataTrans.setParams = function(args) {
      var p = $http.post("Notifs/update_notifs.php", {args:args, m:'updateparam'}).then(function(data) {
        return true;
      });
      return p;
    }

  return DataTrans;
}]);

Notifs.controller('notifs.main', ["$scope","$http","$stateParams","DataTrans","$state","$filter", function ($scope,$http,$stateParams,DataTrans,$state,$filter) {


  $scope.models = {filter:''};
  $scope.forceAdmin = $scope.forceAdmin || "";

  if($scope.forceAdmin == "") {
    DataTrans.getParams().then(function(data){
      $scope.models.PARAMS = data;
    });
  }

  DataTrans.getNotifs($scope.forceAdmin).then(function(data) {
    $scope.models.NOTIFS = data.NOTIFS;
    $scope.models.TYPES = data.TYPES;
    updateFilter("");
  });

  $scope.$watch("models.filter", function(filter) {
    updateFilter(filter);
  });

  $scope.$watch("models.PARAMS", function(param) {
    console.log(angular.toJson(param));
    DataTrans.setParams(angular.toJson(param));
  }, true);


  updateFilter = function(filter) {
    $scope.models.FILTEREDNOTIFS = $filter('filter')($scope.models.NOTIFS, {type: filter});
    updateCount();
  }
  updateCount = function() {
    var count = ($filter('filter')($scope.models.FILTEREDNOTIFS, {seen:0})).length;
    $scope.models.count = count > 0 ? count : '';
  }

  $scope.selectOnly = function(type) {
    if(type == 0) $scope.models.filter = '';
    else $scope.models.filter = type;
  }

  $scope.setSeen = function(notif,index) {
    if(notif.seen == 0 || notif === 0) {
      var id = notif.id || notif;
      DataTrans.setSeen(id).then(function(data) {
        if(data) {
          if(notif.id) {
            notif.seen = 1;
            $scope.models.count--;
          }
          else {
            angular.forEach($scope.models.NOTIFS, function(notif) {
              notif.seen = 1;
            });
            $scope.models.count = '';
          }
        }
      });
    }
  }

}]);

Notifs.controller('notifs.admin', ["$scope","$controller","DataTrans", function ($scope,$controller,DataTrans) {

  $scope.forceAdmin = "1";

  angular.extend(this, $controller('notifs.main', {$scope: $scope}));

  DataTrans.getNotifs("1").then(function(data) {
    $scope.models.NOTIFS = data.NOTIFS;
    $scope.models.TYPES = data.TYPES;
    updateFilter("");
  });
}]);


Notifs.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider,$urlRouterProvider,$locationProvider){
        $stateProvider
            .state('Notifs', {
                url: '/',
                views: {
                    'Notifs@': {
                        controller: 'notifs.main',
                        templateUrl: 'Notifs/templates/notifs_main.tmpl.html'
                    }
                }
            })
            .state('Admin', {
              url:'/Admin/',
              views: {
                'Notifs@': {
                  controller: 'notifs.admin',
                  templateUrl: 'Notifs/templates/notifs_admin.tmpl.html'
                }
              }
            })
            .state('Included', {
              views: {
                'AccueilNotif@': {
                  controller: 'notifs.main',
                  templateUrl: 'Notifs/templates/notifs_accueil.tmpl.html'
                },
                'Notifs@': {
                    controller: 'notifs.main',
                    templateUrl: 'Notifs/templates/notifs_main.tmpl.html'
                }

              }
            });

  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get('$state');
    $state.go('Included');
  });

}]);

Notifs.directive('toggleClass', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
});


Notifs.directive('juNotifInner', function() {
  return {
    templateUrl: GLOBAL_URL_PATH_TO_JU+"Notifs/templates/notif_NotifInner.tmpl.html",
    restrict:'E',
    replace: true,
  };
});
