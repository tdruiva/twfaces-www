'use strict';

//module definition
angular.module('facesQuizApp.service', ['ngCookies', 'ngRoute', 'collection']);

angular.module('facesQuizApp', ['facesQuizApp.service'])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/admin/:office/people', {
        templateUrl: 'views/admin/people.html',
        controller: 'AdminPeopleCtrl'
      })
      .when('/admin/offices', {
        templateUrl: 'views/admin/office.html',
        controller: 'AdminOfficeCtrl'
      })
      .when('/game/:office', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });