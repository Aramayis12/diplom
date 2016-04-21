adminApp.controller('HomeNewsController', ['$scope','$location', 'localStorageService','$http','$stateParams','$timeout',
    function($scope,$location,localStorageService, $http, $stateParams, $timeout) {


        var isLoggedIn = localStorageService.get('loginSuccess');

        if (isLoggedIn === null) {
            $location.path('/login');
        }

        /* News */

        var message = '';

        $http({
            method: 'POST',
            url: 'php/index.php?action=get&name=news',
            data: "message=" + message,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function( response ){
            console.log('News - ', response.data);
            $scope.newsList = response.data;
        }, function( response ){

        });

        /* Seas */

        $http({
            method: 'POST',
            url: 'php/index.php?action=get&name=seas',
            data: "message=" + message,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function( response ){
            console.log('seas - ', response.data);
            $scope.seas =  response.data;
        }, function( response ){

        });

    }]);
