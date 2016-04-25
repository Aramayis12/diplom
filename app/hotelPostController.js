myApp.controller('HotelPostController', ['$scope', '$location', '$routeParams','localStorageService','$http','NgMap','$timeout',
    function($scope, $location,  $routeParams, localStorageService, $http, NgMap, $timeout) {
        console.log('PostController');

        $scope.urlCore = 'http://' + $location.host() + '/diplom/';

        NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });


        
        $scope.hoverRating2=0;

        $scope.click2 = function (param) {
            console.log('Click');
        };

        $scope.mouseHover2 = function (param) {
            console.log('mouseHover(' + param + ')');
            $scope.hoverRating1 = param;
        };

        $scope.mouseLeave2 = function (param) {
            console.log('mouseLeave(' + param + ')');
            $scope.hoverRating2 = param + '*';
        };

        $scope.postID = $routeParams.id;

        $http({
            method : "GET",
            url : "php/index.php?name=hotels"
        }).then(function mySucces(response) {
            
            var data = filterSea( response.data );

            $scope.item = data[0];
            $scope.starRating2 = data[0].stars;
            $scope.$apply();

        }, function myError(response) {

        });

        var params = {
            'cat' : 'hotel',
            'id'  : $routeParams.id
        }
        console.log( "param1 - ", JSON.stringify( params ) );
        console.log( "param1 - ", params );

        var getComments = function(){
            $http({
                method : "POST",
                url : "php/index.php?name=comment&action=get",
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
            angular.forEach( data ,function(value,key){
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

            console.log($scope.comment);

            $http({
                method: 'POST',
                url: 'php/index.php?action=add&name=comment',
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

myApp.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;
            
            $scope.isolatedClick = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope.rating = $scope._rating = param;
                $scope.hoverValue = 0;
                $scope.click({
                    param: param
                });
            };

            $scope.isolatedMouseHover = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = 0;
                $scope.hoverValue = param;
                $scope.mouseHover({
                    param: param
                });
            };

            $scope.isolatedMouseLeave = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = $scope.rating;
                $scope.hoverValue = 0;
                $scope.mouseLeave({
                    param: param
                });
            };
        }
    };
});
