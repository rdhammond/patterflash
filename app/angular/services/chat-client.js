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
      room: $q.defer(),
      error: $q.defer(),
      disconnect: $q.defer()
    };

    var service = {
      connected: false,
      loggedIn: false,
      connect: connect,
      login: login,
      join: join,
      chat: chat,
      action: action,
      leave: leave,
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
      service.socket.on('room', onRoom);
      service.socket.on('err', onError);
      service.socket.on('disconnect', onDisconnect);
    }

    function join(room) {
      return deferSocketSend('join', room)
        .then(function() { service.room = room; });
    }

    function chat(text) {
      return deferSocketSend('chat', text);
    }

    function action(text) {
      return deferSocketSend('action', text);
    }

    function leave(room) {
      return deferSocketSend('leave')
        .then(function() { delete service.room; });
    }

    function deferSocketSend() {
      var params = Array.prototype.slice.call(arguments),
        deferred = $q.defer();

      params.push(callback);
      service.socket.emit.apply(service.socket, params);
      return deferred.promise;

      function callback(err) {
        if (err) throw err;
        deferred.resolve();
      }
    }

    function onChat(msg) {
      channels.chat.notify(msg);
    }

    function onAction(msg) {
      channels.action.notify(msg);
    }

    function onRoom(text) {
      channels.room.notify(text);
    }

    function onError(text) {
      channels.error.notify(text);
    }

    function onDisconnect() {
      service.connected = false;
      delete service.nickname;
      channels.disconnect.notify(msg.disconnect);
    }

    function on(event, callback) {
      var channel = channels[event];

      if (!channel)
        throw new Error('No known event - ' + event);

      return channel.promise.then(null, null, callback).catch(error.catch);
    }
  }

})(angular);
