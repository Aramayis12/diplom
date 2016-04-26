myApp.controller('SeaAboutTabController', ['$scope', '$location', '$routeParams','localStorageService','$http',
    function($scope, $location,  $routeParams, localStorageService, $http) {
    console.log('SeaAboutTabController');


    $http({
        method : "GET",
        url : "php/index.php?name=seas"
    }).then(function mySucces(response) {
        filterSea( response.data );
    }, function myError(response) {

    });



    function filterSea( data ){
        angular.forEach( data ,function(value){
            if( value.id === $routeParams.id ){
                $scope.item = value;
            }
        });
    }

}]);
