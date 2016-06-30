(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .controller('ChatRoomsController', ChatRoomsController);

  ChatRoomsController.$inject = ['$window', '$scope'];

  function ChatRoomsController($window, $scope) {
    var vm = this;
    vm.selectRoom = selectRoom;

    // ** TODO
    vm.rooms = [];

    for (var i=0; i<20; i++) {
      vm.rooms.push('room' + i);
    }

    function selectRoom(room) {
      // ** TODO
      $window.alert(room);
    }
  }

})(angular);
