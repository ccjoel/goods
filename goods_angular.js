var underscore = angular.module('underscore', []);

underscore.factory('_', function() {
  return window._; 
  //Underscore must already be loaded on the page
});

var app = angular.module('app', ['underscore']);

app.controller('MainCtrl', ['$scope', '_', function($scope, _) {
  init = function() {
    _.keys($scope);
  } 
    init();
    
}]);

//Read more at http://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make#TWPDLE5rqJOVgMli.99
