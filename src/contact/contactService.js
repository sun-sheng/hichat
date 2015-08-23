/*@ngInject*/
module.exports = function ($q, $http, settings, constants, $forage) {

  var KEY_CONTACTS = constants.FORAGE_KEY.CONTACTS;

  return {

    get: function (id) {
      this.load().then(function (contacts) {
        var result = _.find(contacts, {id: id});
        if (!result) return $q.reject({code: 'contact_get_failed', msg: '获取联系人数据异常'});
        return result;
      });
    },

    load: function () {
      return $forage.get(KEY_CONTACTS).catch(function () {
        return $http.get(settings.apiOrigin + 'contacts').then(function (response) {
          var contacts = response.data;
          return $forage.set(KEY_CONTACTS, contacts);
        });
      });
    },

    reload: function () {
      return $forage.remove(KEY_CONTACTS).then(this.load);
    },

    search: function (keywords) {
      this.load().then(function (contacts) {
        keywords    = keywords.trim().replace(/\s+/, ' ').split(' ');
        var results = [];
        _.each(contacts, function (contact) {
          var valid = _.all(keywords, function (word) {
            return contact.pinyin_name.indexOf(word) > -1 || contact.name.indexOf(word) > -1
          });
          if (valid) results.push(contact);
        });
        return results;
      });
    }

  };
};