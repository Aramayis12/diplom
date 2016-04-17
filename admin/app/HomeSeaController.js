adminApp.controller('HomeSeaController', ['$scope','$location', 'localStorageService','$http',  function($scope,$location,localStorageService, $http) {
    var isLoggedIn = localStorageService.get('loginSuccess');

    if (isLoggedIn === null) {
        $location.path('/login');
    }

    var message = '';

    $http({
        method: 'POST',
        url: 'php/index.php?action=get&name=seas',
        data: "message=" + message,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function( response ){
        $scope.seas  =  response.data;
    }, function( response ){

    });




}]);
