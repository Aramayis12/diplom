myApp.controller('MenuController', ['$scope','$location','$http','localStorageService',  function($scope, $location, $http,localStorageService) {
    console.log("Menu Controller");
    $scope.menu = {};


    $http({
        method : "GET",
        url : "php/index.php?name=seas"
    }).then(function mySucces(response) {
        $scope.menu = response.data;
        console.log('menu seas - ', $scope.menu);
    }, function myError(response) {

    });

}])