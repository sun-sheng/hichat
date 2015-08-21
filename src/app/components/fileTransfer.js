/*@ngInject*/
module.exports = function ($q, settings, constants, device) {

  var mineTypeDict = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png'
  };

  return {
    upload: function (uri, options) {
      if (!device.isCordova()) return $q.reject(constants.ERROR.DEVICE_NOT_SUPPORT);
      options            = options || {};
      options.server     = options.server || settings.uploadServer;
      var upOptions      = new FileUploadOptions();
      upOptions.fileKey  = 'file';
      var typeIndex      = uri.lastIndexOf('.');
      upOptions.fileName = uri.substr(uri.lastIndexOf('/') + 1, typeIndex);
      var postfix        = uri.substr(typeIndex + 1);
      //android 会在文件后面加 ?
      var queryIndex = postfix.indexOf('?');
      if (queryIndex !== -1) {
        postfix = postfix.sub(0, queryIndex);
      }
      upOptions.mimeType = mineTypeDict[postfix];
      if (!upOptions.mimeType) {
        return $q.reject(constants.ERROR.MIME_TYPE_NOT_SUPPORT);
      }
      //alert(JSON.stringify(upOptions));
      var ft = new FileTransfer();
      return $q(function (resolve, reject, notify) {
        ft.onprogress = notify;
        ft.upload(uri, encodeURI(options.server), function (result) {
          //alert(JSON.stringify(result));
          resolve(result);
        }, function () {
          reject(constants.ERORR.FILE_TRANSFER_FAILED);
        }, upOptions);
      });
    }
  };
};