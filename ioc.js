'use strict';

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
    ChatRooms: require('./lib/chat/ChatRooms'),
    UserRepository: require('./lib/db/UserRepository'),
    Database: require('./lib/db/Database'),
    LoginError: require('./lib/db/LoginError')
};

ioc.UserModel = require('./lib/db/models/UserModel')(ioc);

module.exports = ioc;
