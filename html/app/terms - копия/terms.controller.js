( function() {
'use strict';

angular.module('myApp').controller('TermsController', ["Terms", "$routeParams", "Flash", "currentAuth", function LoginController(Terms, $routeParams, Flash, currentAuth) {
    var vm = this;
    var id = $routeParams.id;
    var newRecord = true;
    vm.title = "Добавить";

    vm.list = Terms;
    console.log(currentAuth);
    vm.Save = function() {
        if (id !== undefined) {
            var item = Terms[id];
            item.name = vm.name;
            item.info = vm.info;
            Terms.$save(item).then(function() {
                console.log(item.$id + " is  saved");
                Flash.create('success', item.$id + " is  saved", 0);
            });
        } else {
            Terms.$add({
                name: vm.name,
                info: vm.info
            });
            Flash.create('success', "Record  is  add", 0);
        }
    };
    vm.Delete = function(index) {
        var item = Terms[index];
        Terms.$remove(item);
    };
    // if the messages are empty, add something for fun!
    vm.list.$loaded(function() {
        if (vm.list.length === 0) {
            vm.list.$add({
                name: "Название термина",
                info: "Описание термина"
            });
        }
        if (id !== undefined) {
            vm.name = vm.list[id].name;
            vm.info = vm.list[id].info;
            newRecord = false;
            vm.title = "Изменить";
        }
    });
}
]);
} )();
