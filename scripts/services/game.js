angular.module('facesQuizApp.service').
	factory('Game', ['$cookieStore', 'statistics', 'Crowd',
		function ($cookieStore, statistics, Crowd) {

		var Game = function(thoughtworkers){
			this.statistics = statistics;
			this.people = new Crowd(thoughtworkers, $cookieStore.get('ignored_people'));
			if(this.people.isThereAnyAvaliablePeople()){
				this.start();
			} else {
				this.endGame();
			}
		}

		Game.prototype.start = function() {
			this.ended = $cookieStore.get('ended') || false;
			this.nextTurn();
		};

		Game.prototype.reset = function() {
			this.ended = false;
			this.statistics.reset();
			this.people.reset();
		};

		Game.prototype.guessPerson = function(person) {
			var missed = true;
			if( this.isRightGuess(person) ){
				this.point();
				this.endTurn();
				missed = false;
			} else {
				this.mistake();
			}
			return !missed;
		};

		//private
		Game.prototype.isRightGuess = function(person) {
			return person === this.challengePerson;
		};
		Game.prototype.point = function() {
			this.statistics.point();
			this.people.ignore(this.challengePerson);
		};

		Game.prototype.mistake = function() {
			this.statistics.mistake();
		};

		Game.prototype.endTurn = function() {

			if(this.people.isThereAnyAvaliablePeople()){
				this.nextTurn();
			} else {
				this.endGame();
			}
		};

		Game.prototype.endGame = function(first_argument) {
			this.ended = true;
			$cookieStore.get('ended', true);
		};

		Game.prototype.nextTurn = function(first_argument) {
			this.challengePerson = this.people.getOneAvaliable();
			this.challengeGroup = this.people.sample(4, this.challengePerson.gender);


			if(this.challengeGroup.notContains( this.challengePerson )){
				this.challengeGroup.remove( this.challengeGroup.getLast() );
				this.challengeGroup.add( this.challengePerson );
			}
		};

		return Game;

	}]);