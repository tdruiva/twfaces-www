angular.module('facesQuizApp.service').
	factory('Statistics', ['$cookieStore',function ($cookieStore) {

		var Statistics = function(name){
			this.name = name;
			this.load();
			this.update();
		}

		//public
		Statistics.prototype.point = function(){
			this.score++;
			this.update();
			this.save();
		}

		Statistics.prototype.mistake = function(){
			this.mistakes++;
			this.update();
			this.save();
		}

		Statistics.prototype.update = function() {
			this.percentage = (100 / (this.score + this.mistakes) ) * this.score || 0;
		};

		Statistics.prototype.reset = function(){
			this.score = 0;
			this.mistakes = 0;
			this.update();
			this.save(this);
		}

		//private
		Statistics.prototype.load = function() {
			if(this.isPersisted()){
				this.loadStatistics()
			} else {
				this.createStatistics();
			}
		}

		Statistics.prototype.save = function(){
			$cookieStore.put(this.name+'_score', this.score);
			$cookieStore.put(this.name+'_mistakes', this.mistakes);
		}

		Statistics.prototype.isPersisted = function(){
			return  $cookieStore.get(this.name+'_score') !== undefined &&
					$cookieStore.get(this.name+'_mistakes') !== undefined
		}

		Statistics.prototype.loadStatistics = function(){
			this.score = $cookieStore.get(this.name+'_score');
			this.mistakes = $cookieStore.get(this.name+'_mistakes');
		}

		Statistics.prototype.createStatistics = function(){
			this.reset();
		}

		return Statistics;

	}]);