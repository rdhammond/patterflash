(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('pfChatRoomHeader', pfChatRoomHeader);

  function pfChatRoomHeader() {
    return {
      restrict: 'E',
      scope: {
        room: '='
      },
      templateUrl: 'views/pf-chat-room-header.html',
    };
  }

})(angular);
