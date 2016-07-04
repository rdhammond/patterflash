(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .controller('ConnectDialogController', ConnectDialogController);

  ConnectDialogController.$inject = ['chatClient'];

  function ConnectDialogController(chatClient) {
    var vm = this;
    vm.connect = connect;

    function connect() {
      delete vm.flash;

      return chatClient.connect()
        .then(function() { return chatClient.login(vm.username, vm.password); })
        .catch(function(e) {
          if (e.name === 'LoginError')
            vm.flash = 'Could not log in.';
        });
    }
  }

})(angular);
