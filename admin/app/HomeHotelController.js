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
                //
            });

    }

    
    $scope.max = 5;
    $scope.isReadonly = true;

   

}]);