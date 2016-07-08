(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .controller('ConnectDialogController', ConnectDialogController);

  ConnectDialogController.$inject = ['chatClient', '$window'];

  function ConnectDialogController(chatClient, $window) {
    var vm = this;
    vm.connect = connect;

    init();

    function init() {
      if (getQueryParams().c === '1')
        vm.flash = 'Your email has been confirmed. Please log in as normal.';
    }

    function connect() {
      delete vm.flash;

      return chatClient.connect()
        .then(function() {
            return chatClient.login(vm.email, vm.password, vm.nickname);
        })
        .catch(function(e) { vm.flash = e; });
    }

    function getQueryParams() {
      var queryString = {};

      $window.location.href.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) { queryString[$1] = $3; }
      );

      return queryString;
    }
  }

})(angular);
