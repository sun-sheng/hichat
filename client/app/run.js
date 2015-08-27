/*@ngInject*/
module.exports = function ($q, $rootScope, i18n, settings, constants, router, device, logger, toast, $forage, backButton) {

  function deviceReady() {
    device.init();
    backButton.init();
    router.init();
  }

  $rootScope.ui = {
    activeTabIndex: 0,
    unreadMessagesCount: 0
  };

  //
  $rootScope.settings = settings;

  $rootScope.$on(constants.EVENT_NAME.USER_INVALID, function () {
    toast.error('用户认证失败，即将重新登录');
    var time = Date.now() + 2000;
    $forage.remove(constants.FORAGE_KEY.CURRENT_USER).then(function () {
      var timeout = time - Date.now();
      timeout     = timeout > 0 ? timeout : 0;
      setTimeout(function () {
        router.reload();
      }, timeout);
    });
  });

  /**
   *
   */
  window.f7 = new Framework7({
    externalLinks: '.' + settings.f7externalClass,
    fastClicksDistanceThreshold: 15,
    //ios 可能有 bug
    swipeBackPage: true,
    pushState: false,
    popupCloseByOutside: false,
    modalTitle: i18n.global.modal_title,
    modalButtonOk: i18n.global.ok,
    modalButtonCancel: i18n.global.cancel,
    modalPreloaderTitle: i18n.global.loading
  });

  f7.onPageBeforeAnimation('*', function () {
    //键盘输入
    $$('input:focus').blur();
  });

  var WindowInnerWidth  = window.innerWidth;
  var WindowInnerHeight = window.innerHeight;

  window.addEventListener('resize', function () {
    var width  = window.innerWidth;
    var height = window.innerHeight;
    if (width >= WindowInnerHeight && height <= WindowInnerWidth) {
      $rootScope.$broadcast('landscape');
    }
    else if (width === WindowInnerWidth && height === WindowInnerHeight) {
      $rootScope.$broadcast('portrait');
    }
  }, false);

  if (device.isCordova) {
    //
    window.shouldRotateToOrientation = function () {
      return true;
    };
    //
    document.addEventListener("deviceready", deviceReady, false);
    //
    document.addEventListener("backbutton", function () {
      $rootScope.$broadcast('back');
    }, false);
    //
    document.addEventListener('resume', function () {
      $rootScope.$broadcast('resume');
    }, false);
    //
    document.addEventListener('pause', function () {
      $rootScope.$broadcast('pause');
    }, false);
  }
  else {
    deviceReady();
  }

};
