'use strict';

angular.module('facesQuizApp')
  .controller('MainCtrl', ['$scope', 'Game', 'thoughtworkers', function ($scope, Game, thoughtworkers) {

    var mistakes = [];

    $scope.loading = true;


    thoughtworkers.query().then(
    	function(people){
    		$scope.game = new Game(people);
    		$scope.loading = false;
    	},
    	function(){
			$scope.loading = false;
			$scope.failure = true;
    	});

    $scope.guess = function(person){

        if( $scope.game.guessPerson(person) ){
            mistakes.push(person);
        } else {
            mistakes = [];
        }
    }

    $scope.isMistake = function(person){
        return mistakes.indexOf(person) >= 0;
    }

    $scope.reset = function(){
        $scope.game = new Game(thoughtworkers);
    }

    $scope.getMissAnimation = function(person){
        if( $scope.isMistake(person) === false) return;

        var animations = ['hinge', 'shake', 'fadeOutUp']
        return 'miss' + animations[parseInt(Math.random() * animations.length)];
    }

  }]);
