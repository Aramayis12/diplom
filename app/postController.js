myApp.controller('PostController', ['$scope', '$location', '$routeParams','localStorageService','$http','$timeout',
    function($scope, $location,  $routeParams, localStorageService, $http, $timeout) {
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
        angular.forEach( data ,function(value){
            if( value.id === $routeParams.id ){
                this.push(value);
            }
        },log);

        return log;
    }

    $scope.comment={};

    $scope.commentForm = function(){
        $scope.comment.cat = 'news';
        $scope.comment.post_id = $routeParams.id;

        console.log("Comment - ", $scope.comment);

        $http({
        method: 'POST',
            url: 'php/index.php?action=add&name=comment&cat=news',
            data: 'data=' + JSON.stringify( $scope.comment ),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function( response ){
            console.log('response - ',response.data );
            $scope.FormEditSuccess = true;
            $timeout(function(){
                $scope.FormEditSuccess = false;
            },2000);
            // getComments();
            $scope.comment = {};
        }, function( response ){

        });
    }


}]);
