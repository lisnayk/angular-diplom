( function() {
'use strict';

angular.module('myApp').controller('ArticlesController', ["Articles", "Categories", "$routeParams", "Flash", function LoginController(Articles, Categories, $routeParams, Flash) {
    var vm = this;
    var id = $routeParams.id;
    var newRecord = true;
    vm.title = "Добавить";
    vm.Categories;
    vm.list = Articles;

    vm.Save = function() {
        if (id !== undefined) {
            var item = Articles[id];
            item.name = vm.name;
            item.text = vm.text;
            item.category = vm.category;
            item.summary = vm.summary;
            Articles.$save(item).then(function() {
                console.log(item.$id + " is  saved");
                Flash.create('success', item.$id + " is  saved", 0);
            });
        } else {
            Articles.$add({
                name: vm.name,
                category: vm.category,
                summary: vm.summary,
                text: vm.text
            });
            Flash.create('success', "Record  is  add", 0);
        }
    };
    vm.Delete = function(index) {
        var item = Articles[index];
        Articles.$remove(item);
    };
    // if the messages are empty, add something for fun!
    vm.list.$loaded(function() {
        if (vm.list.length === 0) {
            vm.list.$add({
                name: "Название материала",
                summary: "Краткое описание материала"
            });
        }
        if (id !== undefined) {
            vm.name = vm.list[id].name;
            vm.category = vm.list[id].category;
            vm.summary = vm.list[id].summary;
            vm.text = vm.list[id].text;
            newRecord = false;
            vm.title = "Изменить";
        }
    });
    Categories.$loaded(function() {
        vm.Categories = Categories;
    });
}
]);
} )();
