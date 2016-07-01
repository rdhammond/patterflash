'use strict';

const ioc = require('./ioc');

let webServer = new ioc.WebServer(ioc),
  chatServer = new ioc.ChatServer(ioc, webServer);

webServer.start(ioc.config.web.port)
  .then(() => { return chatServer.start(); })
  .then(() => { console.log(`Patterflash listening on ${ioc.config.web.port}`); })
  .catch((e) => {
    console.log(e);
    ioc.process.exit(1);
  })
  .done();
