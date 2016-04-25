adminApp.controller('HomeHotelController', ['$scope','$location', 'localStorageService','$http',  function($scope,$location,localStorageService, $http) {

    /* Router */

    var isLoggedIn = localStorageService.get('loginSuccess');

    if (isLoggedIn === null) {
        $location.path('/login');
    }

    /* Hotels */
    var message = '';

    var getHotels = function(){
        $http({
            method: 'POST',
            url: 'php/index.php?action=get&name=hotels',
            data: "message=" + message,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function( response ){
            console.log('hotels - ', response.data);
            $scope.hotels = response.data;
        }, function( response ){

        });
    }

    getHotels();





    /* Seas */

    $http({
        method: 'POST',
        url: 'php/index.php?action=get&name=seas',
        data: "message=" + message,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function( response ){
        console.log('seas - ', response.data);
        $scope.seas =  response.data;
    }, function( response ){

    });



    /* Stars */

    $scope.starRating1 = 4;
    $scope.starRating2 = 3;
    $scope.starRating3 = 2;
    $scope.hoverRating1 = $scope.hoverRating2 = $scope.hoverRating3 = 0;

    $scope.click1 = function (param) {
        console.log('Click(' + param + ')');
    };

    $scope.mouseHover1 = function (param) {
        console.log('mouseHover(' + param + ')');
        $scope.hoverRating1 = param;
    };

    $scope.mouseLeave1 = function (param) {
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating1 = param + '*';
    };

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

    $scope.mouseHover3 = function (param) {

        console.log('mouseHover(' + param + ')');
        // $scope.hoverRating3 = param;
    };

    $scope.mouseLeave3 = function (param) {
        console.log('mouseLeave(' + param + ')');
        $scope.hoverRating3 = param + '*';
    };

    $scope.click3 = function (param) {
        console.log('Click');
    };

    $scope.selectFile = function( id ){
        console.log("id = ", id);
        console.log("file = ", $("#file_"+id));
        $("#file_"+id).click();
    };

    $scope.fileNameChanged  = function( files, attr_id)
    {
        var arrVar = attr_id.split('_');
        var current_ID = parseFloat( arrVar[arrVar.length-1] );

        $scope.fileUploadIs = current_ID;
        $scope.currentFile = files[0];
        $scope.$apply();
    }

    $scope.cancelUpload = function(){
        $scope.fileUploadIs = 0;
    }

    $scope.fileUpload = function( id ){
        console.log("select id ", id);
        console.log("select file ", $scope.currentFile);

        var fd = new FormData();
        fd.append('file', $scope.currentFile);
        fd.append('id', id);

        $http.post('php/index.php?action=edit&name=hotel&file=true', fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(response){
                $scope.fileUploadIs = 0;
                getHotels();
            })
            .error(function(){
            });

    }





}]);

adminApp.directive('starRating', function () {
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
