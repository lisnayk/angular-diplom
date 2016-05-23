( function() {
'use strict';

angular.module('myApp').controller('AdminController', ['$location', 'CONFIG', '$route', "$firebaseObject", function($location, CONFIG, $route, $firebaseObject) {
    var vm = this;
    console.log(CONFIG.FiteBaseApp);
    var ref = new Firebase(CONFIG.FiteBaseApp + "/categories");
    var obj = $firebaseObject(ref);

    obj.$loaded().then(function() {
        angular.forEach(obj, function(value, key) {
            console.log(key, value);
        });
    });

    vm.data = obj;

}]);
} )();