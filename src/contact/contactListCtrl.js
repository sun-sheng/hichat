/*@ngInject*/
module.exports = function ($scope, settings, constants, contactService, modal, toast) {
  var loading = false;

  var data    = {
    results: [],
    keyword: '',
    limitTo: settings.page_size
  };
  $scope.data = data;

  $scope.load = function (showIndicator) {
    if (loading) return false;
    loading = true;
    if (showIndicator) modal.showIndicator();
    return contactService.load().then(function (results) {
      data.results = results;
    }, function () {
      toast.error('获取联系人失败');
    }).finally(function () {
      loading = false;
      if (showIndicator) modal.hideIndicator();
    });
  };

  $scope.reload = function () {
    if (loading) return false;
    loading = true;
    return contactService.reload().then(function (results) {
      data.limitTo = settings.page_size;
      data.results = results;
    }, function () {
      toast.error('刷新联系人失败');
    }).finally(function () {
      loading = false;
    });
  };

  $scope.clearSearch = function () {
    data.keyword = '';
    data.limitTo = settings.page_size;
    $scope.$digest();
  };

  $scope.nextPage = function () {
    var limitTo = data.limitTo;
    if (loading || limitTo >= data.results.length) return false;
    limitTo += settings.page_size;
    data.limitTo = limitTo < data.results.length ? limitTo : data.results.length;
    $scope.$digest();
  };

  $scope.load();
};