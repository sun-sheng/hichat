/*@ngInject*/
module.exports = function ($q, $rootScope, i18n, settings, constants, router, device, logger, toast, $forage, backButton) {

  function deviceReady() {
    device.init();
    backButton.init();
    router.start();
  }

  $rootScope.ui = {
    activeTabIndex: 0
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

  window.f7MainView = f7.addView('#main-view');

  f7.onPageInit('*', function (page) {
    try {
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
    //reload 时不触发 before remove ，移至 before animation
    //$$('input:focus').blur();
    try {
      var dom    = page.container;
      var $scope = angular.element(dom).scope();
      $scope.$destroy();
    }
    catch (e) {
      logger.error('onPageBeforeRemove', e.message, e.stack);
    }
  });

  f7.onPageBeforeAnimation('*', function (page) {
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
