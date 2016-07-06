(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .controller('ChatRoomHeaderController', ChatRoomHeaderController);

  ChatRoomHeaderController.$inject = ['chatClient', '$scope'];

  function ChatRoomHeaderController(chatClient, $scope) {
    var vm = this;
    vm.room = '(No Room)';

    $scope.$watch(
      function() { return chatClient.room; },
      onRoomChanged
    );

    function onRoomChanged(newVal) {
      vm.room = newVal || '(No Room)';
    }
  }

})(angular);
