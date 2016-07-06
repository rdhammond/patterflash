(function(angular) {
  'use strict';

  var MAX_CHAT_LINES = 1000;

  var rgxIsAction = /^\/me /i,
    rgxIsJoin = /^\/join /i,
    rgxIsLeave = /^\/leave/i;

  angular
    .module('patterflash')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['chatClient', '$rootScope'];

  function ChatController(chatClient, $rootScope) {
    var vm = this;
    vm.chatMessages = [];
    vm.send = send;

    init();

    function init() {
      $rootScope.$on('chat', onChat);
      $rootScope.$on('action', onAction);
      $rootScope.$on('room', onRoom);
      $rootScope.$on('error', onError);
    }

    function send() {
      var promise;

      if (rgxIsAction.test(vm.message))
        promise = sendAction();
      else if (rgxIsJoin.test(vm.message))
        promise = sendJoin();
      else if (rgxIsLeave.test(vm.message))
        promise = sendLeave();
      else
        promise = sendChat();

      return promise
        .then(function() { vm.message = ''; })
        .catch(onError);
    }

    function sendJoin() {
      return chatClient.join(vm.message.replace(rgxIsJoin, ''));
    }

    function sendAction() {
      return chatClient.action(vm.message.replace(rgxIsAction, ''));
    }

    function sendChat() {
      return chatClient.chat(vm.message);
    }

    function sendLeave() {
      return chatClient.leave(vm.message.replace(rgxIsLeave, ''));
    }

    function onChat(event, msg) {
      pushMessage('chat', msg.nickname, msg.text);
    }

    function onAction(event, msg) {
      pushMessage('action', msg.nickname, msg.text);
    }

    function onRoom(event, text) {
      pushMessage('room', text);
    }

    function onError(event, text) {
      pushMessage('error', text);
    }

    function pushMessage(type, nickname, text) {
      if (!text) {
        text = nickname;
        nickname = null;
      }

      if (vm.chatMessages.length >= MAX_CHAT_LINES)
        vm.chatMessages = vm.chatMessages.slice(
          vm.chatMessages.length - MAX_CHAT_LINES + 1,
          vm.chatMessages.length
        );

      var message = { type: type, text: text };
      if (nickname) message.nickname = nickname;
      vm.chatMessages.push(message);
    }
  }
})(angular);
