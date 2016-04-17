adminApp.controller('AuthController', ['$scope','localStorageService','$rootScope',  function($scope,localStorageService,$rootScope) {

    var loginDataValues = {
        'username':'admin',
        'password': 'admin'
    };

    $scope.loginData = {
        'username':'',
        'password': ''
    };

    $scope.submitLogin = function( data ){
        console.log( data );

        var loginSuccess = false;

        if( data.username === loginDataValues.username && data.password === loginDataValues.password ){
            localStorageService.set('loginSuccess',true);
            loginSuccess = true;
        } else {
            if( localStorageService.get('loginSuccess') !== null ){
                localStorageService.remove('loginSuccess');
            }
        }

        // firing an event upwards
        $scope.$emit('loginSuccess', loginSuccess);

        // firing an event downwards
        $scope.$broadcast('loginSuccess', loginSuccess);
    }
}]);

