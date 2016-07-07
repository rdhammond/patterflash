'use strict';

const ChatRoomsService = require('./lib/chat/ChatRoomsService'),
  NicknamesService = require('./lib/chat/NicknamesService'),
  UsersService = require('./lib/UsersService'),
  EmailService = require('./lib/email/EmailService');

let ioc = {
    express: require('express'),
    http: require('http'),
    io: require('socket.io'),
    q: require('q'),
    process: require('process'),
    crypto: require('crypto'),
    mongoose: require('mongoose'),
    FindOrCreate: require('mongoose-findorcreate'),
    nodemailer: require('nodemailer'),
    htmlToText: require('nodemailer-html-to-text').htmlToText,
    uuid: require('uuid'),

    config: require('./config'),
    WebServer: require('./lib/web/WebServer'),
    ChatServer: require('./lib/chat/ChatServer'),
    ChatClient: require('./lib/chat/ChatClient'),
    UserRepository: require('./lib/db/UserRepository'),
    Database: require('./lib/db/Database'),

};

// Singletons
//
ioc.emailTemplates = {
  confirmation: require('./lib/email/templates/confirmation')
};

ioc.UserModel = require('./lib/db/models/UserModel')(ioc);
ioc.chatRoomsService = new ChatRoomsService();
ioc.nicknamesService = new NicknamesService();
ioc.usersService = new UsersService(ioc);
ioc.emailService = new EmailService(ioc);

module.exports = ioc;
