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
        })
        .state('home.hotel',{
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
        }).state('home.news',{
        url:"/news",
        views:{
            "rightcontent": {
                templateUrl:'views/home_news.html',
                controller: 'HomeNewsController'
            }
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