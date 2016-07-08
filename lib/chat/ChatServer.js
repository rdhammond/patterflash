'use strict';

class ChatServer {
  constructor(ioc, webServer) {
    this.ioc = ioc;
    this.ChatClient = ioc.ChatClient;
    this.q = ioc.q;
    this.io = ioc.io(webServer.server);
    this.rooms = ioc.chatRoomsService;
    this.chatLogs = ioc.chatLogsService;
    this.clients = new Set();
  }

  start() {
    return this.q.fcall(() => {
      this.io.on('connection', this.onConnection.bind(this));
    });
  }

  onConnection(socket) {
    let client = new this.ChatClient(this.ioc, socket);
    client.on('joined', this.onJoined.bind(this));
    client.on('chat', this.onChat.bind(this));
    client.on('action', this.onAction.bind(this));
    client.on('left', this.onLeft.bind(this));
    client.on('disconnect', this.onDisconnect.bind(this));
    this.clients.add(client);
  }

  onJoined(nickname, room) {
    if (this.rooms.add(nickname, room))
      this.io.emit('roomList', this.rooms.get());

    this.io.to(room).emit('room', `${nickname} has joined ${room}.`);
  }

  // ** TODO: What to do if we get an error here? Do we log before even
  // sending to server?
  onChat(userId, nickname, room, text) {
    return this.chatLogs.add(userId, room, text)
      .then(() => { this.io.to(room).emit('chat', { nickname, text }); });
  }

  onAction(userId, nickname, room, text) {
    return this.chatLogs.add(userId, room, text)
      .then(() => { this.io.to(room).emit('action', { nickname, text }); });
  }

  onLeft(nickname, room) {
    if (this.rooms.remove(nickname, room))
      this.io.emit('roomList', this.rooms.get());

    this.io.to(room).emit('room', `${nickname} has left ${room}.`);
  }

  onDisconnect(client) {
    this.clients.delete(client);
  }
}

module.exports = ChatServer;
