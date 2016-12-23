var services = services || angular.module('services', []);

var Tags = angular.module('Tags', [
  'ui.router',
  'angularUtils.directives.dirPagination',
  'ui.select',
  'services'
]);

Tags.service('TagCommon', ['$http', function ($http) {
  var TagCommon = {};
  TagCommon.isLad = false;

  TagCommon.generateUrl = function (tag, BaseUrl) {
    BaseUrl = GLOBAL_URL_PATH_TO_JU || "";
    var cat = tag.type;
    if (cat == 0 || cat == -1) {
      cat = "tag";
    }
    var prepend = "";
    if (TagCommon.isLad) {
      prepend = "?page=Tags";
    }
    return BaseUrl + prepend + "#/view/" + cat + "/" + encodeURIComponent(tag.name);
  }

  TagCommon.isAutoType = function (tag) {
    if (tag) {
      return (tag.type != 0 && tag.type != 1);
    }
  }

  TagCommon.has_admin = function (userid) {
    var promise = $http.post(GLOBAL_URL_PATH_TO_JU + 'Rights/index.php', { right: "USER_CAN_ADMIN_TAGS", test: "lol", user: userid }).then(function (data) {
      var hasR = false;
      if (data.data == "1" || data.data == "true") hasR = true;
      return hasR;
    });

    return promise;
  }

  TagCommon.sendQuery = function (query) {
    var p = $http.post(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_resolveQuery.php', { query: query }).then(function (data) {
      return data.data;
    });

    return p;
  }

  TagCommon.getName = function (id, type) {
    var p = $http.post(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_getNameById.php', { id: id, type: type }).then(function (data) {
      return data.data;
    });

    return p;
  }

  return TagCommon;
}]);

Tags.controller('controller.tags', function ($scope, $http, $stateParams, TagCommon) {
  $scope.BaseUrl = GLOBAL_URL_PATH_TO_JU;
  var isCreating = false;
  var isasync = false;
  var tags;

  TagCommon.isLad = true;

  function get_current_mod_slang() {
    return "Voir";
  }

  $scope.getTags = function (force) {
    $scope.isasync = true;
    if (!force && Array.isArray($scope.tags)) {
    }
    else {
      $http.get(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_get.php').success(function (data) {
        $scope.tags = data;
      }).then(function () {
        $scope.isasync = false;
      });
    }
  }


  $scope.generateUrl = TagCommon.generateUrl;

  $scope.isAutoType = TagCommon.isAutoType;
  $scope.shouldShowCreating = false;
  $scope.get_current_mod_slang = get_current_mod_slang;

  $scope.isasync = isasync;

  $scope.tagid = $stateParams.tagid || $scope.initTag;
  $scope.cat = $stateParams.cat || $scope.initCat;
  $scope.userid = $stateParams.userID;

});

Tags.controller('controller.tags.single', function ($scope, $http, $stateParams) {
  $scope.tagid = $stateParams.tagid || $scope.initTag;
  $scope.cat = $stateParams.cat || $scope.initCat;
  $scope.text = {};
  toggleTextP = "Sont affichés tous les possesseurs d'un vaisseau de la famille.";
  toggleTextC = "Sont affichés uniquement les possesseurs du vaisseau parent."

  $scope.text.toggleText = toggleTextP;

  $scope.get_current_tag = function (id, cat) {
    $scope.isasync = true
    var post = { category: cat, name: id };
    $http.post(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_get_single.php', post).success(function (data) {
      $scope.currentTag = data;
      $scope.currentTag.list = $scope.currentTag.count;
    }).then(function () {
      $scope.isasync = false;
    });
  }

  $scope.isAShip = function (type) {
    return type == "ship";
  }

  $scope.toggleParentMod = function () {
    $scope.text.toggleText = $scope.text.toggleText == toggleTextP ? toggleTextC : toggleTextP;
    $scope.currentTag.list = $scope.text.toggleText == toggleTextP ? $scope.currentTag.count : $scope.currentTag.OWN_count;
  }

});

