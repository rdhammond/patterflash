'use strict';

const EventEmitter = require('events');

// ** TODO: Chat Logging
class ChatClient extends EventEmitter {
  constructor(ioc, socket, chatRooms) {
    super();
    this.users = new ioc.UserRepository(ioc);
    this.LoginError = ioc.LoginError;
    this.socket = socket;
    this.chatRooms = chatRooms;
    this.socket.on('login', this.onLogin.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
  }

  onLogin(username, password, callback) {
    return this.users.getByUsername(username)
      .then((user) => { this.checkLogin(user, password); })
      .then(() => { this.logIn(username); })
      .then(() => { callback(null, this.chatRooms.get()); })
      .catch((e) => {
        callback(e instanceof this.LoginError ? e : new Error('Internal Error'));
      });
  }

  checkLogin(user, password) {
    if (user.passwordMatches(password))
      throw new this.LoginError();
  }

  logIn(username) {
    this.nickname = username;
    this.socket.on('join', this.onJoin.bind(this));
    this.socket.on('chat', this.onChat.bind(this));
    this.socket.on('action', this.onAction.bind(this));
    this.socket.on('leave', this.onLeave.bind(this));
  }

  onJoin(room, callback) {
    if (this.room)
      onLeave(function() {});

    this.room = room;
    this.socket.join(room);
    this.emit('join', this.nickname, room);
    callback();
  }

  onChat(text, callback) {
    if (!this.room)
      return this.sendNeedsJoinError(callback);

    this.emit('chat', this.nickname, this.room, text);
    callback();
  }

  onAction(text, callback) {
    if (!this.room)
      return this.sendNeedsJoinError(callback);

    this.emit('action', this.nickname, this.room, text);
    callback();
  }

  onLeave(callback) {
    if (!this.room)
      return callback();

    this.emit('leave', this.nickname, this.room);
    this.socket.leave(this.room);
    delete this.room;
    callback();
  }

  onDisconnect(callback) {
    this.emit('leave', this.nickname, this.room);
    this.emit('disconnect', this);
  }

  sendNeedsJoinError(callback) {
    this.socket.emit('err', 'Please join a room first.');
    callback();
  }
}

module.exports = ChatClient;
