'use strict';

const EventEmitter = require('events');

class ChatClient extends EventEmitter {
  constructor(ioc, socket) {
    super();
    this.users = ioc.usersService;
    this.rooms = ioc.chatRoomsService;
    this.email = ioc.emailService;
    this.chatLogs = ioc.chatLogsService;
    this.socket = this.startSocket(socket);
  }

  startSocket(socket) {
    socket.on('login', this.onLogin.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
    return socket;
  }

  onJoin(room, callback) {
    if (this.room)
      this.onLeave(() => {});

    this.room = room;
    this.socket.join(room);
    this.emit('joined', this.nickname, room);
    callback();
  }

  onChat(text, callback) {
    if (!this.room)
      return callback('Please join a room first.');

    this.chatLogs.add(this.userId, this.room, text)
      .then(() => {
        this.emit('chat', this.userId, this.nickname, this.room, text);
        callback();
      })
      .catch((e) => { callback(e.message) });
  }

  onAction(text, callback) {
    if (!this.room)
      return callback('Please join a room first.');

    let textWithNickname = `${this.nickname} ${text}`;

    this.chatLogs.add(this.userId, this.room, textWithNickname)
      .then(() => {
        this.emit('action', this.userId, this.nickname, this.room, text);
        callback();
      })
      .catch((e) => { callback(e.message); });
  }

  onLeave(callback) {
    if (!this.room)
      return callback();

    this.emit('left', this.userId, this.nickname, this.room);
    this.socket.leave(this.room);
    delete this.room;
    callback();
  }

  onLogin(email, password, nickname, callback) {
    return this.users.login(email, password, nickname)
      .then((user) => {
        this.userId = user._id;
        this.email = user.email;
        this.nickname = nickname;
        this.socket.on('join', this.onJoin.bind(this));
        this.socket.on('chat', this.onChat.bind(this));
        this.socket.on('action', this.onAction.bind(this));
        this.socket.on('leave', this.onLeave.bind(this));
        callback(null, this.rooms.get());
      })
      .catch((e) => { callback(e.message); });
  }

  onDisconnect(callback) {
    this.users.logout(this.email, this.nickname);
    this.emit('left', this.nickname, this.room);
    this.emit('disconnect', this);
  }
}

module.exports = ChatClient;
