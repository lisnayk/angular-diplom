( function() {
'use strict';

angular.module('myCApp').controller('MainController', ['$location', '$route', 'Categories', 'Articles', function MainController($location, $route, Categories, Articles) {
    var vm = this;
    vm.categories = Categories;
    vm.articles = Articles;
    vm.search = "";
    vm.isActive;

    vm.isActive = function(viewLocation) {
        var a = $location.path().split("/");
        var active = (viewLocation === "/" + a[1]);
        return active;

    };

}]);
} )();