myApp.controller('MenuController', ['$scope','$location','$http','localStorageService',  function($scope, $location, $http,localStorageService) {

    $scope.menu = {};

    if(localStorageService.get('menu') === null){
        $http({
            method : "GET",
            url : "php/index.php?name=seas"
        }).then(function mySucces(response) {
            setValues( response.data );
        }, function myError(response) {

        });
    } else {
        $scope.menu = localStorageService.get('menu');
    }

    function setValues( data ){
        if(localStorageService.isSupported) {
           localStorageService.set('menu', data);
           $scope.menu = localStorageService.get('menu');
        }
    }

}])