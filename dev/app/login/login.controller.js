( function() {
'use strict';

angular.module('myApp').controller('LoginController', ["$scope", '$location', "Auth", 'CONFIG', function($scope, $location, Auth, CONFIG) {
    var vm = this;
    var ref = new Firebase(CONFIG.FiteBaseApp);

    vm.Init = function() {
        if (CONFIG.UseDefaultAuth) {
            vm.login = CONFIG.DefLogin;
            vm.password = CONFIG.DefPassword;
        }
    }

    vm.Login = function() {
        ref.authWithPassword({
            "email": vm.login,
            "password": vm.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log(authData);
            }
            $location.path("/");
        });
    }
    vm.LogOut = function() {
        ref.unauth();
        window.location.reload();
    }

}]);
} )();