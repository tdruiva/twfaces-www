'use strict';

angular.module('facesOfThoughtworksQuizApp')
  .controller('MainCtrl', ['$scope', 'game', 'thoughtworkers', function ($scope, game, thoughtworkers) {

    $scope.game = game;

    $scope.thoughtworkers = thoughtworkers.query();
    
    $scope.tryPerson = function(person){        
        game.mistake();
    }

  }]);
