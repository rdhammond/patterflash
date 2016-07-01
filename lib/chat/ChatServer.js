'use strict';

class ChatServer {
  constructor(ioc, webServer) {
    this.ChatClient = ioc.ChatClient;
    this.q = ioc.q;
    this.io = ioc.io(webServer.server);
    this.clients = new Set();
  }

  start() {
    this.io.on('connection', this.onConnection.bind(this));

    var deferred = this.q.defer();
    deferred.resolve();
    return deferred.promise;
  }

  onConnection(socket) {
    let client = new this.ChatClient(socket);
    client.on('chat', this.onChat.bind(this));
    client.on('action', this.onAction.bind(this));
    client.on('disconnect', this.onDisconnect.bind(this));
    this.clients.add(client);
  }

  // ** TODO: Rooms
  onChat(nickname, text) {
    this.io.emit('chat', { nickname, text });
  }

  // ** TODO: Rooms
  onAction(nickname, text) {
    this.io.emit('action', { nickname, text });
  }

  onDisconnect(client) {
    this.clients.delete(client);
  }
}

module.exports = ChatServer;
