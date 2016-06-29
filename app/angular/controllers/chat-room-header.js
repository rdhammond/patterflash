(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .controller('ChatRoomHeaderController', ChatRoomHeaderController);

  ChatRoomHeaderController.$inject = ['$scope'];

  function ChatRoomHeaderController($scope) {
    var vm = this;

    // ** TODO
    vm.room = 'Test Room';
  }

})(angular);
