'use strict';

const ioc = require('./ioc');

let database = new ioc.Database(ioc),
  webServer = new ioc.WebServer(ioc),
  chatServer = new ioc.ChatServer(ioc, webServer);

database.start(ioc.config.mongo.connectionString)
  .then(() => { return webServer.start(ioc.config.web.port); })
  .then(() => { return chatServer.start(); })
  .then(() => { console.log(`Patterflash listening on ${ioc.config.web.port}`); })
  .catch((e) => {
    console.log(e);
    ioc.process.exit(1);
  })
  .done();
