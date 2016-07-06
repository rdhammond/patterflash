(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('pfChatRooms', pfChatRooms);

  function pfChatRooms() {
    return {
      restrict: 'E',
      templateUrl: 'views/pf-chat-rooms.html',
    };
  }

})(angular);
