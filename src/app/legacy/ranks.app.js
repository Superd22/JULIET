var services = services || angular.module('services', []);

services.factory('RankTrans', ['$http', function($http,$scope) {
  var RankTrans = {};
  RankTrans.loading = true;

  RankTrans.getRanks = function() {
    var p = $http.get("Ranks/getAllRanks.php").then(function(data) {
      return data.data;
    });

    return p;
  }

  RankTrans.hasAdmin = function() {
    RankTrans.loading = true;
    var p = $http.post("Rights/index.php", {right: "USER_CAN_ADMIN_RANKS"}).then(function(data) {
      var r = false;
      if(data.data == "1" || data.data == "true") r = true;

      RankTrans.loading = false;

      return r;
     });

     return p;
  }

  RankTrans.getUserName = function() {
    RankTrans.loading = true;
    var p = $http.post("API/get_users_by_id.php", {user: 1}).then(function(data) {
      var str = data.data;

      RankTrans.loading = false;
      return str.replace(/"/g, '');
    });

    return p;
  }

  RankTrans.updateRank = function(rank, mod) {
    var m = mod || "mod"

    var post = {mod: m, rank: rank};
    var p = $http.post("Ranks/editRank.php", post).then(function(data) {
      return data.data;
    });

    return p;

  }

  RankTrans.getUserRank = function() {
    RankTrans.loading = true;
      var p = $http.get("Ranks/getUserRank.php").then(function(data) {

        RankTrans.loading = false;
        return data.data;
      });

      return p;
  }

  return RankTrans;
}]);

var Ranks = angular.module('Ranks', [
    'services',
    'ui.router',
    'FBAngular',
    'dndLists'
]);

Ranks.controller('controller.ranks', ["$scope","$http","$stateParams","RankTrans","$state", function ($scope,$http,$stateParams,RankTrans,$state) {

    var i = -1;
    var branche = null;


    $scope.models = {rankSelected: 0};
    $scope.models.displayEdit = false;

    $scope.rSelect = 0;
    $scope.FULL = [false,false,false];
    $scope.isMakeFull = false;
    $scope.PROUT = [];

    if($stateParams.wing) {
      $scope.isMakeFull = true;
      if ($stateParams.wing == "Militaire")   $scope.FULL[0] = true;
      if ($stateParams.wing == "Consortium")  $scope.FULL[1] = true;
      if ($stateParams.wing == "Syndicat")    $scope.FULL[2] = true;
    }

  getRanks = function() {
    var ranks = RankTrans.getRanks();
      ranks.then(function(data) { $scope.models.RANKS = data; });
  }

  getAdmin = function() {
    var admin = RankTrans.hasAdmin();
      admin.then(function(data) { $scope.models.HasRights = data; });
  }

    $scope.makeFull = function(i) {
      $scope.FULL = [false,false,false];
      $scope.isMakeFull ^= true;

      $scope.FULL[i] = true;
    }

    $scope.addPosInStar = function(star) {
      var l = star.length;
      var a = {id_POS: String(l), ranks:[]}

      star.push(a);
    }

    $scope.addRankInStar = function(pos,star,branche) {
      p = pos || {id_POS: 0};
      var newRank = {
        name: "Nouveau Rang",
        url: "https://starcitizen.fr/Flotte/images/rank/blank.png",
        ID: i,
        type: branche,
        pos: p.id_POS,
        stars: star
      };

      pos.ranks.push(newRank);
      $scope.models.rankSelected = newRank;
      i--;
    }

    $scope.updatePosRank = function(index, rank, star, pos) {
      rank.pos = pos.id_POS || 0;
      rank.stars = star.id_STAR;

      console.log(rank);

      RankTrans.updateRank(rank).then(function(data) {
        console.log(data);
        getRanks();
      });
    }

    $scope.validateRank = function(rank) {
      $scope.resetSelect();

        RankTrans.updateRank(rank).then(function() {
          if(rank.ID < 0) getRanks();
        });
    }

    $scope.deleteRank = function(rank) {
      if (confirm("Êtes vous sur de vouloir définitivement supprimer ce rang ?")) {
        $scope.resetSelect();

          RankTrans.updateRank(rank, "del").then(function() {
            getRanks();
          });
        }
      }

      $scope.resetSelect = function() {
          $scope.models.rankSelected = 0
      }

      $scope.selEtPoivre = function(rank) {
          $scope.displayEdit = true;
      }

    $scope.$watch('models.RANKS', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

  getRanks();
  getAdmin();
}]);

Ranks.controller('controller.ranks.user', ["$scope","$http","$stateParams","RankTrans","$state", function ($scope,$http,$stateParams,RankTrans,$state) {

  $scope.test = "caca";
  $scope.HasRights = false;
  $scope.userRank = {};
  $scope.userName = "Name";


  var admin = RankTrans.hasAdmin();
  var userRank = RankTrans.getUserRank();
  var userName = RankTrans.getUserName();

  admin.then(function(data) { $scope.HasRights = data; });
  userRank.then(function(data) { $scope.userRank = data; });
  userName.then(function(data) { $scope.userName = data; });


}]);

Ranks.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider,$urlRouterProvider,$locationProvider){

        //$locationProvider.html5Mode(true);
        $stateProvider
            .state('Ranks', {
                url: '/',
                views: {
                    'Ranks@': {
                        controller: 'controller.ranks',
                        templateUrl: 'Ranks/templates/Ranks_main.tmpl.html'
                    },
                    'UserRank@': {
                      controller: 'controller.ranks.user',
                      templateUrl: 'Ranks/templates/Ranks_user.tmpl.html'
                    }
                }
              }).state('Ranks.oneWing', {
                    url: 'Aile/:wing',
                    views: {
                        'Ranks@': {
                            controller: 'controller.ranks',
                            templateUrl: 'Ranks/templates/Ranks_main.tmpl.html'
                        },
                        'UserRank@': {
                          controller: 'controller.ranks.user',
                          templateUrl: 'Ranks/templates/Ranks_user.tmpl.html'
                        }
                    }
                });

                      $urlRouterProvider.otherwise('/');
    }]);
