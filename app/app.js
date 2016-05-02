var myApp = angular.module('guestApp',['ngRoute','LocalStorageModule','ngMap','ui.bootstrap','angulike']).run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '[FacebookAppId]'; // set your facebook app id here
      }
  ]);