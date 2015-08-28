/*@ngInject*/
module.exports = function ($rootScope, $templateCache, $http, $q, constants, $forage, chatService, logger) {

  var KEY_USER = constants.FORAGE_KEY.CURRENT_USER;

  var f7QueryCache = {};

  var router = {

    init: function () {

      window.f7MainView = f7.addView('#main-view');

      f7.onPageInit('*', function (page) {
        try {
          if (page.from !== 'left' || ! _.isEmpty(page.query)) router.setF7pageQuery(page);
          var dom        = page.container;
          var $element   = angular.element(dom);
          var $injector  = $element.injector();
          var $compile   = $injector.get('$compile');
          var $link      = $compile($element);
          var $scope     = $element.scope().$new();
          $scope.f7page  = page;
          page.container = $link($scope);
          //$scope.$digest();
        }
        catch (e) {
          logger.error('onPageInit', e.message, e.stack);
        }
      });

      f7.onPageBeforeRemove('*', function (page) {
        try {
          var dom    = page.container;
          var $scope = angular.element(dom).scope();
          $scope.$destroy();
        }
        catch (e) {
          logger.error('onPageBeforeRemove', e.message, e.stack);
        }
      });

      $forage.get(KEY_USER).then(function (user) {
        router.afterLogin(user, true);
      }, function () {
        f7MainView.router.load({
          content: $templateCache.get('userLogin.html'),
          animatePages: false
        });
      }).finally(function () {
        $$('#entrance-screens').remove();
      });
    },

    reload: function () {
      window.location.reload();
    },

    afterLogin: function (user, first) {
      $rootScope.currentUser                             = user;
      $http.defaults.headers.common['ACCESS-TOKEN'] = user.access_token;
      chatService.init();
      if (user.is_need_verify) {
        f7MainView.router.load({
          content: $templateCache.get('userVerify.html'),
          animatePages: !first
        });
      }
      else {
        this.afterVerify(user, first);
      }
    },

    afterVerify: function (user, first) {
      $rootScope.currentUser = user;
      f7MainView.router.load({
        content: $templateCache.get('main.html'),
        animatePages: !first
      });
    },

    setF7pageQuery: function (f7page) {
      f7QueryCache[f7page.url] = f7page.query;
    },
    getF7pageQuery: function (f7page) {
      return f7QueryCache[f7page.url];
    }
  };
  return router;
};