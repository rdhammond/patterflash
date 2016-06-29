'use strict';

class WebServer {
  constructor(ioc) {
    this.express = ioc.express;
    this.app = this.createApp();
  }

  createApp() {
    let app = this.express();
    
    app.use(this.express.static('app', {
      extensions: ['html', 'js', 'css']
    }));

    return app;
  }

  start(port) {
    let server = this.app.listen(port, () => {
      console.log(`Patterflash listening on port ${port}`);
    });
  }
}

module.exports = WebServer;
