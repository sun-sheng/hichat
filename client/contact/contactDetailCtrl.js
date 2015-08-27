/*@ngInject*/
module.exports = function ($rootScope, $scope, router, modal) {

  var contact = router.getF7pageQuery($scope.f7page);

  contact.bg_image = 'assets/images/cbg-' + _.random(1, 4) + '.jpg';
  $scope.isContact = _.some($rootScope.currentUser.contact_ids, function (id) {
    return id === contact.id;
  });

  $scope.contact = contact;
  var actions    = [
    {text: '<a class="external actions-link" href="tel:' + contact.mobile + '">拨打电话</a>'},
    {text: '<a class="external actions-link" href="sms:' + contact.mobile + '">发送信息</a>'}
  ];

  $scope.showActionSheet = function () {
    if (!contact.mobile) return false;
    modal.showActions(actions);
  };

};