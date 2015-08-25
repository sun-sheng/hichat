/*@ngInject*/
module.exports = function ($q, $http, $rootScope, settings, constants, userService, $forage, device) {

  return {
    checkUpdate: function () {
      return $http.post(settings.apiOrigin + 'check_version_info', {
        version: settings.version,
        device_type: device.type
      }).then(function (response) {
        return response.data;
      });
    },
    feedback: function (data) {
      data.sdk_content = device._stringify;
      return $http.post(settings.apiOrigin + 'feedback', data);
    },
    clearCache: function () {
      return $forage.clear().then(function () {
        //把用户信息再写入缓存中
        userService.storageCurrentUser($rootScope.currentUser);
        //触发事件
        $rootScope.$broadcast(constants.EVENT_NAME.CACHE_CLEAR);
      });
    }
  }

};