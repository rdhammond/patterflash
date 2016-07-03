(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('pfChatRooms', pfChatRooms);

  pfChatRooms.$inject = ['chatClient'];

  function pfChatRooms(chatClient) {
    return {
      restrict: 'E',
      templateUrl: 'views/pf-chat-rooms.html',
      link: link
    };

    function link(scope, element, attrs) {
      scope.$watchCollection(
        function() { return chatClient.rooms; },
        roomsChanged
      );

      function roomsChanged(newVal) {
        scope.rooms = newVal || [];
      }
    }
  }

})(angular);
