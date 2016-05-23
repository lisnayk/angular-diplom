( function() {
'use strict';
// Описывает экземпляр приложения и указывает компоненты которые необходимо использовать
var myApp = angular.module('myApp', ['ngRoute', 'firebase', "ngFlash"]);
// Определяем основные константы приложения
myApp.constant('CONFIG', {
    FiteBaseApp: 'https://munspel.firebaseio.com',
    UseDefaultAuth: true,
    DefLogin: "munspel@ukr.net",
    DefPassword: "1qaz"
});

// Создаем фабрики для работы с модклями  Firebase
myApp.factory("Terms", ["$firebaseArray", "CONFIG", function($firebaseArray, CONFIG) {
    // create a reference to the database where we will store our data
    var ref = new Firebase(CONFIG.FiteBaseApp + "/terms");
    return $firebaseArray(ref);
}
]);
myApp.factory("Categories", ["$firebaseArray", "CONFIG", function($firebaseArray, CONFIG) {
    // create a reference to the database where we will store our data
    var ref = new Firebase(CONFIG.FiteBaseApp + "/categories");
    return $firebaseArray(ref);
}
]);
myApp.factory("Articles", ["$firebaseArray", "CONFIG", function($firebaseArray, CONFIG) {
    // create a reference to the database where we will store our data
    var ref = new Firebase(CONFIG.FiteBaseApp + "/articles");
    return $firebaseArray(ref);
}
]);
myApp.factory("Auth", ["$firebaseAuth", "CONFIG", function($firebaseAuth, CONFIG) {
    var ref = new Firebase(CONFIG.FiteBaseApp);
    return $firebaseAuth(ref);
}
]);
// Добавляем директиву для создания WISYWIG редактора
myApp.directive('ckEditor', function() {
    return {
        require: '?ngModel',
        link: function(scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;
            ck.on('instanceReady', function() {
                ck.setData(ngModel.$viewValue);
            });
            function updateModel() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            }
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function(value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});
// Описываем фильтр для фильтрации HTML тегов
myApp.filter('htmlToPlaintext', function() {
    return function(text) {
        var res = text ? String(text).replace(/<[^>]+>/gm, '') : '';
        return res ? String(res).replace(/&nbsp;/gm, ' ') : '';
    };
});
// Конфигурируем работу приложения 
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            controller: 'AdminController',
            templateUrl: 'app/admin/admin.view.html',
            controllerAs: 'vm',
            resolve: {
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in the example above
                "currentAuth": ["Auth", function(Auth) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/terms', {
            controller: 'TermsController',
            templateUrl: 'app/terms/index.view.html',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/terms/add', {
            controller: 'TermsController',
            templateUrl: 'app/terms/form.view.html',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/terms/:id/edit', {
            controller: 'TermsController',
            templateUrl: 'app/terms/form.view.html',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/articles', {
            controller: 'ArticlesController',
            templateUrl: 'app/articles/index.view.html',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/articles/add', {
            controller: 'ArticlesController',
            templateUrl: 'app/articles/form.view.html',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/articles/:id/edit', {
            controller: 'ArticlesController',
            templateUrl: 'app/articles/form.view.html',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/categories', {
            controller: 'CategoriesController',
            templateUrl: 'app/categories/index.view.html',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/categories/add', {
            controller: 'CategoriesController',
            templateUrl: 'app/categories/form.view.html',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/categories/:id/edit', {
            controller: 'CategoriesController',
            templateUrl: 'app/categories/form.view.html',
            controllerAs: 'vm',
            resolve: {
                "currentAuth": ["Auth", function(Auth) {
                    return Auth.$requireAuth();
                }]
            }
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'app/login/login.view.html',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

myApp.run(['$rootScope', '$location', "Auth", function($rootScope, $location, Auth) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        } else {
            $location.path("/");
        }
    });
    $rootScope.$on('$routeChangeStart', function(next, current) {
        var user = Auth.$getAuth();
        if ($location.path() === "/login" && user !== null) {
            $location.path("/");
        }
    });
}]);

} )();