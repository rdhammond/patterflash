(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('pfChatRoomHeader', pfChatRoomHeader);

  pfChatRoomHeader.$inject = ['chatClient'];

  function pfChatRoomHeader(chatClient) {
    return {
      restrict: 'E',
      templateUrl: 'views/pf-chat-room-header.html',
      link: link
    };

    function link(scope, element, attrs) {
      init();

      function init() {
        scope.$watch(
          function() { return chatClient.room; },
          roomChanged
        );
      }

      function roomChanged(newVal) {
        scope.room = newVal || '(No Room)';
      }
    }
  }

})(angular);
