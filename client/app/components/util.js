/*@ngInject*/
module.exports = function () {

  var ONE_DAY_TIME = 24 * 60 * 60 * 1000;

  return {

    bindEvents: function (bindings) {
      bindings.forEach(function (binding) {
        if (binding.selector) {
          $$(binding.element).on(binding.event, binding.selector, binding.handler);
        }
        else {
          $$(binding.element).on(binding.event, binding.handler);
        }
      });
    },

    unbindEvents: function (bindings) {
      bindings.forEach(function (binding) {
        if (binding.selector) {
          $$(binding.element).off(binding.event, binding.selector, binding.handler);
        }
        else {
          $$(binding.element).off(binding.event, binding.handler);
        }
      });
    },

    replace: function (str, arr) {
      if (angular.isString(arr)) return str.replace(/\$1/g, arr);
      _.each(arr, function (item, index) {
        index ++;
        str = str.replace(new RegExp('\\$' + index, 'g'), item);
      });
      return str;
    },

    eachRight: function (array, cb) {
      var l = array.length;
      while (l--) {
        cb(array[l], l);
      }
    },
    /**
     * 格式化 timestamp
     * @param time {timestamp}
     * @param startOfToadyTime {timestamp}
     * @param formats {Array}
     */
    fromNow: function (time, startOfToadyTime, formats) {
      var text = '';
      if (!time) {
        return text;
      }
      if (!startOfToadyTime) {
        startOfToadyTime = moment().startOf('day').valueOf();
      }
      formats   = formats || ['a H:mm', '昨天 H:mm', '前天 H:mm', 'M月D日 H:mm'];
      var mom   = moment(time);
      var time1 = startOfToadyTime - ONE_DAY_TIME;
      var time2 = time1 - ONE_DAY_TIME;
      if (time > startOfToadyTime) {
        text = mom.format(formats[0]);
      }
      else if (time > time1) {
        text = mom.format(formats[1]);
      }
      else if (time > time2) {
        text = mom.format(formats[2]);
      }
      else {
        text = mom.format(formats[3]);
      }
      return text;
    }

  };

};