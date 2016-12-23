var services = angular.module('services', []);
var Stats = angular.module('Stats', [
    'services',
    'ui.router',
    'tableSort'
]);

Stats.controller('StatsControl', ['$scope','$http', function($scope,$http) {

  var members = [];
  // Let's get the infos.
  $http.post('Stats/getForum.php').then(function(data) {
    var FORUM = data.data;
    // Maintenant on va chercher Juliet
      $http.post('Stats/getJuliet.php').then(function(data) {
        var JULIET = data.data;
        // Et enfin RSI
          $http.post('Stats/getRSI.php').then(function(data) {
            var RSI = data.data;
            // This is where the FUN happens.
            // Pour chaque joueur ayant axx aux forums
            for (var id in FORUM) {
              var memb = {id_forum: id, name: FORUM[id], juliet: false, fleet: 0, handle: "", rsi: false, rsi_type: null, rsi_vis: null};

              // Si il est dans juliet
              if(JULIET[id]) {
                  memb.juliet = true;
                  memb.fleet = JULIET[id].fleet;
                  memb.squad = JULIET[id].squad;
                  memb.squadname = JULIET[id].squadname;

                if(JULIET[id].handle) {
                  memb.handle = JULIET[id].handle;

                    // Donc déjà on lowercase + on vire trailing space.
                  var HANDLE = memb.handle.toLowerCase();
                  HANDLE = HANDLE.replace(/\s+$/, '');

                    if(RSI[HANDLE]) {
                      memb.rsi = true;
                      memb.rsi_type = RSI[HANDLE].type;
                      memb.rsi_vis = RSI[HANDLE].visibility;

                      delete RSI[HANDLE];
                      // si c'est bon on vire le membre du RSI.
                  }
                }
              }

              // Maintenant vérification d'usage pour le statut.
              if(memb.juliet && memb.rsi && (memb.rsi_type == "main") && (memb.rsi_vis == "Visible")) {memb.stat = "RAS"; memb.err = null;}
              else if(memb.juliet && memb.rsi && (memb.rsi_type == "main") ) {memb.stat = "RedHid"; memb.err=1;}
              else if(memb.juliet && memb.rsi) {memb.stat = "mainAff"; memb.err = 2;}
              else if(memb.juliet && !memb.rsi && memb.handle == "") {memb.stat = "NoHandle"; memb.err = 3;}
              else if(memb.juliet && !memb.rsi) {memb.stat = "NotInRSI"; memb.err = 4;}
              else if(!memb.juliet) {memb.stat = "NotInJuliet"; memb.err = 5;}

            members.push(memb);
            }

            $scope.members = members;
            $scope.RSI = RSI;
      });
    });
  });

}]);


Stats.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider,$urlRouterProvider,$locationProvider){
        $stateProvider
            .state('Stats', {
                url: '/',
                views: {
                    'Stats@': {
                        controller: 'StatsControl',
                        templateUrl: 'Stats/templates/stats_main.tmpl.html'
                    }
                }
            });
      $urlRouterProvider.otherwise('/');
    }]);
