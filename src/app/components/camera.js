/*@ngInject*/
module.exports = function ($q, device, modal) {
  var DefaultCameraOptions = {
    // 图片质量 0 - 100
    quality: 100,
    // 0 Return image as base64-encoded string
    // 1 Return image file URI
    // 2 Return image native URI (e.g., assets-library:// on iOS or content:// on Android)
    destinationType: 1,
    // 0 PHOTO LIBRARY
    // 1 CAMERA
    // 2 SAVED PHOTO ALBUM
    sourceType: 1,
    // 0 JPEG
    // 1 PNG
    encodingType: 0,
    // 0 BACK 后置摄像头
    // 1 FRONT 前置摄像头
    cameraDirection: 0,
    // 是否允许编辑
    allowEdit: false,
    //
    targetWidth: 720,
    //
    targetHeight: 960,
    //
    saveToPhotoAlbum: false
  };
  var camera               = {
    error: {
      cancelled: {
        code: 'Camera cancelled',
        msg: '用户取消'
      },
      not_support: {
        code: 'Camera not support',
        msg: '系统不支持'
      }
    },
    getPicture: function (options) {
      var defer = $q.defer();
      if (!device.isCordova()) {
        defer.reject(this.error.not_support);
        return defer.promise;
      }
      var cameraOptions = angular.extend({}, DefaultCameraOptions, options);
      navigator.camera.getPicture(function (data) {
        defer.resolve(data);
      }, function (message) {
        defer.reject({
          code: message,
          msg: message
        });
      }, cameraOptions);
      return defer.promise;
    },
    /**
     *
     * @param actions 参考 framework7 actions 方法 ，添加了 cameraOptions 属性进行单独的设置
     * @param options actionOptions 定义 actions 的一些配置
     * @param defaultCameraOptions 定义 公共的 camera 配置
     */
    showActions: function (actions, options, defaultCameraOptions) {
      if (!device.isCordova()) return false;
      var actionGroups = [
        [
          {
            text: options.title || '选取照片',
            label: true
          }
        ],
        [
          {
            text: options.cancelText || '取消',
            color: options.cancelColor || 'red'
          }
        ]
      ];
      _.each(actions, function (item, index) {
        var success       = item.success || options.success || function () {
          };
        var error         = item.error || options.error || function () {
          };
        var text          = item.text || ('操作' + index);
        var cameraOptions = angular.extend({}, item.cameraOptions, defaultCameraOptions);
        actionGroups[0].push({
          text: text,
          onClick: function () {
            camera.getPicture(cameraOptions).then(function (data) {
              success(data);
            }, function (err) {
              error(err);
            });
          }
        });
      });
      modal.f7actions(actionGroups);
    }
  };
  return camera;
};