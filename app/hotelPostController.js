myApp.controller('HotelPostController', ['$scope', '$location', '$routeParams','localStorageService','$http','NgMap','$timeout','$filter',
    function($scope, $location,  $routeParams, localStorageService, $http, NgMap, $timeout, $filter) {
        console.log('HotelPostController');

        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

        /* Star Rating For Hotel */

        $scope.rate = 0;
        $scope.max = 5;
        $scope.isReadonly = true;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.postID = $routeParams.id;

        $http({
            method : "GET",
            url : "php/index.php?name=hotels"
        }).then(function mySucces(response) {
            
            var data = filterSea( response.data );

            $scope.item = data[0];
            $scope.rate = data[0].stars;


        }, function myError(response) {

        });

        var params = {
            'cat' : 'hotel',
            'id'  : $routeParams.id
        };

        console.log( "param1 - ", JSON.stringify( params ) );
        console.log( "param1 - ", params );

        var getComments = function(){
            $http({
                method : "POST",
                url : "php/index.php?name=comment&action=get&cat=hotel",
                data: 'data=' + JSON.stringify( params ),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function mySucces( response ) {
                $scope.comments = response.data;
                console.log("Comment post - ", $scope.comments);
            }, function myError(response) {

            });
        }

        getComments();

        

        function filterSea( data ){

            var log = [];
            angular.forEach( data ,function(value){
                if( value.id === $routeParams.id ){
                    this.push(value);
                }
            },log);

            return log;
        }

        $scope.comment={};

        $scope.commentForm = function(){
            $scope.comment.cat = 'hotel';
            $scope.comment.post_id = $routeParams.id;

            var dateTime = new Date();
            $scope.comment.date = $filter('date')(dateTime, "yyyy-MM-dd HH:mm:ss");;
            $scope.comment.approve = 1;

            console.log($scope.comment);

            $http({
                method: 'POST',
                url: 'php/index.php?action=add&name=comment&cat=hotel',
                data: 'data=' + JSON.stringify( $scope.comment ),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function( response ){
                console.log('response - ',response.data );
                $scope.FormEditSuccess = true;
                $timeout(function(){
                    $scope.FormEditSuccess = false;
                },2000);
                getComments();
                $scope.comment = {};
            }, function( response ){

            });
        }




    }]);

