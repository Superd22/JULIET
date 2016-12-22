var services = angular.module('services', []);
var Calendar = angular.module('Calendar', [
    'services',
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ui.select',
    'mwl.calendar',
    "angularUtils.directives.dirPagination",
]);

Calendar.controller('CalendarSingle', ['$scope','$http','$stateParams','$state','$filter','$timeout','$sce', '$window', function($scope,$http,$stateParams,$state,$filter,$timeout,$sce,$window) {

  $scope.newEvent = true;
  $scope.hasRights = false;
  $scope.loading = true;
  $scope.done = true;
  $scope.language = {};
  $scope.language.EventPrefix = "Nouvel";
  $scope.EVENT = {};
  backup = {};
  $scope.PERMTEMP = [];


    $scope.BaseUrl = GLOBAL_URL_PATH_TO_JU;

    var d = new Date();
    d.setHours(0,0,0,0);

    $scope.day = d;
    $scope.start = d;
    $scope.end = d;
    $scope.today = d;

    $stateParams.eId = $stateParams.eId || $scope.initeId;

  // Mode edit ou création
  if($stateParams.eId > 0) {$scope.newEvent = false; $scope.language.EventPrefix = "Voir";}
  else {$scope.loading = false; $scope.hasRights = true;}

  // Si on edit un event, on check les privileges.
  if($scope.newEvent == false) {

    $http.post(GLOBAL_URL_PATH_TO_JU+'Rights/index.php', {target: $stateParams.eId, right:"USER_CAN_ADMIN_EVENT"}).then(function(data) {
      if(data.data == "true" || data.data == "1") $scope.hasRights = true;
    });

    // Dans le même temps on va fetch l'event en question.
    $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/getSingle.php', {eId: $stateParams.eId}).then(function(data) {


      // #####################
      // EVENEMENT
      // #####################
        $scope.EVENT = data.data.Event;
        $scope.EVENT.start = Number($scope.EVENT.start);
        $scope.EVENT.end = Number($scope.EVENT.end);
        makeBackup()

        // Timestamp de mes couilles.
        $scope.day = new Date(data.data.Event.start * 1000);
        $scope.start = new Date(data.data.Event.start * 1000);
        $scope.end = new Date(data.data.Event.start * 1000);

        var mod = Math.floor(data.data.Event.end / 3600);
        var min = (data.data.Event.end%3600)/60;

        $scope.end.setHours(mod,min,0,0);

        makePrettyDesc();


        // Récupération permissions.
        if($scope.EVENT.perm && $scope.EVENT.perm[0] != "") {
          $http.post(GLOBAL_URL_PATH_TO_JU+'API/getFullUser.php', {ids: $scope.EVENT.perm})
            .then(function(response) {
              $scope.PERMTEMP = response.data;
            });
        }
      // #####################
      // INVITATIONS
      // #####################
        $scope.INVITS = data.data.Invitations;
        $scope.INVITS.invits = $scope.INVITS.invits || [];
        $scope.INVITS.members = $scope.INVITS.members || [];
        $scope.INVITS.groupes = $scope.INVITS.groupes || [];
        $scope.INVITS.tags = $scope.INVITS.tags || [];

        var invitations = [];
        var members = [];
        var groups = [];
        var tags = [];
        $scope.demande = {};
        $scope.mbrinfo = {};


        angular.forEach($scope.INVITS.invits, function(val) {
          invitations.push(val.target);

          $scope.demande[val.target] = false;
          if(val.type == 1) $scope.demande[val.target] = true;
        });

        angular.forEach($scope.INVITS.members, function(val) {
          members.push(val.target);
        });

        angular.forEach($scope.INVITS.groupes, function(val) {
          groups.push(val.target);
        });

        angular.forEach($scope.INVITS.tags, function(val) {
          tags.push(val);
        });


      //
      if(invitations && invitations.length > 0) {
        $scope.invitations = [];
        $http.post(GLOBAL_URL_PATH_TO_JU+'API/getFullUser.php', {ids: invitations})
          .then(function(response) {
            if(response.data != "null")  $scope.invitations = response.data;
          });
      }
      if(members && members.length > 0) {
        $http.post(GLOBAL_URL_PATH_TO_JU+'API/getFullUser.php', {ids: members})
          .then(function(response) {
            angular.forEach(response.data,function(item) {
              $scope.mbrinfo[item.id] = item;
            });
          });
      }
      if(groups && groups.length > 0) {
        $scope.groups = [];
        $http.post(GLOBAL_URL_PATH_TO_JU+'API/getJuGroup.php', {mod:"id",target: groups})
          .then(function(response) {
            if(response.data != "null") $scope.groups = response.data;
          });
      }
      if(tags && tags.length > 0) {
        $scope.tags = [];
        ids = tags.map(function(a) {return a.target;});
        types = tags.map(function(a) {return a.type;});
        $http.post(GLOBAL_URL_PATH_TO_JU+'Tags/tags_getNameById.php', {id: ids, type: types})
          .then(function(response) {
            if(response.data != "null") {
              if(!Array.isArray(response.data)) response.data = [response.data];
              $scope.tags = response.data;
            }
          });
      }





      $scope.loading = false;
    });

    // Et enfin on fait le boulot pour savoir si on peut s'inscrire.
    $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/getInvit.php', {eId: $stateParams.eId}).then(function(data) {
      $scope.CANASK = data.data;

      $scope.displayExplanation = function() {

        $scope.MY = {};

        $scope.MY.del = false;
        $scope.MY.send = true;
        $scope.MY.confirm = false;

        if($scope.CANASK.INVIT != null) {
          $scope.MY.del = true;
          $scope.MY.send = false;
          if($scope.CANASK.INVIT.confirm == 0 && $scope.CANASK.INVIT.type == 1) {
            return "Votre présence à bien été prise en compte. Elle n'a pas encore été validée par un organisateur de l'évenement."
          }
          else if ($scope.CANASK.INVIT.confirm == 0 && $scope.CANASK.INVIT.type == 0) {
              $scope.MY.confirm = true;
              $scope.MY.send = false;
              $scope.MY.del = false;

            return "Vous avez été invité à participer par un organisateur, vous pouvez valider votre présence à tout moment."
          }
          else if ($scope.CANASK.INVIT.confirm == 1) {
            return "Votre présence est validée ! Vous pouvez néanmoins changer d'avis à tout moment !";
          }
        }
        else {
          if($scope.CANASK.GROUP != null) {
              return "Votre groupe "+$scope.CANASK.GROUP.nom+" a été invité. Vous pouvez donc indiquer vos disponibilités à la suite !";
          }
        }
        if($scope.CANASK.EVENT.private == 1) return "Une simple demande de votre part peut-être réalisée en appuyant sur les boutons ci-dessous."
      }


    });
  }
  else {
    // Failsafe perm/invits/groups.
    $scope.EVENT.perm = [];
  }

    $scope.del_event = function() {
      if(window.confirm("Êtes vous sur de vouloir supprimer cet evenement ? Cette action est irreversible et supprimera invitations, membres et roster.")) {
        $http.post('Calendar/editSingle.php', {eId: $stateParams.eId, mod: "DEL_EVENT"}).then(function(data) {
          $state.go("Calendar", {}, {reload: true});
        });
      }
    }
              $scope.pseudos = [];
              $scope.refreshPseudos = function(pseudo) {
                var params = {pseudo: pseudo};
                return $http.get(GLOBAL_URL_PATH_TO_JU+'inc/search_pseudo.php', {params: params})
                  .then(function(response) {
                    $scope.pseudos = response.data;
                    return response.data;
                  });
              };

              $scope.groupes = [];
              $scope.refreshGrp = function(pseudo) {
                if(pseudo) {
                  return $http.post(GLOBAL_URL_PATH_TO_JU+'API/getJuGroup.php', {target: pseudo, mod:"name"})
                    .then(function(response) {
                      $scope.groupes = response.data;
                      return response.data;
                    });
                }
              }

              $scope.tages = [];
              $scope.refreshTag = function(pseudo) {
                return $http.post(GLOBAL_URL_PATH_TO_JU+'Tags/tags_search.php', {f: pseudo, mod:"ALL"})
                  .then(function(response) {
                   $scope.tages = response.data;
                   return response.data;
                  });
              }


      $scope.delInvit = function(item,mbr,i) {
        $scope.loading = true;
        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/postInvit.php', {target: item.id, eId:$stateParams.eId, mod:"DEL_INVIT"})
          .then(function(response) {
            if (response.data == "OK") {
              if(mbr) $scope.INVITS.members.splice(i,1);
             }
          $scope.loading = false;
           });
      }

      $scope.addInvit = function(item) {
        $scope.loading = true;
        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/postInvit.php', {target: item.id, type:0, eId:$stateParams.eId, mod:"ADD_INVIT"})
          .then(function(response) {
            if (response.data == "OK") {

             }

          $scope.loading = false;
           });
      }

      $scope.delTag = function(item,mbr,i) {
        $scope.loading = true;
        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/postInvit.php', {target: item.id, eId:$stateParams.eId, mod:"DEL_TAG",tagName:item.name, type: -100 + Number(item.type)})
          .then(function(response) {
            if (response.data == "OK") {
            if(mbr) $scope.INVITS.tags.splice(i,1);
          }
            $scope.loading = false;
        });
      }

      $scope.addTag = function(item) {
        $scope.loading = true;
        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/postInvit.php', {target: item.id, type: -100 + Number(item.type), eId:$stateParams.eId,tagName:item.name, mod:"ADD_INVIT"})
          .then(function(response) {
            if (response.data == "OK") {   }
            $scope.loading = false;
        });
      }

      $scope.delGrp = function(item) {
        $scope.loading = true;
        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/postInvit.php', {target: item.id, eId:$stateParams.eId,tagName:item.name, mod:"DEL_GRP"})
          .then(function(response) {
            if (response.data == "OK") {

             }
          $scope.loading = false;
           });
      }

      $scope.addGrp = function(item) {
        $scope.loading = true;
        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/postInvit.php', {target: item.id, eId:$stateParams.eId, type:2, mod:"ADD_INVIT"})
          .then(function(response) {
            if (response.data == "OK") {

             }
          $scope.loading = false;
           });
      }

      $scope.addMyInv = function(confirme) {
        $scope.loading = true;
        var confirme = confirme || $scope.CANASK.EVENT.private == 0 ? 1 : 0;
        var mode = $scope.CANASK.INVIT == null ? "ADD_INVIT" : "UP_MY_INV";
        var arg = {target: 0, eId:$stateParams.eId, type:1, confirm:confirme, mod:mode};

        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/postInvit.php', arg)
          .then(function(response) {
            if (response.data == "OK") {
              $state.go($state.current, {}, {reload: true});
             }
          $scope.loading = false;
           });
      }

      $scope.delMyInv = function() {
        $scope.loading = true;
        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/postInvit.php', {target: 0, eId:$stateParams.eId, mod:"DEL_INVIT"})
          .then(function(response) {
            if (response.data == "OK") {
              $state.go($state.current, {}, {reload: true});
             }
          $scope.loading = false;
           });
      }

      $scope.valDemande = function(item) {
        $scope.loading = true;
        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/postInvit.php', {target: item.id, eId:$stateParams.eId, mod:"CONFIRM_INVIT"})
          .then(function(response) {
            if (response.data == "OK") {
              delInv = function(array,index) {
                 array.splice(index, 1);
              }

              item.target = item.id;
              item.confirm = 1;
              $scope.INVITS.members.push(item);
              $scope.mbrinfo[item.id] = item;


              angular.forEach($scope.invitations,function(val,k) {
                if(val.id == item.id) {delInv($scope.invitations,k);}
              });
            }
            else {
              alert("Soucis BDD!");
            }
          $scope.loading = false;
          });
      }


      $scope.$watch("EVENT", function(nVal,oVal){
        if( angular.equals(nVal,backup) ) $scope.needToSave = false;
        else $scope.needToSave = true;


        if($scope.newEvent) {
          if($scope.EVENT.title && $scope.EVENT.text && $scope.EVENT.start && $scope.EVENT.private) $scope.done = true;
          else $scope.done = false;
        }

      },true);

      $scope.addPerm = function(item,model) {
            $scope.EVENT.perm.push(item.id);
      }

      $scope.delPerm = function(item) {
          angular.forEach($scope.EVENT.perm, function(perm,i) {
            if(perm == item.id) $scope.EVENT.perm.splice(i, 1);
          });
      }

      $scope.$watchGroup(["day","start","end"], function(newVals) {

        var octopus = (d.getTime()/1000);

        var timestart = new Date(newVals[1]);
        timestart.setHours(0,0,0,0)
        var timedate = new Date(newVals[0]);
        timedate.setHours(0,0,0,0);
        var timeend = new Date(newVals[0]);
        timeend.setHours(0,0,0,0);

        var td = ((timedate.getTime())/1000) || 0;
        var ts = ((new Date(newVals[1]).getTime())/1000) - (timestart.getTime()/1000) || 0;
        var te = ((new Date(newVals[2]).getTime())/1000) - (timestart.getTime()/1000) || 0;


    if(!$scope.loading){
        $scope.EVENT.start = Math.round(td+ts);
        $scope.EVENT.end = Math.round(te);
        $scope.FullDate = new Date($scope.EVENT.start*1000);}
      });


      function makeBackup() {
          backup = angular.copy($scope.EVENT);
          $scope.needToSave = false;
      }



      $scope.eventPush = function() {
        $scope.loading = true;


        var mod = "MAIN_EDIT";
        if($scope.newEvent) mod = "ADD_EVENT";

        $http.post(GLOBAL_URL_PATH_TO_JU+'Calendar/editSingle.php', {eId: $stateParams.eId, mod: mod, eventInfo: $scope.EVENT }).then(function(data) {

          if($scope.newEvent) $state.go('Calendar.single',{eId: data.data});
          else {
            if(data.data == 'OK') {
              makeBackup();
            }
            $scope.loading = false;
          }
        });
      }

      $scope.toggleDescription = function() {
        if($scope.hasRights) {
          $scope.displayPreview = !$scope.displayPreview;
          if($scope.displayPreview) makePrettyDesc();
        }
      }

      makePrettyDesc = function() {
        $http.post(GLOBAL_URL_PATH_TO_JU+'API/BBCode.php', {msg:$scope.EVENT.text})
          .then(function(response) {
            if(response.data != "null") $scope.EVENT.prettyText = $sce.trustAsHtml(response.data);
          });
      }

      $scope.goToTopic = function() {
        $window.open("https://starcitizen.fr/Forum/viewtopic.php?t="+$scope.EVENT.topic, "_blank");
      }

      $scope.tagTracking = function(tag) {
          return tag.id + tag.name + tag.img;
      }

}]);

