(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('zfTopBar', zfTopBar);

  function zfTopBar() {
    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      templateUrl: 'views/zf-top-bar.html'
    };
  }
})(angular);
