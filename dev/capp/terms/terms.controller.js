( function() {
'use strict';

angular.module('myCApp').controller('TermsController', ["Terms", "$routeParams", function LoginController(Terms, $routeParams) {
    var vm = this;
    var id = $routeParams.id;
    vm.list = Terms;
}
]);
} )();
