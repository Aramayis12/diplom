adminApp.controller('HomeHotelAddController', ['$scope','$location', 'localStorageService','$http','$stateParams','$timeout',
    function($scope,$location,localStorageService, $http, $stateParams, $timeout) {


        var isLoggedIn = localStorageService.get('loginSuccess');



        if (isLoggedIn === null) {
            $location.path('/login');
        }


        $scope.seaOption = { id: 1, name: '' };
        $scope.hotel = {};

        var currentOption = function( id ){
            var log = [];
            angular.forEach( $scope.seas ,function(value,key){
                if( value.id === id ){
                    this.push(value);
                }
            },log);
            return log[0];
        };

        $scope.selected = currentOption( 1 );
        $scope.FormEditSuccess = false;

        $scope.list = {};

        $scope.submit = function() {
            console.log( 'this - ', this);
            $scope.list.hotel_ID = this.hotel.hotel_ID;
            $scope.list.hotel_desc = this.hotel.hotel_description;
            $scope.list.hotel_name = this.hotel.hotel_name;
            $scope.list.hotel_stars = this.hotel.hotel_stars;
            $scope.list.hotel_sea_ID = this.selected.id;
            $scope.list.hotel_image = 'assets/imgs/empty/hotel_empty.jpg';

            console.log('LISTT - ', $scope.list);
            console.log('LIgSTt - ',JSON.stringify( $scope.list ));


            $http({
                method: 'POST',
                url: 'php/index.php?action=add&name=hotel',
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


