myApp.controller('MenuController', ['$scope','$location','$http','localStorageService',  function($scope, $location, $http,localStorageService) {

    $scope.menu = {};


    $http({
        method : "GET",
        url : "php/index.php?name=seas"
    }).then(function mySucces(response) {
        $scope.menu = response.data;
    }, function myError(response) {

    });

}])