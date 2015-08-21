/*@ngInject*/
module.exports = function ($httpProvider, $forageProvider) {

  $forageProvider.config({
    transformError: function (err) {
      err.msg = err.massege;
      return err;
    }
  });

  $httpProvider.defaults.headers.common['HTTP_SIGNATURE'] = 'not_implemented';

  var intercept = [
    '$q',
    '$rootScope',
    'constants',
    function ($q, $rootScope, constants) {
      return {
        request: function (config) {
          config.headers['HTTP_TIMESTAMP'] = Date.now();
          return config;
        },
        responseError: function (rejection) {
          var err = {
            code: rejection.status,
            msg: rejection.data || '服务端异常'
          };
          if (err.code === 401) $rootScope.$broadcast(constants.EVENT_NAME.USER_INVALID);
          return $q.reject(err);
        }
      };
    }
  ];
  $httpProvider.interceptors.push(intercept);
};
