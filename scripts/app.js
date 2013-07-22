'use strict';

//module definition
angular.module('facesQuizApp.service', ['ngCookies', 'collection']);

angular.module('facesQuizApp', ['facesQuizApp.service'])
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
