(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .factory('error', error);

  error.$inject = ['$window'];

  function error($window) {
    return {
      catch: catchErr
    };

    function catchErr(e) {
      // ** TODO
      $window.alert(e);
    }
  }

})(angular);
