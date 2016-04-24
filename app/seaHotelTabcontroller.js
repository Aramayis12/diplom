myApp.controller('SeaHotelTabController', ['$scope', '$location', '$routeParams','localStorageService','$http','$anchorScroll',
    function($scope, $location,  $routeParams, localStorageService, $http, $anchorScroll) {
        console.log('SeaHotelTabController ', $routeParams);


        $http({
            method : "GET",
            url : "php/index.php?name=hotels"
        }).then(function mySucces(response) {
            console.log(response.data);
            $scope.items = filterSea( response.data ) ;
            console.log("Sea hotels - ", $scope.items);
            pagination( $scope.items );
        }, function myError(response) {

        });



        function filterSea( data ){

            var log = [];
            angular.forEach( data ,function(value,key){
                if( value.sea_id === $routeParams.id ){
                    this.push(value);
                }
            },log);

            return log;
        }

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
                return tags;
            }
        };

    }]);
