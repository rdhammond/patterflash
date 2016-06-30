(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .controller('ChatController', ChatController);

  ChatController.$inject = ['$window'];

  function ChatController($window) {
    var vm = this;
    vm.send = send;

    // ** TODO
    vm.chatMessages = [
      { type: 'chat', name: 'TestUser', text: 'Chat Message' },
      { type: 'action', name: 'ActionGuy', text: 'does action.'},
      { type: 'room', text: 'Room Message' },
      { type: 'server', text: 'Server-wide Message' },
      { type: 'error', text: 'OH NO EVERYTHING HAS GONE TERRIBLY WRONG' },
      { type: 'chat', name: 'TestUser', text: 'Chat Message' },
      { type: 'action', name: 'ActionGuy', text: 'does action.'},
      { type: 'room', text: 'Room Message' },
      { type: 'server', text: 'Server-wide Message' },
      { type: 'error', text: 'OH NO EVERYTHING HAS GONE TERRIBLY WRONG' },
      { type: 'chat', name: 'TestUser', text: 'Chat Message' },
      { type: 'action', name: 'ActionGuy', text: 'does action.'},
      { type: 'room', text: 'Room Message' },
      { type: 'server', text: 'Server-wide Message' },
      { type: 'error', text: 'OH NO EVERYTHING HAS GONE TERRIBLY WRONG' },
      { type: 'chat', name: 'TestUser', text: 'Chat Message' },
      { type: 'action', name: 'ActionGuy', text: 'does action.'},
      { type: 'room', text: 'Room Message' },
      { type: 'server', text: 'Server-wide Message' },
      { type: 'error', text: 'OH NO EVERYTHING HAS GONE TERRIBLY WRONG' },
      { type: 'chat', name: 'TestUser', text: 'Chat Message' },
      { type: 'action', name: 'ActionGuy', text: 'does action.'},
      { type: 'room', text: 'Room Message' },
      { type: 'server', text: 'Server-wide Message' },
      { type: 'error', text: 'OH NO EVERYTHING HAS GONE TERRIBLY WRONG' },
      { type: 'chat', name: 'TestUser', text: 'Chat Message' },
      { type: 'action', name: 'ActionGuy', text: 'does action.'},
      { type: 'room', text: 'Room Message' },
      { type: 'server', text: 'Server-wide Message' },
      { type: 'error', text: 'OH NO EVERYTHING HAS GONE TERRIBLY WRONG' }
    ];

    function send() {
      $window.alert(vm.message);
    }
  }
})(angular);
