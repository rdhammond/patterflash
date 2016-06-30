(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .factory('chatClient', chatClient);

  chatClient.$inject = ['socket.io', '$q'];

  function chatClient(io, $q) {
    var service = {
      connected: false,
      connect: connect
    };

    return service;

    function connect(nickname) {
      var deferred = $q.defer();
      service.socket = io();

      service.socket.on('connect', function() {
        onConnect();
        deferred.resolve();
      });

      return deferred.promise;
    }

    function onConnect() {
      // ** TODO
      service.connected = true;
    }
  }

})(angular);
