adminApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");


    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .state('login', {
            url: "/login",
            templateUrl: 'views/login.html',
            controller: 'AuthController'
        })
        .state('home.sea',{
            url:"/sea",
            views:{
                "rightcontent": {
                    templateUrl:'views/home_sea.html',
                    controller: 'HomeSeaController'
                }
            }
        }).state('home.sea.add',{
            url:"/add",
            views: {
                "formcontent": {
                    templateUrl: 'views/form/sea_form.html',
                    controller: 'HomeSeaAddController'
                },

            }
        }).state('home.sea.edit',{
            url:"/edit/:id",
            views: {
                "formcontent": {
                    templateUrl: 'views/form/sea_form.html',
                    controller: 'HomeSeaEditController'
                },

            }
        }).state('home.hotel',{
            url:"/hotel",
            views:{
                "rightcontent": {
                    templateUrl:'views/home_hotel.html',
                    controller: 'HomeHotelController'
                }
            }
        })
        .state('home.hotel.edit',{
        url:"/edit/:id",
        views: {
            "formcontent": {
                templateUrl: 'views/form/hotel_form.html',
                controller: 'HomeHotelEditController'
            },

        }
        }).state('home.hotel.add',{
            url:"/add",
            views: {
                "formcontent": {
                    templateUrl: 'views/form/hotel_form.html',
                    controller: 'HomeHotelAddController'
                },

            }
        }).state('home.news',{
            url:"/news",
            views:{
                "rightcontent": {
                    templateUrl:'views/home_news.html',
                    controller: 'HomeNewsController'
                }
            }
        }).state('home.news.edit',{
            url:"/edit/:id",
            views: {
                "formcontent": {
                    templateUrl: 'views/form/news_form.html',
                    controller: 'HomeNewsEditController'
                },

            }
        }).state('home.news.add',{
            url:"/add",
            views: {
                "formcontent": {
                    templateUrl: 'views/form/news_form.html',
                    controller: 'HomeNewsAddController'
                },

            }
        });




});

adminApp.run(['$rootScope', '$location', function ($rootScope, $location) {

    // listen for the event in the relevant $scope
    $rootScope.$on('loginSuccess', function (event, isLoggedIn) {

    if (!isLoggedIn) {
        event.preventDefault();
        $location.path('/login');
    }
    else {
        $location.path('/home');
    }

    });

}]);