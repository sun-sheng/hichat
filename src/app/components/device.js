/*@ngInject*/
module.exports = function (settings) {

  var _isCordova, _isAndroid, _isIOS;

  var device = {

    init: function () {
      try {
        this.uuid      = window.device.uuid;
        this.platform  = window.device.platform;
        this.version   = window.device.version;
        this.cordova   = window.device.cordova;
        this.model     = window.device.model;
        this.userAgent = window.navigator.userAgent;

        this._stringify = JSON.stringify({
          platform: window.device.platform,
          version: window.device.version,
          cordova: window.device.cordova,
          model: window.device.model,
          userAgent: window.navigator.userAgent
        });
      }
      catch (err) {

      }
    },

    uuid: 'unknown_' + Math.floor(Date.now() * Math.random()),

    platform: '',

    isPhonegap: function () {
      if (typeof(_isCordova) === 'undefined') {
        _isCordova = (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
      }
      return _isCordova;
    },

    isCordova: function () {
      if (typeof(_isCordova) === 'undefined') {
        _isCordova = (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined');
      }
      return _isCordova;
    },

    isAndroid: function () {
      if (typeof(_isAndroid) === 'undefined') {
        _isAndroid = navigator.userAgent.indexOf('Android') > -1;
      }
      return _isAndroid;
    },

    isIOS: function () {
      if (typeof(_isIOS) === 'undefined') {
        _isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
      }
      return _isIOS;
    },

    openLink: function (url) {
      if (this.isAndroid()) {
        navigator.app.loadUrl(encodeURI(url), {
          openExternal: true
        });
      }
      else if (this.isIOS()) {
        window.open(url, '_system');
      }
      else {
        window.open(url, '_blank');
      }
    },

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

  if (device.isIOS()) {
    device.type = settings.device_type_ios;
  }
  else if (device.isAndroid()) {
    device.type = settings.device_type_android;
  }
  else {
    device.type = settings.device_type_unknown;
  }

  return device;

};