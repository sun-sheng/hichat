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
  settings.apiOrigin = 'http://127.0.0.1:5001/api/';
  settings.chatSocket = 'http://127.0.0.1:5001/';
}
else if (window.APP_MODEL === 'TEST') {
  settings.apiOrigin = 'http://192.168.1.103:5001/api/';
  settings.chatSocket = 'http://192.168.1.103:5001/';
}
else if (window.APP_MODEL === 'DIST') {
  settings.apiOrigin = 'http://hichat.duapp.com/api/';
  settings.chatSocket = 'http://hichat.duapp.com/';
}

module.exports = settings;
