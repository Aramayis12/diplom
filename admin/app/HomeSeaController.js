adminApp.controller('HomeSeaController', ['$scope','$location', 'localStorageService','$http',  function($scope,$location,localStorageService, $http) {
    var isLoggedIn = localStorageService.get('loginSuccess');

    if (isLoggedIn === null) {
        $location.path('/login');
    }

    var message = '';

    var getSeas = function(){
        console.log('seas work');

        $http({
            method: 'POST',
            url: 'php/index.php?action=get&name=seas',
            data: "message=" + message,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function( response ){
            $scope.seas  =  response.data;
        }, function( response ){

        });
    };

    getSeas();



    $scope.selectFile = function( id ){
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

    $scope.fileUpload = function( id ){
        console.log("select id ", id);
        console.log("select file ", $scope.currentFile);

        var fd = new FormData();
        fd.append('file', $scope.currentFile);
        fd.append('id', id);

        $http.post('php/index.php?action=edit&name=sea&file=true', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
            $scope.fileUploadIs = 0;
            getSeas();
        })
        .error(function(){
        });

    }





}]);
