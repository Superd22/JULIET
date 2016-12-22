
var services = angular.module('services', []);

services.factory('DataTrans', ['$http', function($http,$scope) {

  var DataTrans = {};

  var ships = null;
  var owner = null;

  var GroupMod = false;

  var userId = 1;
  var groupId = 1;

  var listShips = null;
  var pushed = false;

  var server_queried = false;
  var tried = false;
  var force = false;
  var promise;
  var rights;
  DataTrans.listShips = null;


  DataTrans.setUser = function(tad) {
    if(tad && (GroupMod || tad != userId)) {
      userId = tad;
      GroupMod = false;
      force = true;
    }
  }

  DataTrans.setGroup = function(tad) {

      if(tad && (!GroupMod || tad != groupId)  ) {
        groupId = tad;
        GroupMod = true;
        force = true;
       }
    }

  DataTrans.getShipList = function() {
        DataTrans.listShips = $http.get("Ships/list_ships.php").then(function(data) {
          DataTrans.listShips = data.data;
      });
  }

  DataTrans.hasRights = function() {
    if( !rights || !server_queried ) {
        rights  = $http.post('Rights/index.php', {user: userId, right: "USER_CAN_ADMIN_SHIPS"}).then(function(data) {
          server_queried = true;
          var ret = false;
          if(data.data == 1) ret = true;

          return ret;
        });
      }

      return rights;
    }

  DataTrans.changeName = function(id,name) {
      if(id > 0) {
        p = $http.post('Ships/ships_post.php', {mod: 'rename', ship_id: id, name: name}).then(function(data) {
          return data.data;
        });

        return p;
      }
  }

  DataTrans.addShip = function(id) {
    console.log("add ship");
    if(id > 0) {
      console.log("valide");
      p = $http.post('Ships/ships_post.php', {mod: 'add', ship_id: id, user:userId}).then(function(data) {
        console.log(data);
        return data.data;
      });

      return p;
    }

  }


    DataTrans.removeShip = function(id) {
      if(id > 0 && !pushed) {
        pushed = true;
        p = $http.post('Ships/ships_post.php', {mod: 'del', ship_id: id, user:userId}).then(function(data) {



          return true;
        });

        return p;
      }
    }

  DataTrans.getShipForce = function() {
    force = true;
    return DataTrans.getShips();
  }

  DataTrans.getShips = function() {
      pushed = false;

      var option = {user: userId};
      if( GroupMod ) option = {group: groupId};

      console.log("GetShip()");
      console.log(force);

    if( (!promise || !server_queried) || force ) {
          promise = $http.post('Ships/ships_get.php', option).then(function(data) {
          server_queried = true;
          force = false;
          console.log("set");
          console.log(force);
          owner = data.owned;
          ships = data.details;

          return data.data;
        });
      }

      return promise;
  }

  DataTrans.getShipList();

  return DataTrans;
}]);

var Ships = angular.module('Ships', [
    'services',
    'ui.router',
    'FBAngular'
]);




Ships.controller('shipList', ['$scope','DataTrans', function($scope,DataTrans) {

    $scope.blur = false;
    $scope.changed = false;
    $scope.oldName = $scope.ship.name;

    $scope.updateName = function(keyEvent, ship) {
      if(keyEvent.which === 13 && $scope.Rights) {
        DataTrans.changeName(ship.id, ship.name).then(function() {
          $scope.changed = false;
          $scope.oldName = "";
        });
      }
    }

    $scope.$watch("ship.name", function(nVal, oVal){
      if(!$scope.changed && nVal != $scope.oldName) {$scope.oldName = oVal;$scope.changed = true}
      else if($scope.oldName == nVal) {$scope.changed = false;}

      $scope.data.owned[$scope.ship.id].prefix = $scope.prefix($scope.ship);


    });

    $scope.ShowDel = function() {
      if($scope.Rights) {
        if(!$scope.blur) $scope.blur=true;
        else $scope.blur=false;
      }
    }

    $scope.remove = function(id) {
      if($scope.Rights) {
        if(DataTrans.removeShip(id)) {
          delete $scope.data.owned[id];
        }
      }
    }

}]);

Ships.controller('controller.ships.hangar.single', ["$scope", function($scope) {


    var lastShipIterate = 0;
    $scope.$watch("hasData", function(val) {
      if(val) {
        angular.forEach($scope.data.details, function(value) {
          if(value.size > $scope.biggestWidth) $scope.biggestWidth = value.size;
        });
      }

    });

    $scope.needSep = function(ship) {
      if(ship && ship.type_id != lastShipIterate && lastShipIterate != 0) {
        lastShipIterate = ship.type_id;
        return "separator"
      }
      else{
        lastShipIterate = ship.type_id;
        return "";
      }

    }
}]);


