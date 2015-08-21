/*@ngInject*/
module.exports = function ($rootScope, $templateCache, $http, $q, constants, $forage, chatService) {

  var KEY_USER = constants.FORAGE_KEY.CURRENT_USER;

  var router = {

    start: function () {
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
      $http.defaults.headers.common['HTTP_ACCESS_TOKEN'] = user.access_token;
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
    }
  };
  return router;
};