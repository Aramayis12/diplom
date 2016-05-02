myApp.controller('HomeController', ['$scope','$http','$anchorScroll','localStorageService', '$location', 
  function($scope, $http, $anchorScroll, localStorageService, $location) {

    console.log('HomeController');

	if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
 
	function onPositionUpdate(position) {
	    var lat = position.coords.latitude;
	    var lng = position.coords.longitude;
	    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
	    
	   /*
	   $http.get(url)
	        .then(function(result) {
	            var address = result.data.results[0].formatted_address;
	            $scope.address = address;

	            $http({
			        method : "GET",
			        url : "php/index.php?place=" + address
			    }).then(function mySucces(response) {
			        
			    }, function myError(response) {
			       
			    });
	        });
	   */
	}

    /* Url */
    $scope.host = $location.protocol() + '://'+ $location.host() +'/';
    
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

    $scope.itemsList = function(tags, index){
        console.log("True");
        var start =  $scope.pageSize * ( $scope.currentPage - 1 );
        var end =  $scope.currentPage *  $scope.pageSize;

        if( index >=start && index < end ){
            return true;
        } else {
            return false;
        }
    };



    $scope.currentPage = 1;
    $scope.pageSize = 4;

    $scope.items = {};

    $http({
        method : "GET",
        url : "php/index.php?name=news"
    }).then(function mySucces(response) {
        $scope.items =  response.data;
        pagination( response.data );
    }, function myError(response) {

    });


    function pagination( data ){
        var pageCount = parseInt( ( data.length + 3 ) / $scope.pageSize );

        $scope.pageCount = [];
        for( var i = 0; i < pageCount; i++ )
        {
            $scope.pageCount[i] = i;
        }
    }







}]);