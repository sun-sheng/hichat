var _ = require('lodash');
var faker = require('faker');
var User = require("../services/User");

module.exports = function (app)
{
    app.get('/contacts', function (req, res)
    {
        var count = faker.random.number({min: 50, max: 120});
        var results = _.times(count, User.fake);
        res.json(results);
    });
};