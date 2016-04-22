adminApp.controller('HomeSeaAddController', ['$scope','$location', 'localStorageService','$http','$stateParams','$timeout',
    function($scope,$location,localStorageService, $http, $stateParams, $timeout) {


        var isLoggedIn = localStorageService.get('loginSuccess');



        if (isLoggedIn === null) {
            $location.path('/login');
        }

        $scope.sea = {};


        $scope.FormEditSuccess = false;
        $scope.list = {};

        $scope.submit = function() {
            console.log( 'this - ', this);

            $scope.list.description = this.sea.description;
            $scope.list.name = this.sea.name;
            $scope.list.image = 'assets/imgs/empty/hotel_empty.jpg';

            console.log('LISTT - ', $scope.list);
            console.log('LIgSTt - ',JSON.stringify( $scope.list ));


            $http({
                method: 'POST',
                url: 'php/index.php?action=add&name=sea',
                data: 'data=' + JSON.stringify( $scope.list ),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function( response ){
                console.log('response - ',response.data );
                $scope.FormEditSuccess = true;
                $timeout(function(){
                    $scope.FormEditSuccess = false;
                },2000);
            }, function( response ){

            });

        };

    }]);


