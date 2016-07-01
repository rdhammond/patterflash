(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .factory('chatClient', chatClient);

  chatClient.$inject = ['socket.io', '$q', 'error'];

  function chatClient(io, $q, error) {
    // Use $q.notify for pub/sub to stay out of $rootScope
    var channels = {
      chat: $q.defer(),
      action: $q.defer(),
      disconnect: $q.defer()
    };

    var service = {
      connected: false,
      loggedIn: false,
      connect: connect,
      login: login,
      chat: chat,
      action: action,
      on: on
    };

    return service;

    function connect() {
      var deferred = $q.defer();
      service.socket = io();

      service.socket.on('connect', function() {
        service.connected = true;
        deferred.resolve();
      });

      return deferred.promise;
    }

    // ** TODO: Passwords
    function login(nickname) {
      var deferred = $q.defer();

      service.socket.emit('login', nickname, function() {
        service.loggedIn = true;
        service.nickname = nickname;
        hookEvents();
        deferred.resolve();
      });

      return deferred.promise;
    }

    function hookEvents() {
      service.socket.on('chat', onChat);
      service.socket.on('action', onAction);
      service.socket.on('disconnect', onDisconnect);
    }

    function chat(text) {
      return deferSocketSend('chat', text);
    }

    function action(text) {
      return deferSocketSend('action', text);
    }

    function deferSocketSend() {
      var params = Array.prototype.slice.call(arguments),
        deferred = $q.defer();

      params.push(callback);
      service.socket.emit.apply(service.socket, params);
      return deferred.promise;

      function callback(err) {
        if (err)
          return deferred.reject(err);

        deferred.resolve();
      }
    }

    function onChat(msg) {
      channels.chat.notify(msg);
    }

    function onAction(msg) {
      channels.action.notify(msg);
    }

    function onDisconnect() {
      service.connected = false;
      delete service.nickname;
      channels.disconnect.notify(msg.disconnect);
    }

    function on(event, callback) {
      var channel = channels[event];

      if (!channel) {
        throw new Error('No known event - ' + event);
      }

      return channel.promise.then(null, null, callback).catch(error.catch);
    }
  }

})(angular);
