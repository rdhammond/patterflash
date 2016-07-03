'use strict';

class ChatServer {
  constructor(ioc, webServer) {
    this.ChatClient = ioc.ChatClient;
    this.q = ioc.q;
    this.io = ioc.io(webServer.server);
    this.clients = new Set();
    this.rooms = new ioc.ChatRooms();
  }

  start() {
    return this.q.fcall(() => {
      this.io.on('connection', this.onConnection.bind(this));
    });
  }

  onConnection(socket) {
    let client = new this.ChatClient(socket, this.rooms);
    client.on('join', this.onJoin.bind(this));
    client.on('chat', this.onChat.bind(this));
    client.on('action', this.onAction.bind(this));
    client.on('leave', this.onLeave.bind(this));
    client.on('disconnect', this.onDisconnect.bind(this));
    this.clients.add(client);
  }

  onJoin(nickname, room) {
    if (this.rooms.add(nickname, room))
      this.io.emit('addRoom', room);

    this.io.to(room).emit('room', `${nickname} has joined ${room}.`);
  }

  onChat(nickname, room, text) {
    this.io.to(room).emit('chat', { nickname, text });
  }

  onAction(nickname, room, text) {
    this.io.to(room).emit('action', { nickname, text });
  }

  onLeave(nickname, room) {
    if (this.rooms.remove(nickname, room))
      this.io.emit('removeRoom', room);

    this.io.to(room).emit('room', `${nickname} has left ${room}.`);
  }

  onDisconnect(client) {
    this.clients.delete(client);
  }
}

module.exports = ChatServer;
