myApp.controller('SeaAboutTabController', ['$scope', '$location', '$routeParams','localStorageService',  function($scope, $location,  $routeParams, localStorageService) {
    console.log('SeaAboutTabController');

    if(localStorageService.get('menu') === null){
        $http({
            method : "GET",
            url : "php/index.php?name=seas"
        }).then(function mySucces(response) {
            setValues( response.data );
        }, function myError(response) {

        });
    } else {
        angular.forEach( localStorageService.get('menu') ,function(value,key){
            if( value.id === $routeParams.id ){
                $scope.item = value;
            }
        });
        console.log( $scope.item );
    }
}]);
