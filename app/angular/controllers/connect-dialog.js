(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .controller('ConnectDialogController', ConnectDialogController);

  ConnectDialogController.$inject = ['$scope'];

  function ConnectDialogController($scope) {
    var vm = this;
    vm.connect = connect;

    // Need direct scope here to communicate with our directive.
    $scope.connected = false;

    function connect() {
      $scope.connected = true;
    }
  }

})(angular);
