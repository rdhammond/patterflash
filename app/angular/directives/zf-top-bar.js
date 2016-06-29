(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('zfTopBar', zfTopBar);

  function zfTopBar() {
    console.log('pass');
    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      templateUrl: 'views/zf-top-bar.html'
    };
  }
})(angular);
