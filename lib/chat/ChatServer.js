'use strict';

class ChatServer {
  constructor(ioc, webServer) {
    this.io = ioc.io(webServer.server);
    this.q = ioc.q;
  }

  start() {
    return this.q((resolve, reject) => {
      this.io.on('connection', this.onConnection.bind());
      resolve();
    });
  }

  onConnection() {
    // ** TODO
  }
}

module.exports = ChatServer;
