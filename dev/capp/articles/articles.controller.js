( function() {
'use strict';

angular.module('myCApp').controller('ArticlesController', ["Articles", "Categories", "$routeParams", "Flash", function ArticlesController(Articles, Categories, $routeParams, Flash) {
    var vm = this;
    var id = $routeParams.id;
    vm.Categories;
    vm.list = Articles;

    // if the messages are empty, add something for fun!
    vm.list.$loaded(function() {
        if (id !== undefined) {
            vm.name = vm.list[id].name;
            vm.category = vm.list[id].category;
            vm.summary = vm.list[id].summary;
            vm.text = vm.list[id].text;
        }
    });
    Categories.$loaded(function() {
        vm.Categories = Categories;
    });
}
]);
} )();
