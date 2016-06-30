(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .factory('Foundation', Foundation);

  Foundation.$inject = ['$document', '$window'];

  function Foundation($document, $window) {
    $document.foundation();
    return $window.Foundation;
  }

})(angular);
