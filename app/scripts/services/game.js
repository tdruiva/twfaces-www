angular.module('facesQuizApp.service').
	factory('Game', ['Statistics', 'Crowd', 'PubSub',
		function (Statistics, Crowd, PubSub) {

		var Game = function(name, people, ignoredPeople){
			this.statistics = new Statistics(name);
			this.people = new Crowd(people, ignoredPeople);
			this.name = name;
		}

		Game.prototype = new PubSub();

		Game.prototype.constructor = Game;

		Game.prototype.start = function(){
			if(this.people.isThereAnyAvaliablePeople()){
				this.firstTurn();
				this.broadcast('start', this);
			} else {
				this.endGame();
			}
		}

		Game.prototype.firstTurn = function() {
			this.ended = false;
			this.nextTurn();
		};

		Game.prototype.reset = function() {
			this.ended = false;
			this.statistics.reset();
			this.people.reset();
			this.challengePerson = undefined;
			this.challengeGroup = undefined;
			this.firstTurn();
			this.broadcast('reset', this);
		};

		Game.prototype.guessPerson = function(person) {
			if( this.isRightGuess(person) ){
				this.point();
				this.endTurn();
			} else {
				this.mistake();
			}
		};

		Game.prototype.challengePersonIndex = function() {
			return this.people.all.itemIndex(this.challengePerson);
		};

		//private
		Game.prototype.isRightGuess = function(person) {
			return person === this.challengePerson;
		};
		Game.prototype.point = function() {
			this.statistics.point();
			this.people.ignore(this.challengePerson);
			this.broadcast('point', this.challengePerson);
		};

		Game.prototype.mistake = function() {
			this.broadcast('mistake', this.challengePerson);
			this.statistics.mistake();
		};

		Game.prototype.endTurn = function() {

			if(this.people.isThereAnyAvaliablePeople()){
				this.nextTurn();
			} else {
				this.endGame();
			}
		};

		Game.prototype.endGame = function() {
			this.ended = true;
			this.broadcast('gameover', this);
		};

		Game.prototype.nextTurn = function() {
			var num = Math.min(4, this.people.all.size());
			this.challengePerson = this.people.getOneAvaliable();
			this.challengeGroup = this.people.sample(num, this.challengePerson.gender);


			if(this.challengeGroup.notContains( this.challengePerson )){
				this.challengeGroup.remove( this.challengeGroup.getLast() );
				this.challengeGroup.add( this.challengePerson );
			}

			this.challengeGroup.shuffle();

			this.broadcast('turn', this);
		};

		return Game;

	}]);