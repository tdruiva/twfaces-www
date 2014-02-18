'use strict';

angular.module('facesQuizApp').
	directive('twScrollTo', [function(){
		return {
			link: function (scope, element, attrs) {
				scope.$watch(function(scope){
					return scope.$eval(attrs.twScrollTo);
				}, function( scrollIndex ){

					var children = element.children(),
							idx = parseInt(scrollIndex,10),
							target;

					if(idx >= 0 && children.length > 0){
						target = angular.element(children[idx]);

						element.animate({ scrollTop: ((idx/6) * 60) - 60});
					}
				});
			}
		}
	}]).

	controller('HomeCtrl',['$scope', '$http', 'ArrayCollection', function($scope, $http, ArrayCollection){

		$scope.model = {
			offices : [],
			selected : undefined
		}

		$http.get('api/offices.json').then(function(response){
			$scope.model.offices = new ArrayCollection(response.data);
			$scope.model.offices.shuffle();
		});

	}]).

	controller('AvatarUploadCtrl', ['$scope', function($scope){

	}]);
