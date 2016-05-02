
    myApp.directive('tabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: [ "$scope", function($scope) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                }

                this.addPane = function(pane) {
                    if (panes.length == 0) $scope.select(pane);
                    panes.push(pane);
                }
            }],
            template:
            '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
            '</ul>' +
            '<div class="tab-content" ng-transclude></div>' +
            '</div>',
            replace: true
        };
    }).
    directive('pane', function() {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: { title: '@' },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            template:
            '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
            '</div>',
            replace: true
        };
    })


myApp.config(function($routeProvider,localStorageServiceProvider, $locationProvider) {
    
    //check browser support
    console.log('window.history - ', window.history);
    console.log('window.history.pushState - ', window.history.pushState);
    
    if(window.history && window.history.pushState){
        //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

     // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

     // if you don't wish to set base URL then use this
     $locationProvider.html5Mode({
             enabled: true,
             requireBase: false
      });
    }


    localStorageServiceProvider
        .setPrefix('myApp')
        .setStorageType('sessionStorage')
        .setNotify(true, true);

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/sea/:id/news',{
            templateUrl: 'views/sea.html',
            controller:'SeaController'
        })
        .when('/news/post/:id',{
            templateUrl:'views/post.html',
            controller:'PostController'
        })
        .when('/sea/:id',{
            templateUrl:'views/post.html',
            controller:'SeaAboutController'
        })
        .when('/hotel/post/:id',{
            templateUrl:'views/hotel_post.html',
            controller:'HotelPostController'
        });

});