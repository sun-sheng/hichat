/*@ngInject*/
module.exports = function (settings) {

  var ua = navigator.userAgent.toLowerCase();

  var device = {

    init: function () {
      var device = window.device;
      if (device) {
        this.uuid      = device.uuid;
        this.platform  = device.platform;
        this.version   = device.version;
        this.cordova   = device.cordova;
        this.model     = device.model;
      }
    },

    uuid: 'unknown_' + Math.floor(Date.now() * Math.random()),

    platform: '',

    userAgent: window.navigator.userAgent,

    openBrowser: function (url, target, options) {
      if (!this.isCordova()) {
        return false;
      }
      url    = encodeURI(url);
      target = target || '_blank';
      cordova.InAppBrowser.open(url, target, options);
    },

    keyboard: {
      isVisible: function () {
        if (!this.isCordova()) {
          return false;
        }
        return cordova.plugins.Keyboard.isVisible;
      },
      close: function () {
        if (!this.isCordova()) {
          return false;
        }
        cordova.plugins.Keyboard.close();
      }
    },

    /**
     * 在手机设备中创建联系人
     * @param contact
     * @param success
     * @param error
     */
    createContact: function (contact, success, error) {
      if (!this.isCordova()) {
        return false;
      }
      success = success || function () {
        };
      error   = error || function () {
        };
      navigator.contacts.create(contact).save(success, error);
    },
    /**
     * 在手机设备中查询联系人
     * @param query 关键字
     * @param success
     * @param error
     */
    findContacts: function (query, success, error) {
      if (!this.isCordova()) {
        return false;
      }
      var options           = new ContactFindOptions();
      options.filter        = query;
      options.multiple      = true;
      options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.phoneNumbers];
      var fields            = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.name];
      navigator.contacts.find(fields, success, error, options);
    }

  };

  if ((typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined')) device.isCordova = true;

  if (ua.indexOf('mac os') > -1) device.isMac = true;

  if (/ip(ad|hone|od)/.test(ua)) {
    device.isIos = true;
    device.type  = settings.device_type_ios;
  } else if (ua.indexOf('android') > -1) {
    device.isAndroid = true;
    device.type      = settings.device_type_android;
  } else {
    device.type = settings.device_type_unknown;
  }

  return device;

};