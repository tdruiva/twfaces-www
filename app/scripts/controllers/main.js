'use strict';

angular.module('facesOfThoughtworksQuizApp')
  .controller('MainCtrl', ['$scope', 'game', function ($scope, game) {

    $scope.game = game;

    $scope.thoughtworkers = [
    {
    	picture:'http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg'
    },
    {
    	picture:'http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg'
    },
    {
    	picture:'http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg'
    },
    {
    	picture:'http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg'
    }
    ];

    $scope.tryPerson = function(person){        
        game.mistake();
    }

  }]);
