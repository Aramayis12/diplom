adminApp.controller('HomeNewsEditController', ['$scope','$location', 'localStorageService','$http','$stateParams','$timeout',
    function($scope,$location,localStorageService, $http, $stateParams, $timeout) {


        var isLoggedIn = localStorageService.get('loginSuccess');



        if (isLoggedIn === null) {
            $location.path('/login');
        }


        $scope.seaOption = { id: 0, name: '' };

        $http({
            method: 'POST',
            url: 'php/index.php?action=get&name=newsOne',
            data: 'id=' + $stateParams.id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function( response ){
            $scope.news = response.data[0];
            console.log( 'News - ', $scope.news );
            $scope.selected = currentOption( $scope.news.sea_ID );
        }, function( response ){

        });

        var currentOption = function( id ){
            var log = [];
            angular.forEach( $scope.seas ,function(value){
                if( value.id === id ){
                    this.push(value);
                }
            },log);
            return log[0];
        };

        $scope.FormEditSuccess = false;

        $scope.list = {};

        $scope.submit = function() {
             console.log( 'tfhis - ', this);
             $scope.list.news_ID = this.news.news_ID;
             $scope.list.news_desc = this.news.news_description;
             $scope.list.news_name = this.news.news_name;

             $scope.list.news_sea_ID = this.selected.id;

             console.log('LIST - ', $scope.list);
             console.log('LIgSTt - ',JSON.stringify( $scope.list ));

             $http({
             method: 'POST',
             url: 'php/index.php?action=edit&name=news',
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


