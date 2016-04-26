myApp.controller('SeaHotelTabController', ['$scope', '$location', '$routeParams','localStorageService','$http','$anchorScroll',
    function($scope, $location,  $routeParams, localStorageService, $http, $anchorScroll) {
        console.log('SeaHotelTabController ', $routeParams);
        console.log('sea_id = ', $routeParams.id);

        var params = {
            sea_id : $routeParams.id
        };

        console.log("Params - ", JSON.stringify( params ));

        $http({
            method : "POST",
            url : "php/index.php?name=hotels&join=comment",
            data: 'data=' + JSON.stringify( params ),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySuccess(response) {
            $scope.items = response.data;
            console.log("Sea hotels - ", $scope.items);
            pagination( $scope.items );
        }, function myError(response) {

        });

        $scope.currentPage = 1;
        $scope.pageSize = 4;

        function pagination( data ){
            var pageCount = parseInt( ( data.length + 3 ) / $scope.pageSize );

            $scope.pageCount = [];
            for( var i = 0; i < pageCount; i++ )
            {
                $scope.pageCount[i] = i;
            }
        }

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
                return true;
            } else {
                return false;
            }
        };

    }]);
