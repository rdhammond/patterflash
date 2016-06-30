(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('pfChatRoom', pfChatRoom);

  function pfChatRoom() {
    return {
      restrict: 'E',
      templateUrl: 'views/pf-chat-room.html'
    };
  }

})(angular);