Ships.controller('controller.ships.hangar', ["$scope","$http","$stateParams","DataTrans","$state","Fullscreen","$timeout", function ($scope,$http,$stateParams,DataTrans,$state,Fullscreen,$timeout) {
  var MajorTag = "VFS ";
  var MinorTag = " ";

  $scope.count = 0;
  // On veut afficher un hangar, déjà on récupére la taille de notre hangar en px.
  $scope.hangarWidth = $("#ShipHangar").width();
  $scope.biggestWidth = 0;

  var maxSizeW = 0.7
  var minShipPerRow = 1;

  $scope.zoom = 10;
  $scope.scale = 1;
  $scope.loading = true;
  $scope.isFullscreen = false;
  $scope.wait = true;
  $scope.squadId = $stateParams.squadId || 0;

    $scope.getSize = function(ship) {
        if(ship) {
          return Number($scope.data.details[ship.type_id].size);
        }
    }

    $scope.goFullscreen = function () {
        if (Fullscreen.isEnabled()) Fullscreen.cancel();
        else Fullscreen.enable(document.getElementById('ShipHangar'));

        $timeout(function() {$scope.hangarWidth = $("#ShipHangar").width();}, 5000);
     };

            $scope.displayName = function(ship) {
              var returnName = "Unamned";
              if(ship && ship.name.length > 0) {
                if($scope.data.details[ship.type_id].type != "Chasseur"
                && $scope.data.details[ship.type_id].type != "chasseur"
                && $scope.data.details[ship.type_id].type != "nothing") returnName = MajorTag+ship.name;
                else returnName = ship.name;
              }

              return returnName;
            }



                getMargins = function(type) {
                  var n = Math.floor( $scope.hangarWidth / ($scope.scale * $scope.zoom/10 * type.size) );
                  var r = $scope.hangarWidth % ($scope.scale * $scope.zoom/10 * type.size);

                  var m =  r / (n+1);
                  m = m >= $scope.hangarWidth ? 0 : m;
                  // Failsafe mocheté
                  return Math.floor(m);
                }

                setScale = function() {
                  var maxActual = Math.floor($scope.hangarWidth * maxSizeW);
                    if(maxActual < $scope.biggestWidth && isFinite(maxActual / $scope.biggestWidth)) {
                      $scope.scale = (maxActual / $scope.biggestWidth);
                    }
                }

                hasEnoughPlace = function(type) {
                  if( (type.size * $scope.scale * $scope.zoom/10) > 115) {
                    return true;
                  }
                  else return false;
                }

                shipSize = function(type) {
                  return Math.floor(type.size * $scope.scale * $scope.zoom/10);
                }


                $scope.$watch("biggestWidth", function(val) { setScale(); });
                $scope.$watch("hangarWidth", function(val) { setScale(); });


                $scope.orderShip = function(ship) {
                  if(ship) {
                    return -$scope.data.details[ship.type_id].size;
                  }
                }


  majGridSize = function() {
    console.log("maj");
    angular.forEach($scope.data.details, function(shipClass, i) {
        // Déclaration si assez de place pour afficher les titres.
      $scope.data.details[i].hasEnoughPlace = hasEnoughPlace(shipClass);

        // Déclarations des marges pour le positionemment grille
      $scope.data.details[i].margins = getMargins(shipClass);

        // Déclaration de la taille.
      $scope.data.details[i].renderSize = shipSize(shipClass);
    });

    $scope.loading = false;
  }



  DataTrans.setGroup($scope.squadId);
  DataTrans.getShips().then(
    function(posts) {
      $scope.data = posts;
      $scope.shipList = DataTrans.listShips;

      $scope.display = $scope.data.owned.splice(0,50);


        // Première boucle pour récuperez la taille maximale.
      angular.forEach($scope.data.details, function(shipClass) {
        if(shipClass.size > $scope.biggestWidth) $scope.biggestWidth = shipClass.size;
      });

        // Mettre en place le scale
      setScale();

        // Seconde boucle de calcul.
      majGridSize();

      $scope.hasData = true;

      DataTrans.hasRights().then(function(rights) {
        $scope.Rights = rights;
        $scope.wait = false;
      });


      $scope.$watchGroup(["hangarWidth","biggestWidth","zoom"], function(newVals,oldVal) {
        console.log(oldVal[0]);
        console.log(newVals[0]);
        $scope.loading = true;
        setScale();
        majGridSize();
      });

      $scope.$on("FBFullscreen.change",function() {
        $scope.hangarWidth = $("#ShipHangar").width();
      });

    });

    $scope.$on('$viewContentLoaded', function ()
    {
         $scope.loading = false;
    });

}]);

