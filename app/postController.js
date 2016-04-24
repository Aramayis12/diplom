myApp.controller('PostController', ['$scope', '$location', '$routeParams','localStorageService','$http',
    function($scope, $location,  $routeParams, localStorageService, $http) {
    console.log('PostController');

    $scope.postID = $routeParams.id;

    $http({
        method : "GET",
        url : "php/index.php?name=news"
    }).then(function mySucces(response) {
        var data = filterSea( response.data );
        $scope.item = data[0];
        $scope.items = response.data;
    }, function myError(response) {

    });

    function filterSea( data ){

        var log = [];
        angular.forEach( data ,function(value,key){
            if( value.id === $routeParams.id ){
                this.push(value);
            }
        },log);

        return log;
    }


}]);
