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
      return chatClient.connect()
        .then(function() { return chatClient.login(vm.nickname); })
        .catch(error.catch);
    }
  }

})(angular);
