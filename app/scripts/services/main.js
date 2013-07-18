angular.module('facesOfThoughtworksQuizApp.service', ['ngCookies']).
	service('statistics', ['$cookieStore', function ($cookieStore) {
		//public
		this.reset = function(){			
			this.score = 0;
			this.mistakes = 0;			
			this.save(this);
		}

		this.point = function(){
			this.score ++;
			this.save();
		}

		this.mistake = function(){
			this.mistakes ++;
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
	}]).
	service('thoughtworkers',['$q', '$http', function($q, $http){
		var deferred = $q.defer();
		this.query = function(){
			$http.get('api/thoughtworkers.json').
				success(function(data, status, headers, config){
					deferred.resolve(data);
				}).
				error(function(data, status, headers, config){
					deferred.reject(status, headers)
				});

			return deferred.promise;	
		}
	}]).	
	service('game', ['$cookieStore', 'statistics', function ($cookieStore, statistics) {
		
		//public
		this.statistics = statistics
		
		this.recognizePerson = function(twer_id){
			this.score++;
			this.recoginizePersonIfNecessary(twer_id)
			this.save();
		}

		//private
		this.recoginizePersonIfNecessary = function(twer_id){
			if( this.recognizedPeople.indexOf(twer_id) < 0){
				this.recognizedPeople.push(twer_id);
			}
		}		

	}]);