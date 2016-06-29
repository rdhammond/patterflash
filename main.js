'use strict';

const ioc = require('./ioc');

let server = new ioc.WebServer(ioc);
server.start(ioc.config.web.port);
