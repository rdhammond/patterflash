'use strict';

const EventEmitter = require('events');

// ** TODO: Chat Logging
class ChatClient extends EventEmitter {
  constructor(socket, chatRooms) {
    super();
    this.socket = socket;
    this.chatRooms = chatRooms;
    this.socket.on('login', this.onLogin.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
  }

  // ** TODO: Passwords
  onLogin(nickname, callback) {
    this.nickname = nickname;
    this.socket.on('join', this.onJoin.bind(this));
    this.socket.on('chat', this.onChat.bind(this));
    this.socket.on('action', this.onAction.bind(this));
    this.socket.on('leave', this.onLeave.bind(this));

    callback(this.chatRooms.get());
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
