(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('pfChat', pfChat);

  function pfChat() {
    return {
      restrict: 'E',
      templateUrl: 'views/pf-chat.html'
    };
  }

})(angular);
