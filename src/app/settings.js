var settings = {
  version: '1.0.0',
  f7externalClass: 'external',
  page_size: 20,
  page_size_sm: 10,
  page_size_xs: 8,
  //baidu sdk
  baidu_map_ak: 'zlbXNBDjE5Z4wV7gg0Qw5n6F',
  user_email_postfix: '@demo.com',

  device_type_ios: 1,
  device_type_android: 2,
  device_type_unknown: 0,
  checkin_cooldown_seconds: 90,
  get_verify_code_cooldown_seconds: 60,

  defaultAvatar: 'assets/images/avatar.png',

  //-------------for dev
  //本地 server
  apiOrigin: 'http://127.0.0.1:7001/',
  chatSocket: 'http://127.0.0.1:7001/socket'
  //apiOrigin : 'http://coffee-eve.ele.me/coffee-eve-svr/'
  //开发环境 server
  //apiOrigin: 'http://172.16.10.27:8087/coffee-eve-svr/'
  //某后台开发员 server
  //apiOrigin: 'http://172.16.24.194:8080/coffee-eve-svr/'
};
if (window.APP_MODEL === 'DEV') {
  //todo 修改本机 IP 方便手机测试
  settings.apiOrigin = 'http://10.97.192.140:7001/';
}
if (window.APP_MODEL === 'TEST') {
  settings.apiOrigin = '';
}
else if (window.APP_MODEL === 'DIST') {
  settings.apiOrigin = '';
}

module.exports = settings;
