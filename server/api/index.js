var express    = require('express');
var router     = express.Router();
var users      = require('./users');
var chats      = require('./chats');
var messages   = require('./messages');
var contacts   = require('./contacts');
var middleware = require('./middleware');

router.get('/chats', middleware.auth, chats.find);
router.post('/chats', middleware.auth, chats.create);
router.put('/chats/:chat_id', middleware.auth, chats.update);
router.delete('/chats/:chat_id', middleware.auth, chats.remove);
//router.post('/chats/:chat_id/users', middleware.auth, chats.addUsers);
//router.delete('/chats/:chat_id/users', middleware.auth, chats.removeUsers);

router.get('/messages', middleware.auth, messages.find);
router.post('/messages', middleware.auth, messages.create);
router.delete('/messages/:message_id', middleware.auth, messages.remove);

router.post('/users', users.create);
router.post('/users/login', users.login);
router.post('/users/logout', middleware.auth, users.logout);

router.get('/contacts', middleware.auth, contacts.find);

module.exports = router;