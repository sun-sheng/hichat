module.exports = function ($q, $scope, $rootScope, userService, camera, fileTransfer, device, modal, toast) {
  var loading = false;

  if (!device.isCordova()) {
    $scope.showAvatarForm = true;
  }
  //todo 魅族note 从相册选取时，不能编辑
  $scope.showAvatarActions = function () {
    if (!device.isCordova()) return false;
    camera.showActions(
      [{
        text: '拍照',
        cameraOptions: {sourceType: 1}
      }, {
        text: '相册',
        cameraOptions: {sourceType: 0}
      }],
      {
        title: '选择照片',
        success: function (uri) {
          changeAvatar(uri);
        },
        error: function (err) {
          toast.error('图片选取失败：' + err.msg);
        }
      },
      {
        cameraDirection: 1,
        allowEdit: true,
        targetWidth: 400,
        targetHeight: 400
      }
    )
  };

  $scope.previewAvatar = function () {
    if (!$rootScope.currentUser.avatar) return false;
    var browser = modal.createPhotoBrowser({
      theme: 'dark',
      photos: [$rootScope.currentUser.avatar]
    });
    browser.open();
  };

  function changeAvatar(uri) {
    if (loading) {
      return false;
    }
    loading = true;
    modal.showIndicator();
    fileTransfer.upload(uri).then(function () {
      toast.success('头像修改成功');
      $rootScope.currentUser.avatar = uri;
      userService.storageCurrentUser($rootScope.currentUser);
    }, function (err) {
      toast.error(err.msg);
    }, function (progress) {
      //todo progress
      toast.success(progress.loaded + '/' + progress.total);
    }).finally(function () {
      loading = false;
      modal.hideIndicator();
    });
  }
};