myApp.factory('actionTypeFactory', ['$resource', '$location', function($resource, $location){
  return $resource($location.protocol() + '://'+ $location.host() +':'+  $location.port()  +'82/somelocation');
}]);