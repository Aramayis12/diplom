myApp.controller('SeaNewsTabController', ['$scope','localStorageService','$routeParams','$location','$anchorScroll','$http',
    function($scope,localStorageService,$routeParams, $location, $anchorScroll, $http) {

    console.log('SeaNewsTabController');


    $scope.url = $location.host() + $location.path();
    console.log('location path = ', $location.host() + $location.path());


    $scope.currentPage = 1;
    $scope.pageSize = 4;

    $scope.items = {};

    var params = {
        sea_id : $routeParams.id
    };

   

    $http({
        method : "POST",
        url : "php/index.php?name=news&join=comment",
        data: 'data=' + JSON.stringify( params ),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function mySuccess(response) {
        
        $scope.items = response.data;
        pagination( response.data );
    }, function myError(response) {

    });

    function pagination( data ) {
        var pageCount = parseInt(( data.length + 3 ) / $scope.pageSize);

        $scope.pageCount = [];
        for (var i = 0; i < pageCount; i++) {
            $scope.pageCount[i] = i;
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

    $scope.filterList = function( item, index ){

        var start =  $scope.pageSize * ( $scope.currentPage - 1 );
        var end =  $scope.currentPage *  $scope.pageSize;

        if( index >=start && index < end ){
            return true;
        } else {
            return false;
        }
    };

}]);
