'use strict';

const EventEmitter = require('events');

class ChatClient extends EventEmitter {
  constructor(socket) {
    super();
    this.socket = socket;
    this.socket.on('login', this.onLogin.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
  }

  // ** TODO: Passwords
  onLogin(nickname, callback) {
    this.nickname = nickname;
    this.socket.on('chat', this.onChat.bind(this));
    this.socket.on('action', this.onAction.bind(this));
    callback();
  }

  // ** TODO: logging
  onChat(text, callback) {
    this.emit('chat', this.nickname, text);
    callback();
  }

  // ** TODO: Logging
  onAction(text, callback) {
    this.emit('action', this.nickname, text);
    callback();
  }

  onDisconnect(callback) {
    this.emit('disconnect', this);
  }
}

module.exports = ChatClient;
