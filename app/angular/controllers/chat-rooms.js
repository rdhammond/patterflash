(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .controller('ChatRoomsController', ChatRoomsController);

  ChatRoomsController.$inject = ['$window', '$scope', 'chatClient'];

  function ChatRoomsController($window, $scope, chatClient) {
    var vm = this;
    vm.selectRoom = selectRoom;

    $scope.$watchCollection(
      function() { return chatClient.rooms; },
      onRoomsChanged
    );

    function onRoomsChanged(newVal) {
      vm.rooms = newVal;
    }

    function selectRoom(room) {
      // ** TODO
      $window.alert(room);
    }
  }

})(angular);