Tags.controller('controller.tags.owner', function ($scope, $http, $stateParams, TagCommon) {

  $scope.userid = $scope.ladid || $stateParams.userID || 1;
  if ($scope.ladid) TagCommon.isLad = true;

  $scope.isAShip = function (type) {
    return type == "ship";
  }

  $scope.remove = function (tag) {
    $scope.isasync = true;
    var index = $scope.tags.indexOf(tag);
    if (index > -1) {
      $scope.tags.splice(index, 1);
    }

    $http.post(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_post.php', { method: 'remove_af', tag_id: tag.id, user: $scope.userid }).success(function (data) {
    }).then(function () {
      $scope.getTagsUser($scope.userid);
      $scope.isasync = false;
    });
  }

  $scope.selecNewTag = function (tag) {
    $scope.newTag.title = tag;
    $scope.showResult = false;
    $scope.tagR = [];
  }
  $scope.isAutoType = TagCommon.isAutoType;
  $scope.getTagsUser = function (userid, group) {
    $scope.isasync = true;

    $http.post(GLOBAL_URL_PATH_TO_JU + 'API/get_users_by_id.php', { user: userid }).success(function (data) {
      // Correction "" API, + JS c'est de la merde.
      $scope.currentUsername = data.split("\"").join("");
    });

    $http.post(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_get.php', { user: userid }).success(function (data) {
      if (data == "null") {
        data = [];
        $scope.hasnotags = true;
      }
      else $scope.hasnotags = false;


      $scope.tags = data;
    }).then(function () {
      // Pre-load pour la recherche
      $http.get(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_get.php').then(function (data) { $scope.rtags = data });

      $scope.isasync = false;
    });
  }

  $scope.createTag = function (Tag, userid) {
    if (Tag.title) {
      // Set method to new for php
      // Do post
      Tag.method = "new";
      if (userid) Tag.user = userid;

      Tag.name = Tag.title;
      if (angular.isArray($scope.tags)) $scope.tags.unshift(Tag);

      $scope.isasync = true;
      $http.post(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_post.php', Tag).success(function (data) { $scope.newTagProcess = data; }).then(function () {

        $scope.getTagsUser(userid);
        $scope.newTag = [];
        $scope.isasync = false;

      });
    }
  }

  $scope.refreshTs = function (search) {
    var params = { f: search };
    $scope.showResult = true;
    return $http.get(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_search.php', { params: params })
      .then(function (response) {
        $scope.tagR = response.data;

        if (!angular.isArray($scope.tagR)) $scope.showResult = false;
        else if ($scope.tagR[0] && $scope.tagR[0].name == $scope.newTag.title) $scope.showResult = false;

        return response.data;
      });
  }
  $scope.has_the_rights = TagCommon.has_admin($scope.userid);
  $scope.generateUrl = TagCommon.generateUrl;

  $scope.$watch("newTag.title", function (newVal) {
    $scope.refreshTs(newVal);
  });

});

