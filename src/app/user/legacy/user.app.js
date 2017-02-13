var User = angular.module('User', [
    'Tags',
    'Ships',
]);

User.controller('controller.user', function ($scope,$http,$stateParams,$state) {
    console.log($state.current);
    console.log("PROUT");
});

User.config(function($stateProvider,$urlRouterProvider){
      $stateProvider
          .state('User', {
              url: '/',
              views: {
                  'TagIncluded@': {
                      controller: 'controller.tags',
                      templateUrl: 'Tags/templates/tags_user.tmpl.html'
                  },
                  'ListShip@' : {
                        controller: 'controller.ships',
                        templateUrl: 'Ships/templates/ships_left_list.tmpl.html'
                  }
              }
          });
});
