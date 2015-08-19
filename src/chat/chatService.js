/*@ngInject*/
module.exports = function ($rootScope, $http, $forage, settings, constants)
{
    function getChatMessagesKey (chat_id)
    {
        return constants.FORAGE_KEY.CHAT_MESSAGES_PREFIX + chat_id + constants.FORAGE_KEY.CHAT_MESSAGES_POSTFIX;
    }

    var KEY_CHATS = constants.FORAGE_KEY.CHATS;

    var socket = io(settings.socketChatUrl);

    socket.on('message', function (result)
    {
        var forage_key = getChatMessagesKey(result.chat_id);
        $forage.get(forage_key).then(function (dialogues)
        {
            dialogues.push(result);
            return dialogues;
        }, function ()
        {
            return [result];
        }).then(function (dialogues)
        {
            $forage.set(forage_key, dialogues);
        });
    });
    socket.on('messages', function (results)
    {
        var forage_key = getChatMessagesKey(results[0].chat_id);
        $forage.get(forage_key).then(function (dialogues)
        {
            _.each(results, function (item)
            {
                dialogues.push(item);
            });
            return dialogues;
        }, function ()
        {
            return results;
        }).then(function (dialogues)
        {
            $forage.set(forage_key, dialogues);
        });
    });

    return {

        fetch: function ()
        {
            return $forage.get(KEY_CHATS).catch(function ()
            {
                return $http.get(settings.apiOrigin + 'chats', function (response)
                {
                    var chats = response.data;
                    _.each(chats, function (chat)
                    {
                        //todo 数据结构
                        var unread_messages = chat.unread_messages;
                        var key = getChatMessagesKey(chat.id);
                        $forage.get(key).then(function (results)
                        {
                            _.each(unread_messages, function (item)
                            {
                                results.push(item);
                            });
                            return results;
                        }, function ()
                        {
                            return unread_messages;
                        }).then(function (messages)
                        {
                            $forage.set(key, messages);
                        });
                    });
                    return $forage.set(KEY_CHATS, chats);
                });
            });
        },

        create: function ()
        {

        },

        remove: function ()
        {

        },

        addUser: function ()
        {

        },

        removeUser: function ()
        {

        },

        getMessages: function (chat_id)
        {
            return $forage.get(getChatMessagesKey(chat_id));
        },

        sendMessage: function (data)
        {
            socket.emit('message', data);
        }

    };
};