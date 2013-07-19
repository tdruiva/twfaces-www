angular.module('facesQuizApp.service').
	service('thoughtworkers',['$q', '$http','$timeout', function($q, $http, $timeout){

		var query_deferred;

		// public
		this.query = function(){
			if( this.shouldQuery() ){
				this.queryPeople();
			}
			return query_deferred.promise;
		}

		// private
		this.shouldQuery = function(){
			return query_deferred === undefined;
		}
		this.queryPeople = function(){

			query_deferred = $q.defer();

			$http.get('api/thoughtworkers.json').
				success(function(response, status, headers, config){
					$timeout(function(){
						query_deferred.resolve(response);
					}, 0);
				}).
				error(function(response, status, headers, config){
					query_deferred.reject(response, status)
				});
		}

	}]);