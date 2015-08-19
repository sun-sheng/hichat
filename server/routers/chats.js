var _ = require('lodash');
var faker = require('faker');
var User = require("../services/User");

module.exports = function (app)
{
    app.get('/chats', function (req, res)
    {
        var count = faker.random.number({min: 3, max: 10});
        var results = _.times(count, function ()
        {
            //user_ids: []
            //type:
            //unread_messages: []
            //return chat;
        });
        res.json(results);
    });
};