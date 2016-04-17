myApp.controller('PostController', ['$scope', '$location', '$routeParams','localStorageService',  function($scope, $location,  $routeParams, localStorageService) {
    console.log('PostController');

    $scope.postID = $routeParams.id;



    if(localStorageService.get('seas') === null){
        $http({
            method : "GET",
            url : "php/index.php?name=news"
        }).then(function mySucces(response) {
            var data = filterSea( response.data );
            $scope.item = data[0];
            setValues( response.data );
        }, function myError(response) {

        });
    } else {
        var data = filterSea( localStorageService.get('seas') );
        $scope.item = data[0];
    }

    function setValues( data ){
        if(localStorageService.isSupported) {
            localStorageService.set('seas', data);
            $scope.items = localStorageService.get('seas');
        }
    }

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
