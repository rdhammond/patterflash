(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .controller('ConnectDialogController', ConnectDialogController);

  ConnectDialogController.$inject = ['chatClient', 'error'];

  function ConnectDialogController(chatClient, error) {
    var vm = this;
    vm.connect = connect;

    function connect() {
      // ** TODO
      chatClient.connect().catch(error.catch);
    }
  }

})(angular);
