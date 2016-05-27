( function() {
'use strict';

angular.module('myApp').controller('MainController', ['$scope', '$location', 'CONFIG', '$route', "Auth", function MainController($scope, $location, CONFIG, $route, Auth) {
    var vm = this;
    vm.authData;
    vm.auth = Auth;

    vm.auth.$onAuth(function(authData) {
        vm.authData = authData;
    })




}]);
} )();