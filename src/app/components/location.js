/*@ngInject*/
module.exports = function ($q, $http, settings, device) {

  function get_position_form_baidu_sdk() {
    var noop  = function () {
    };
    var defer = $q.defer();
    window.plugins.locationService.getCurrentPosition(function (position) {
      //
      //alert(JSON.stringify(position));
      defer.resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        address: position.addr
      });
      window.plugins.locationService.stop(noop, noop);
    }, function () {
      defer.reject({code: 'geolocation_001', msg: '获取地理位置失败'});
      window.plugins.locationService.stop(noop, noop);
    });
    return defer.promise;
  }

  return {
    /**
     * 返回百度格式的位置信息
     * @param options
     * @returns position
     * position.latitude   bd09ll lat
     * position.longitude  bd09ll lng
     * position.address    baidu formatted_address
     */
    getBaiduPosition: function (options) {
      if (device.isAndroid()) {
        return get_position_form_baidu_sdk();
      }
      return this.getCurrentPosition(options).then(function (position) {
        var location = position.coords.latitude + ',' + position.coords.longitude;
        return $http.get('http://api.map.baidu.com/geocoder/v2/?ak=' + settings.baidu_map_ak, {
          params: {
            coordtype: 'wgs84ll',
            output: 'json',
            location: location
          }
        }).then(function (response) {
          var data = response.data;
          if (data.status !== 0) {
            return $q.reject({
              code: data.status,
              msg: '解析地理位置失败'
            });
          }
          return {
            latitude: data.result.location.lat,
            longitude: data.result.location.lng,
            address: data.result.formatted_address
          };
        });
      });
    },
    getCurrentPosition: function (options) {

      options = angular.extend({
        timeout: 15 * 1000,
        enableHighAccuracy: true
      }, options);

      var defer = $q.defer();
      navigator.geolocation.getCurrentPosition(defer.resolve, function () {
        defer.reject({code: 'geolocation_001', msg: '获取地理位置失败'});
      }, options);
      return defer.promise;
    },
    watchPosition: function (options) {
      options                  = angular.extend({
        timeout: 15 * 1000,
        enableHighAccuracy: true
      }, options);
      var defer                = $q.defer();
      defer.promise.watchID    = navigator.geolocation.watchPosition(defer.notify, function () {
        defer.reject({code: 'geolocation_001', msg: '获取地理位置失败'});
      }, options);
      defer.promise.clearWatch = navigator.geolocation.clearWatch(defer.promise.watchID);
      return defer.promise;
    },
    clearWatch: function (arg) {
      if (arg.watchID) {
        navigator.geolocation.clearWatch(arg.watchID);
      }
      else {
        navigator.geolocation.clearWatch(arg);
      }
    }
  };
};