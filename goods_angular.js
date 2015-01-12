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



/////////

// DIrectives with Controller As Syntax:

// using: <div my-example max="77"></div>
angular
    .module('app')
    .directive('myExample', myExample);

function myExample() {
    var directive = {
        restrict: 'EA',
        templateUrl: 'app/feature/example.directive.html',
        scope: {
            max: '='
        },
        link: linkFunc,
        controller: ExampleController,
        controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
        console.log('LINK: scope.max = %i', scope.max);
        console.log('LINK: scope.vm.min = %i', scope.vm.min);
        console.log('LINK: scope.vm.max = %i', scope.vm.max);
    }
}

ExampleController.$inject = ['$scope'];

function ExampleController($scope) {
    // Injecting $scope just for comparison
    var vm = this;

    vm.min = 3; 
    vm.max = $scope.max; 
    console.log('CTRL: $scope.max = %i', $scope.max);
    console.log('CTRL: vm.min = %i', vm.min);
    console.log('CTRL: vm.max = %i', vm.max);
}

// Read more: https://github.com/johnpapa/angularjs-styleguide
