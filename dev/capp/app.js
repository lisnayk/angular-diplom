( function() {
'use strict';
// Описывает экземпляр приложения и указывает компоненты которые необходимо использовать
var myApp = angular.module('myCApp', ['ngRoute', 'firebase', "ngFlash"]);
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
// Описываем фильтр для фильтрации HTML тегов
myApp.filter('htmlToPlaintext', function() {
    return function(text) {
        var res = text ? String(text).replace(/<[^>]+>/gm, '') : '';
        return res ? String(res).replace(/&nbsp;/gm, ' ') : '';
    };
});
myApp.filter('unsafe', function($sce) {
    return $sce.trustAsHtml;
});
// Конфигурируем работу приложения 
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'capp/main/main.view.html',
            controllerAs: 'vm',
        })
        .when('/contacts', {
            controller: 'MainController',
            templateUrl: 'capp/main/main.contacts.view.html',
            controllerAs: 'vm',
        })
        .when('/about', {
            controller: 'MainController',
            templateUrl: 'capp/main/main.about.view.html',
            controllerAs: 'vm',
        })
        .when('/terms', {
            controller: 'TermsController',
            templateUrl: 'capp/terms/index.view.html',
            controllerAs: 'vm',
        })
        .when('/article/:id', {
            controller: 'ArticlesController',
            templateUrl: 'capp/articles/index.view.html',
            controllerAs: 'vm',

        })
        /*.when('/terms/add', {
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
        })*/
        .otherwise({
            redirectTo: '/'
        });
}]);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
    /*$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
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
    });*/
}]);

} )();