adminApp.controller('HomeHotelEditController', ['$scope','$location', 'localStorageService','$http','$stateParams','FileUploader',
    function($scope,$location,localStorageService, $http, $stateParams,FileUploader) {


    var isLoggedIn = localStorageService.get('loginSuccess');



    if (isLoggedIn === null) {
        $location.path('/login');
    }

    $scope.uploader = new FileUploader({
        url: 'php/index.php?action=set&name=hotel&hotel_ID='+$stateParams.id
    });

    var uploader = $scope.uploader;

    // FILTERS

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);


    $scope.seaOption = { id: 0,name: '' };

    $http({
        method: 'POST',
        url: 'php/index.php?action=get&name=hotel',
        data: 'id=' + $stateParams.id,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function( response ){
        $scope.hotel = response.data[0];
        console.log( 'hotel - ', $scope.hotel );
        $scope.selected = currentOption( $scope.hotel.sea_ID );
    }, function( response ){

    });

    var currentOption = function( id ){
        var log = [];
        angular.forEach( $scope.seas ,function(value,key){
            if( value.id === id ){
                this.push(value);
            }
        },log);
        return log[0];
    };

    $scope.list = [];

    $scope.submit = function() {
        console.log( 'this - ', this);
        $scope.list['hotel_ID'] = this.hotel.hotel_ID;
        $scope.list['hotel_desc'] = this.hotel.hotel_description;
        $scope.list['hotel_name'] = this.hotel.hotel_name;
        $scope.list['hotel_stars'] = this.hotel.hotel_stars;
        $scope.list['hotel_sea_ID'] = this.selected.id;

        console.log('LIST - ', $scope.list);
    };

}]);


