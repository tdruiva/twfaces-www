'use strict';

angular.module('facesQuizApp')
  .controller('MainCtrl', ['$scope', 'Game', 'thoughtworkers', function ($scope, Game, thoughtworkers) {

    $scope.mistakes = {};

    $scope.loading = true;


    thoughtworkers.query().then(
    	function(people){
    		$scope.game = new Game(people);
    		$scope.loading = false;
            resetClasses();
    	},
    	function(){
			$scope.loading = false;
			$scope.failure = true;
    	});

    $scope.guess = function(person){

        if( $scope.game.guessPerson(person) === false){
            if(!person.mistakeAnimation)
                person.mistakeAnimation = getMissAnimation();
        } else {
            resetClasses();
        }
    }

    $scope.reset = function(){
        $scope.game = new Game(thoughtworkers);
    }

    var resetClasses = function(){
        $scope.game.challengeGroup.each(function(person){
            person.mistake = false;
        });
    }
    var getMissAnimation = function(){

        var animations = ['hinge', 'shake', 'fadeOutUp']
        return 'miss ' + animations[parseInt(Math.random() * animations.length)];
    }

  }]);
