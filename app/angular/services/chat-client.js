// ** TODO: Something's up with our root scope. We shouldn't have to call $apply().
(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .factory('chatClient', chatClient);

  chatClient.$inject = ['socket.io', '$q', '$rootScope'];

  function chatClient(io, $q, $rootScope) {
    var service = {
      connected: false,
      loggedIn: false,
      rooms: [],
      connect: connect,
      login: login,
      join: join,
      chat: chat,
      action: action,
      leave: leave
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

    function login(email, password, nickname) {
      var deferred = $q.defer();

      service.socket.emit('login', email, password, nickname, function(err, rooms) {
        if (err)
          return deferred.reject(err);

        service.loggedIn = true;
        service.nickname = nickname;
        service.rooms = rooms;
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
      service.socket.on('roomList', onRoomList);
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
        if (err)
          return deferred.reject(new Error(err));

        deferred.resolve();
      }
    }

    function onChat(msg) {
      $rootScope.$emit('chat', msg);
      $rootScope.$apply();
    }

    function onAction(msg) {
      $rootScope.$emit('action', msg);
      $rootScope.$apply();
    }

    function onRoom(text) {
      $rootScope.$emit('room', text);
      $rootScope.$apply();
    }

    function onError(text) {
      $rootScope.$emit('error', text);
      $rootScope.$apply();
    }

    function onRoomList(rooms) {
      service.rooms = rooms;
      $rootScope.$apply();
    }

    function onDisconnect() {
      service.connected = false;
      delete service.nickname;
      $rootScope.$emit('disconnect');
    }
  }

})(angular);
