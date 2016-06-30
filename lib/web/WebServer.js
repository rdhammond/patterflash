'use strict';

class WebServer {
  constructor(ioc) {
    this.express = ioc.express;
    this.q = ioc.q;
    this.app = this.createApp();
    this.server = ioc.http.Server(this.app);
  }

  createApp() {
    let app = this.express();

    app.use(this.express.static('app', {
      extensions: ['html']
    }));
    app.use(this.express.static('app/js'));
    app.use(this.express.static('app/css'));

    return app;
  }

  start(port) {
    var deferred = this.q.defer();

    this.server.listen(port, () => {
      deferred.resolve();
    });

    return deferred.promise;
  }
}

module.exports = WebServer;
