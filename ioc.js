'use strict';

const ChatRoomsService = require('./lib/services/ChatRoomsService'),
  NicknamesService = require('./lib/services/NicknamesService'),
  UsersService = require('./lib/services/UsersService');

let ioc = {
    express: require('express'),
    http: require('http'),
    io: require('socket.io'),
    q: require('q'),
    process: require('process'),
    crypto: require('crypto'),
    mongoose: require('mongoose'),
    FindOrCreate: require('mongoose-findorcreate'),

    config: require('./config'),
    WebServer: require('./lib/web/WebServer'),
    ChatServer: require('./lib/chat/ChatServer'),
    ChatClient: require('./lib/chat/ChatClient'),
    UserRepository: require('./lib/db/UserRepository'),
    Database: require('./lib/db/Database')
};

// Singletons
//
ioc.UserModel = require('./lib/db/models/UserModel')(ioc);
ioc.chatRoomsService = new ChatRoomsService();
ioc.nicknamesService = new NicknamesService();
ioc.usersService = new UsersService(ioc);

module.exports = ioc;