Calendar.controller('CalendarMain', ['$scope','$http','$stateParams','$state','$filter', function($scope,$http,$stateParams,$state,$filter) {

  moment.locale('fr', {
    week : {
      dow : 1 // Monday is the first day of the week
    }
  });


  $scope.calendarView = $scope.forceMod || $stateParams.calMod || "week";
  $scope.calendarDay = $stateParams.calStart || new Date();

  $scope.oldDay = angular.copy($scope.calendarDay);



    getEvents = function() {
      var today = $scope.calendarDay;
      today.setHours(0,0,0,0);
      today = today.getTime()/1000;
      $scope.loading = true;
      return $http.post('Calendar/getEvents.php', {eStart: today, eMod: $scope.calendarView})
        .then(function(response) {

          finalEvents = [];
          angular.forEach(response.data, function(event) {
            if(event) {
              event.startsAt = new Date(event.start*1000);
              if(event.end > 0 ) event.endsAt = new Date( event.start*1000 + event.end*1000 );

              event.editable= false;
              event.deletable= false;
              event.draggable= false;
              event.resizable= false;
              var clas = "";
              var type = "";

              if(event.IsIn) clas="isIn";
              else if(event.Asked && event.private == 2) clas="invited";
              else if(event.Asked) clas="asked";
              else if(event.canSendInv) clas="canAsk";
              if(event.private == 0) {clas += " open"; type = "special";}
              if(event.private == 1) {clas += " rsvp"; type = "info";}
              if(event.private == 2) {clas += " closed";  type = "warning";}

              event.cssClass = clas;
              event.type = type;

              finalEvents.push(event);
            }
          });

          $scope.loading = false;
          $scope.events = finalEvents;
          return finalEvents;
        });
    }

    $scope.$watchGroup(["calendarDay","calendarView"], function(newVals,OldVals) {

        // Si on a changé de mod de visionage
      if(OldVals[1] != newVals[1]) {
        if(OldVals[1] == "day") getEvents();
        else if(newVals[1] == "month") getEvents();
      }

        // Dans le cas contraire on regarde si le jour de centrage est bien dans le range.
      if(OldVals[0] != newVals[0]) {

        var max = 0;

        if(OldVals[1] == "day") max = 3600*24;
        if(OldVals[1] == "week") max = 3600*24*7;
        if(OldVals[1] == "month") max = 3600*24*7*33;

        var delta = Math.abs($scope.oldDay - newVals[0])/1000;

        if(delta >= max) {
          getEvents();
          $scope.oldDay = angular.copy(newVals[0]);
        }
      }

    });

    $scope.eventClicked = function(event) {
      $state.go('Calendar.single',{eId: event.id});
    }

    getEvents();
}]);

