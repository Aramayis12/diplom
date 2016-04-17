myApp.controller('SeaController', ['$scope','localStorageService','$routeParams','$location','$anchorScroll','$http',
    function($scope,localStorageService,$routeParams, $location, $anchorScroll, $http) {
    console.log('sea controller');

    $scope.url = $location.path();


    $scope.currentPage = 1;
    $scope.pageSize = 4;

    $scope.items = {};


    if(localStorageService.get('seas') === null){
        $http({
            method : "GET",
            url : "php/index.php?name=news"
        }).then(function mySucces(response) {
            setValues( response.data );
            var data = filterSea( response.data );
            $scope.items = data;
            pagination( data );
        }, function myError(response) {

        });
    } else {
        var data = filterSea( localStorageService.get('seas') );
        $scope.items = data;
        pagination( data );
    }

    function filterSea( data ){
        var log = [];
        angular.forEach( data ,function(value,key){
            if( value.sea_id === $routeParams.id ){
                this.push(value);
            }
        },log);
        return log;
    }

    function pagination( data ){
        var pageCount = parseInt( ( data.length + 3 ) / $scope.pageSize );

        $scope.pageCount = [];
        for( var i = 0; i < pageCount; i++ )
        {
            $scope.pageCount[i] = i;
        }
    }

    function setValues( data ){
        if(localStorageService.isSupported) {
            localStorageService.set('seas', data);
            $scope.items = localStorageService.get('seas');
        }
    }

    /* Pagination */


    $scope.pageTo = function( e, index ){
        $scope.currentPage = index + 1;
        $anchorScroll();
        $( e.target ).parent().addClass('active').siblings().removeClass('active');
    }

    $scope.pageToNext = function(){
        // $scope.currentPage++;
        var pages = $('.pagination li');
        console.log( pages );
    };

    $scope.itemsList = function(tags, index){
        var start =  $scope.pageSize * ( $scope.currentPage - 1 );
        var end =  $scope.currentPage *  $scope.pageSize;

        if( index >=start && index < end ){
            return tags;
        }
    };


}])