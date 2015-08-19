var faker = require('faker');
faker.locale = 'zh_CN';
var _ = require('lodash');

var data = {};

_.times(5, function (index) {
    data[index] = {
        id: index,
        name: faker.company.bsBuzz(),
        city_id: 12,
        city_name: faker.address.city(),
        zhanying_id: 'wer',
        zhanying_name: faker.company.bsBuzz()
    }
});

module.exports = data;