Tags.controller('controller.tags.search', function ($scope, $http, $stateParams, TagCommon, $state, $q) {

  var i = 0;
  $scope.models = {};
  $scope.models.displayShips = 1;
  $scope.models.displayUsers = 1;
  $scope.models.queryWrite = [];
  $scope.showBbcode = false;
  $scope.canEdit = typeof $scope.initQuery != 'undefined' ? false : true;

  $scope.SYMBOLS = [
    { name: "(", type: 'SYMBOL', symbol: '(', id: 1 },
    { name: ")", type: 'SYMBOL', symbol: ')', id: 2 },
    { name: "[", type: 'SYMBOL', symbol: '(', id: 1 },
    { name: "]", type: 'SYMBOL', symbol: ')', id: 2 },

    { name: "AND", type: 'SYMBOL', symbol: 'AND', id: 3 },
    { name: "&&", type: 'SYMBOL', symbol: 'AND', id: 3 },
    { name: "ET", type: 'SYMBOL', symbol: 'AND', id: 3 },
    { name: ",", type: 'SYMBOL', symbol: 'AND', id: 3 },

    { name: "OR", type: 'SYMBOL', symbol: 'OR', id: 4 },
    { name: "OU", type: 'SYMBOL', symbol: 'OR', id: 4 },
    { name: "||", type: 'SYMBOL', symbol: 'OR', id: 4 },

    { name: "!", type: 'SYMBOL', symbol: '!', id: 5 },
    { name: "PAS", type: 'SYMBOL', symbol: '!', id: 5 },
    { name: "NON", type: 'SYMBOL', symbol: '!', id: 5 },

    { name: "TS", type: 'SPECIAL', symbol: 'ONLINE_TS', id: 6 },
    { name: "SUR TS", type: 'SPECIAL', symbol: 'ONLINE_TS', id: 6 },
    { name: "ONLINE TS", type: 'SPECIAL', symbol: 'ONLINE_TS', id: 6 },
    { name: "ONLINE_TS", type: 'SPECIAL', symbol: 'ONLINE_TS', id: 6 },
  ];
  symbolMap = {};
  angular.forEach($scope.SYMBOLS, function (s) {
    symbolMap[s.id] = s.symbol;
  });

  $scope.d = { FORCECLEAR: false };

  encodeUrlM = function (monome) {
    var url = "";
    if (monome.type == "SYMBOL") url += "#";
    else if (monome.type == 0) url += "T";
    else if (monome.type == 1) url += "R";
    else if (monome.type == 2) url += "S";
    else if (monome.type == "SPECIAL") url += "!";

    url += monome.id + "$";

    return url;
  }

  decodeUrl = function (url) {
    var q = $q.defer();
    $scope.models.displayUsers = Number(url.substr(0, 1));
    $scope.models.displayShips = Number(url.substr(1, 1));
    url = url.substr(2);

    var polynome = url.split("$");
    var query = [];
    var ps = [];



    angular.forEach(polynome, function (monome) {

      var type = "SYMBOL";
      var name = "";
      var symbol = "";
      var img = "";

      if (monome.indexOf("T") === 0) type = '0';
      else if (monome.indexOf("R") === 0) type = '1';
      else if (monome.indexOf("S") === 0) type = '2';
      else if (monome.indexOf("!") === 0) type = 'SPECIAL';

      var id = monome.substr(1);

      if (type == "SYMBOL" || type == "SPECIAL") { name = symbolMap[id]; symbol: symbolMap[id]; }
      else {
        var p = TagCommon.getName(id, type).then(function (data) { return { name: data.name, img: data.img, type: type, id: id }; });
      }
      if (p) {
        query.push(p);
        ps.push(p);
      }
      else if (id != '') query.push({ type: type, id: id, name: name, img: img, symbol: name });
    });

    $q.all(ps).then(function (test) {
      angular.forEach(query, function (m, i) {
        if (m && angular.isFunction(m.then)) {
          query[i] = test[0];
          test.splice(0, 1);
        }
      });
      $scope.models.query = query;
      return query;
    });

    return q;
  }

  $scope.refreshTags = function (tag) {
    $scope.d.FORCECLEAR = false;
    // On verifie si c'est un tag ou un symbol qu'on cherche.
    var isSymbol = false;
    angular.forEach($scope.SYMBOLS, function (symbol, i) {
      if (tag == symbol.name) {
        symbol.qId = i;
        // C'est bien un symbole, on valide direct.
        isSymbol = true;
        $scope.models.query = $scope.models.query || [];
        $scope.models.query.push(symbol);
        $scope.d.FORCECLEAR = true;
        i++;
      }
    });

    // Si c'est un tag on update la liste pour pouvoir les proposer.
    if (!isSymbol) {
      var params = { f: tag, mod: "ALL" };
      return $http.get(GLOBAL_URL_PATH_TO_JU + 'Tags/tags_search.php', { params: params })
        .then(function (response) {
          data = response.data == null ? [] : response.data;
          $scope.models.queryWrite = data;
          return response.data;
        });
    }
  };

  $scope.toggleShips = function () {
    $scope.models.displayShips = $scope.models.displayShips == 0 ? 1 : 0;
  }

  $scope.toggleUsers = function () {
    $scope.models.displayUsers = $scope.models.displayUsers == 0 ? 1 : 0;
  }

  $scope.ownerUrl = function (id) {
    return GLOBAL_URL_PATH_TO_JU + "?page=user&id=" + id;
  }

  $scope.shipUrl = function (ship) {
    return GLOBAL_URL_PATH_TO_JU + "?page=Ships#/view/" + ship.owner + "/" + ship.id;
  }

  $scope.tagUrl = function (id) {
    return GLOBAL_URL_PATH_TO_JU + "?page=Tags#/user/" + id;
  }

  var forceQuery = $scope.initQuery || $stateParams.sQuery;
  if (forceQuery) {
    decodeUrl(forceQuery);
  }


  $scope.$watch("models.query", function (query) {
    if ($scope.canEdit || forceQuery) TagCommon.sendQuery(query).then(function (data) { $scope.models.result = data; forceQuery = false; });
  });

  $scope.$watchGroup(["models.query", "models.displayUsers", "models.displayShips"], function (query, old) {
    if ($scope.canEdit) {
      var url = "";
      url += $scope.models.displayUsers;
      url += $scope.models.displayShips;

      angular.forEach(query[0], function (monome) {
        url += encodeUrlM(monome);
      });
      $scope.models.bbcode = "[JU_TAG_RECHERCHE " + url + "]";
      $state.go('Tags.search', { sQuery: url }, { notify: false, reload: false, location: 'replace', inherit: true });
    }
  });



});



Tags.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('Tags', {
      url: '/Tags',
      views: {
        'Tags@': {
          controller: 'controller.tags',
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_main.tmpl.html'
        },
        'TagIncluded@': {
          controller: 'controller.tags.owner',
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_user.tmpl.html'
        },
        'TagSingleIncluded@': {
          controller: 'controller.tags.single',
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_single.tmpl.html'
        },
        'TagsRechercheIncluded@': {
          controller: 'controller.tags.search',
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_search.tmpl.html'
        },
        'TagsTabs@': {
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_tabs.tmpl.html'
        }
      }
    }).state('Tags.single', {
      url: 'view/:cat/:tagid',
      views: {
        'Tags@': {
          controller: 'controller.tags.single',
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_single.tmpl.html'
        }
      }
    }).state('Tags.user', {
      url: 'user/:userID',
      views: {
        'Tags@': {
          controller: 'controller.tags.owner',
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_user.tmpl.html'
        }
      }
    }).state('Tags.ship', {
      url: 'ship/:shipID',
      views: {
        'Tags@': {
          controller: 'controller.tags.owner',
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_user.tmpl.html'
        }
      }
    }).state('Tags.search', {
      url: 'search/:sQuery',
      views: {
        'Tags@': {
          controller: 'controller.tags.search',
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_search.tmpl.html'
        },
        'TagsTabs@': {
          templateUrl: GLOBAL_URL_PATH_TO_JU + 'Tags/templates/tags_tabs.tmpl.html'
        }
      }
    });
});
