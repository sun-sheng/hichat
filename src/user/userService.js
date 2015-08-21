/*@ngInject*/
module.exports = function ($q, $http, constants, settings, $forage, device) {
  var KEY_USER = constants.FORAGE_KEY.CURRENT_USER;

  var service = {

    currentUser: function () {
      return $forage.get(KEY_USER);
    },

    forageCurrentUser: function (user) {
      var expired_time = user.expired_time;
      return $forage.set(KEY_USER, user, expired_time);
    },

    login: function (data) {
      data.device_id      = device.uuid;
      data.device_type    = device.type;
      data.client_version = settings.version;
      return $http.post(settings.apiOrigin + 'users/login', data).then(function (response) {
        var data            = response.data;
        var user            = data.user;
        user.is_need_verify = data.is_need_verify;
        user.expired_time   = data.expired_time;
        user.access_token   = data.token;
        //todo
        return $forage.clear().then(function () {
          return service.forageCurrentUser(user);
        });
      });
    },
    logout: function () {
      return $http.post(settings.apiOrigin + 'users/logout').then(function () {
        return $forage.remove(KEY_USER);
      });
    }
  };

  return service;
};