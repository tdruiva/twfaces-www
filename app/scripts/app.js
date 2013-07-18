'use strict';

angular.module('facesOfThoughtworksQuizApp', ['facesOfThoughtworksQuizApp.service'])
  .config(function ($routeProvider) {
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
  });
