(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .factory('socket.io', socketIo);

  socketIo.$inject = ['$window'];

  function socketIo($window) {
    return $window.io;
  }

})(angular);
