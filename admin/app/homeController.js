adminApp.controller('HomeController', ['$scope','$location', 'localStorageService',  function($scope,$location,localStorageService) {
	var isLoggedIn = localStorageService.get('loginSuccess');

	console.log('loginsuccess - ', isLoggedIn );

	if (isLoggedIn === null) {
        $location.path('/login');
    }

    $scope.host = $location.protocol() + '://'+ $location.host() +'/admin';
   
    
}]);
