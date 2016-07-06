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
        .then(function() {
            return chatClient.login(vm.email, vm.password, vm.nickname);
        })
        .catch(function(e) { vm.flash = e; });
    }
  }

})(angular);