Calendar.controller('CalendarNextIncluded', ['$scope','$http','$stateParams','$state','$filter','$controller', function($scope,$http,$stateParams,$state,$filter,$controller) {
  $scope.forceMod = "all";
  angular.extend(this, $controller('CalendarMain', {$scope: $scope}));
}]);

Calendar.controller('CalendarExport', ['$scope', 'calendarAPI', function($scope, calendarAPI) {

  $scope.loading = true;
  calendarAPI.getHash().then(function(data) {
    $scope.models = {
      allEvents: "https://starcitizen.fr/Flotte/Calendar/iCal/Events.php?user="+data+"&nocache=true",
      subEvents: "https://starcitizen.fr/Flotte/Calendar/iCal/Subscribed.php?user="+data+"&nocache=true",
    };
    $scope.loading = false;
  });



}]);

Calendar.service('calendarAPI', ['$http', function($http) {
  var service = {};

  service.getHash = function() {
    var p = $http.get(GLOBAL_URL_PATH_TO_JU+'Calendar/getHash.php').then(function(data){
      if(data.data != "") return data.data;
    });

    return p;
  }

  return service;
}])


Calendar.directive('calDesc', function() {
  return {
    templateUrl: GLOBAL_URL_PATH_TO_JU+"Calendar/templates/components/calDesc.tmpl.html",
    restrict:'E',
    replace: true,
  };
});

