angular.module('facesQuizApp.service').
	service('statistics', ['$cookieStore', function ($cookieStore) {
		//public
		this.reset = function(){
			this.score = 0;
			this.mistakes = 0;
			this.save(this);
		}

		this.point = function(){
			this.score++;
			this.save();
		}

		this.mistake = function(){
			this.mistakes++;
			this.save();
		}

		//private
		this.save = function(){
			$cookieStore.put('score', this.score);
			$cookieStore.put('mistakes', this.mistakes);
		}

		this.initialize = function(){
			if(this.isPersisted()){
				this.loadStatistics()
			} else {
				this.createStatistics();
			}
		}

		this.isPersisted = function(){
			return  $cookieStore.get('score') !== undefined &&
					$cookieStore.get('mistakes') !== undefined
		}

		this.loadStatistics = function(){
			this.score = $cookieStore.get('score');
			this.mistakes = $cookieStore.get('mistakes');
		}

		this.createStatistics = function(){
			this.reset();
		}

		this.initialize();
	}]);