'use strict';

class WebServer {
  constructor(ioc) {
    this.express = ioc.express;
    this.q = ioc.q;
    this.app = this.createApp();
    this.server = ioc.http.Server(this.app);
    this.users = ioc.usersService;
  }

  createApp() {
    let app = this.express();

    app.use(this.express.static('app', {
      extensions: ['html']
    }));
    app.use(this.express.static('app/js'));
    app.use(this.express.static('app/css'));

    app.get('/confirm/:token', this.confirmEmail.bind(this));
    return app;
  }

  confirmEmail(req, res, next) {
    if (!req.params.token)
      return next();

    this.users.confirmEmail(req.params.token)
      .then(() => res.redirect('/?c=1'))
      .catch(() => res.send(500));
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