Ships.controller('controller.ships', ["$scope","$http","$stateParams","DataTrans","$state", function ($scope,$http,$stateParams,DataTrans,$state) {


    var MajorTag = "VFS ";
    var MinorTag = " ";

    var call = 0;


    $scope.userId = $scope.ladid || $stateParams.userId || 1;
    if(call == 0) DataTrans.setUser($scope.userId);

    $scope.wait = true;
    $scope.changed = false;
    $scope.Rights = false;
    $scope.hasData = false;
    $scope.data = {};
    $scope.data.owned = [];
    $scope.shipList = {};
    $scope.addShip = {}

    $scope.newShip = function() {
      console.log("new shgip");
      $scope.selectChanged = true;

      console.log($scope.addShip);
      newId = $scope.addShip.sel.id;
      if(newId > 0) {
        console.log("yes");
        // Adding it
      DataTrans.addShip(newId).then(function(yes) {
          if(yes) {
            console.log("AddShip");
              // Si c'est fait on maj
            DataTrans.getShipForce().then(
              function(posts) {
                $scope.data = posts;
                $scope.try = yes;
                $state.go("Ships.single", {shipId: yes});
                $scope.selectChanged = false;
            });
          }
      });
    }
  }

 // On prend ce dont on a besoin (LOL)
 console.log("Called from controller:")
  DataTrans.getShips().then(
    function(posts) {
      call++;
      $scope.data = posts;
      $scope.shipList = DataTrans.listShips;

      $scope.hasData = true;

      DataTrans.hasRights().then(function(rights) {
        $scope.Rights = rights;
      });



      $scope.$watch("shipId", function(val) {
        // Si on a pas le ship en stock on va chercher.
          // TO DO;
          if($scope.data) {
        if($scope.data.owned[$scope.try]) {
          var idtype = $scope.data.owned[$scope.try].type_id;
          $scope.shipType = $scope.data.details[idtype];
          $scope.shipInstance = $scope.data.owned[$scope.try];

          $scope.shipRights = DataTrans.hasRights($scope.try);
          // Set what we need
          getDetails();
        }
        }
      });


      getDetails = function() {
        if($scope.shipInstance) {
               $http.post('API/get_users_by_id.php', {user: $scope.shipInstance.owner}).then(function(data) {

                 $scope.playerLink = data.data.split("\"").join("");
               });
            }

      }

      $scope.$watch("shipInstance.name", function(val){
        if($scope.shipInstance) {
          if($scope.isEmpty($scope.shipInstance)) $scope.data.owned[$scope.shipInstance.id].name = "Unamned";
          $scope.data.owned[$scope.shipInstance.id].prefix = $scope.prefix($scope.shipInstance);
        }
      });


      $scope.wait = false;

    });

        $scope.displayName = function(ship) {
          var returnName = "Unamned";
          if(ship && ship.name.length > 0) {
            if($scope.data.details[ship.type_id].type != "Chasseur"
            && $scope.data.details[ship.type_id].type != "chasseur"
            && $scope.data.details[ship.type_id].type != "nothing") returnName = MajorTag+ship.name;
            else returnName = ship.name;
          }

          return returnName;
        }


        $scope.isBig = function(ship) {
          if($scope.data.details[ship.type_id].type != "Chasseur"
          && $scope.data.details[ship.type_id].type != "chasseur"
          && $scope.data.details[ship.type_id].type != "nothing") {
            return true;
          }
          else return false;

        }


        $scope.prefix = function(ship) {
          if( $scope.isBig(ship) && !$scope.isEmpty(ship) ) return "VFS ";
          else return "";
        }


        $scope.GetPlayerLink = function(playerId) {
          $http.post('API/get_users_by_id.php', {user: playerId}).then(function(data) {
              return"lol";
          });
        }


        $scope.isEmpty = function(ship) {
          if(ship && ship.name) {
            if(ship.name.length < 1 || ship.name == "Unamned") return true;
            else return false;
          }
        }

      // ## WATCH
      // AJOUT NOUVEAU VAISSEAU



    // TO DO SECURITY
      $scope.hasTheRights = function() {
        return true;
      }
      $scope.try = $stateParams.shipId;
}]);

Ships.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider,$urlRouterProvider,$locationProvider){

        //$locationProvider.html5Mode(true);

        $stateProvider
            .state('Ships', {
                url: '/',
                views: {
                    'Ships@': {
                        controller: 'controller.ships',
                        templateUrl: 'Ships/templates/ships_main.tmpl.html'
                    },
                    'ListShip@' : {
                          controller: 'controller.ships',
                          templateUrl: 'Ships/templates/ships_left_list.tmpl.html'
                    }
                }
            })
            .state('Ships.single', {
                url: 'view/:userId/:shipId',
                views: {
                      'Ships@': {
                          controller: 'controller.ships',
                          templateUrl: 'Ships/templates/ships_main.tmpl.html'
                      },
                      'ListShip@' : {
                            controller: 'controller.ships',
                            templateUrl: 'Ships/templates/ships_left_list.tmpl.html'
                      }
                }
            }).state('Ships.group', {
                  url: 'group/:squadId',
                  views: {
                        'Ships@': {
                            controller: 'controller.ships.hangar',
                            templateUrl: 'Ships/templates/ships_group_main.tmpl.html'
                        },
                        'ListShip@': {

                        }
                  }
              });

                      $urlRouterProvider.otherwise('/');
    }]);
