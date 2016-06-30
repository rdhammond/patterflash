(function(angular) {
  'use strict';

  var rgxScrub = /[^A-Za-z0-9]/g;

  angular
    .module('patterflash')
    .filter('startswith', startsWith);

  function startsWith() {
    return function(items, searchText) {
      if (!searchText)
        return items;

      var rgx = new RegExp('^' + scrub(searchText), 'i');

      return items.filter(function(value) {
        return rgx.test(value);
      });

      function scrub(txt) {
        return txt.replace(rgxScrub, '');
      }
    };
  }
})(angular);
