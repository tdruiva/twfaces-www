angular.module('facesQuizApp.service').
	service('thoughtworkers',['$q', '$http', function($q, $http){

		var deferred;

		// public
		this.query = function(){
			if( this.shouldQuery() ){
				this.queryPeople();
			}
			return deferred.promise;
		}

		// private
		this.shouldQuery = function(){ return deferred === undefined; }

		this.queryPeople = function(){
			deferred = $q.defer();

			// var that = this;
			// var url = 'https://faces-quiz.firebaseio.com/';

			// angularFire(url, this, 'people').then(function(){
			// 	deferred.resolve( that.people );
			// });

			$http.get('api/thoughtworkers.json').
				success(function(response, status, headers, config){
					// $timeout(function(){
					// 	deferred.resolve(response);
					// }, 300);
					deferred.resolve(response);
				}).
				error(function(response, status, headers, config){
					deferred.reject(response, status)
				});
		}

	}]);