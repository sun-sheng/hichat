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

  defaultAvatar: 'assets/images/avatar.png'
};
if (window.APP_MODEL === 'DEV') {
  //todo 修改本机 IP 方便手机测试
  settings.apiOrigin = 'http://127.0.0.1:5001/api/';
  settings.chatSocket = 'http://127.0.0.1:5001/socket';
}
else if (window.APP_MODEL === 'TEST') {
  settings.apiOrigin = 'http://10.97.192.140:5001/api/';
  settings.chatSocket = 'http://10.97.192.140:5001/socket';
}
else if (window.APP_MODEL === 'DIST') {
  settings.apiOrigin = 'http://10.97.192.140:5001/api/';
  settings.chatSocket = 'http://10.97.192.140:5001/socket';
}

module.exports = settings;
