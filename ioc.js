'use strict';

module.exports = {
    express: require('express'),
    http: require('http'),
    io: require('socket.io'),
    q: require('q'),
    process: require('process'),

    config: require('./config'),
    WebServer: require('./lib/web/WebServer'),
    ChatServer: require('./lib/chat/ChatServer'),
    ChatClient: require('./lib/chat/ChatClient'),
    ChatRooms: require('./lib/chat/ChatRooms')
};
