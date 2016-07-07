(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('pfConnectDialog', pfConnectDialog);

  pfConnectDialog.$inject = ['chatClient', '$location'];

  function pfConnectDialog(chatClient, $location) {
    return {
      restrict: 'E',
      templateUrl: 'views/pf-connect-dialog.html',
      //scope: { flash: '=' },
      link: link
    };

    function link(scope, element, attrs) {
      var dialog = new Foundation.Reveal(
        element.find('.reveal'),
        {
          closeOnEsc: false,
          closeOnClick: false
        }
      );

      init();

      function init() {
        // ** TODO: Initial scope isn't coming across on success
        if ($location.search().c === 1)
          scope.flash = 'Your email has been confirmed. You may log in normally.';

        scope.$watch(
          function() { return chatClient.connected && chatClient.loggedIn; },
          connectedChanged
        );

        scope.$on('destroy', function() {
          dialog.destroy();
        });
      }

      function connectedChanged(newVal) {
        if (newVal)
          return dialog.close();

        dialog.open();
      }
    }
  }

})(angular);
