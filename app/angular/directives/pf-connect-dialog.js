(function(angular) {
  'use strict';

  angular
    .module('patterflash')
    .directive('pfConnectDialog', pfConnectDialog);

  pfConnectDialog.$inject = ['chatClient'];

  function pfConnectDialog(chatClient) {
    return {
      restrict: 'E',
      templateUrl: 'views/pf-connect-dialog.html',
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
        scope.$watch(
          function() { return chatClient.connected; },
          connectedChanged
        );
      }

      function connectedChanged(newVal) {
        if (newVal)
          dialog.close();
        else
          dialog.open();
      }
    }
  }

})(angular);
