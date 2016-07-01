(function(angular) {
  'use strict';

  var MAX_CHAT_LINES = 1000;

  var rgxIsAction = /^\/me /i;

  angular
    .module('patterflash')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['chatClient', 'error'];

  function ChatController(chatClient, error) {
    var vm = this;
    vm.chatMessages = [];
    vm.send = send;

    var channels = {};
    init();

    function init() {
      channels.chat = chatClient.on('chat', onChat);
      channels.action = chatClient.on('action', onAction);
    }

    function send() {
      // ** TODO: Join, Leave, etc.
      var promise;

      if (rgxIsAction.test(vm.message))
        promise = sendAction();
      else
        promise = sendChat();

      return promise
        .then(function() { vm.message = ''; })
        .catch(error.catch);
    }

    function sendAction() {
      return chatClient.action(vm.message.replace(rgxIsAction, ''));
    }

    function sendChat() {
      return chatClient.chat(vm.message);
    }

    function onChat(msg) {
      pushMessage('chat', msg.nickname, msg.text);
    }

    function onAction(msg) {
      pushMessage('action', msg.nickname, msg.text);
    }

    function pushMessage(type, nickname, text) {
      console.log(type);
      console.log(nickname);
      console.log(text);
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