Calendar.directive('calSelectDate', function() {
  return {
    templateUrl: GLOBAL_URL_PATH_TO_JU+"Calendar/templates/components/calSelectDate.tmpl.html",
    restrict:'E',
    replace: true,
  };
});

Calendar.directive('calInvitStats', function() {
  return {
    templateUrl: GLOBAL_URL_PATH_TO_JU+"Calendar/templates/components/calInvitStats.tmpl.html",
    restrict:'E',
    replace: true,
  };
});

Calendar.directive('calTopic', function() {
  return {
    templateUrl: GLOBAL_URL_PATH_TO_JU+"Calendar/templates/components/calTopic.tmpl.html",
    restrict:'E',
    replace: true,
  };
});


Calendar.config(["$stateProvider", "$urlRouterProvider", "$locationProvider","calendarConfigProvider", function($stateProvider,$urlRouterProvider,$locationProvider,calendarConfigProvider){
        $stateProvider
            .state('default', {
              views: {
                  'Calendar@': {
                      controller: 'CalendarMain',
                      templateUrl: GLOBAL_URL_PATH_TO_JU+'Calendar/templates/calendar_main.tmpl.html'
                  },
                  'EventIncluded@': {
                    controller: 'CalendarSingle',
                    templateUrl: GLOBAL_URL_PATH_TO_JU+'Calendar/templates/calendar_single.tmpl.html'
                  },
                  'InvitIncluded@': {
                    controller: 'CalendarSingle',
                    templateUrl: GLOBAL_URL_PATH_TO_JU+'Calendar/templates/calendar_register.tmpl.html'
                  },
                  'NextEventsIncluded@': {
                    controller: 'CalendarNextIncluded',
                    templateUrl: GLOBAL_URL_PATH_TO_JU+'Calendar/templates/calendar_next_events.tmpl.html'
                  }
              }
              })
              .state('Calendar', {
                url: '/',
                views: {
                    'Calendar@': {
                        controller: 'CalendarMain',
                        templateUrl: GLOBAL_URL_PATH_TO_JU+'Calendar/templates/calendar_main.tmpl.html'
                    },
                    'EventIncluded@': {
                      controller: 'CalendarSingle',
                      templateUrl: GLOBAL_URL_PATH_TO_JU+'Calendar/templates/calendar_single.tmpl.html'
                    },
                    'InvitIncluded@': {
                      controller: 'CalendarSingle',
                      templateUrl: GLOBAL_URL_PATH_TO_JU+'Calendar/templates/calendar_register.tmpl.html'
                    }
                }
              })
              .state('Calendar.single', {
                    url: 'view/:eId',
                    views: {
                        'Calendar@': {
                            controller: 'CalendarSingle',
                            templateUrl: 'Calendar/templates/calendar_edit.tmpl.html'
                        }
                    }
            }).state('Calendar.export', {
              url:'Export/',
              views: {
                'Calendar@': {
                    controller: 'CalendarExport',
                    templateUrl: GLOBAL_URL_PATH_TO_JU+'Calendar/templates/calendar_export.tmpl.html',
                },
              },
            });


      $urlRouterProvider.otherwise(function($injector) {
        var $state = $injector.get('$state');
        console.log("otherwise");
        $state.go('default');
      });

      calendarConfigProvider.setDateFormatter('moment');

    }]);
