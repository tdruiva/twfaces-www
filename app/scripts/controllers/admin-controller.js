angular.module('facesQuizApp').

	controller('AdminOfficeCtrl',['$scope', '$http', function($scope, $http){
		var backupName, backupSlug;

		$scope.state = 'loading';

		$http.get('api/offices').
			success(function(offices){
				$scope.state = 'ok';
				$scope.offices = offices;
			}).
			error(function(){
				$scope.state = 'failure';
			});


		$scope.model = {};
		$scope.model.office = {};

		$scope.cancel = function(){
			$scope.model.office.name = backupName;
			$scope.model.office = {};
		}

		$scope.edit = function(office){
			$scope.model.office = office;
			backupName = office.name;
			backupSlug = office.slug;
		}

		$scope.save = function(){
			$scope.state = 'saving';
			$http.put('api/offices/'+ $routeParams.office.slug, $scope.model.office).
				success(function(){
					$scope.model.office = {};
					$scope.state = 'ok';
				}).
				error(function(){
					$scope.state = 'failure';
				});
		}

		$scope.delete = function(){
			$scope.state = 'deleting';
			$http.delete('api/offices/'+ $scope.model.office.slug + ".json").
				success(function(){
					var idx = $scope.offices.indexOf($scope.model.office);
					$scope.offices.splice(idx, 1);
					$scope.model.office = {};
					$scope.state = 'ok';
				}).
				error(function(){
					$scope.state = 'failure';
				});
		}

		$scope.create = function(){
			$scope.state = 'create';
			$http.post('api/offices', $scope.model.office).
				success(function(savedPerson){
					$scope.model.office = {};
					$scope.offices.push(savedPerson);
					$scope.state = 'ok';
				}).
				error(function(){
					$scope.state = 'failure';
				});
		}


	}]).


	controller('AdminPeopleCtrl',['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
		var backupName;

		$scope.state = 'loading';

		$http.get('api/offices/'+ $routeParams.office + '.json').
			success(function(office){
				$scope.state = 'ok';
				$scope.office = office;
			}).
			error(function(){
				$scope.state = 'failure';
			});

		$scope.model = {};
		$scope.model.person = {};

		$scope.cancel = function(){
			$scope.model.person.name = backupName;
			$scope.model.person = {};
		}

		$scope.edit = function(person){
			$scope.model.person = person;
			backupName = person.name;
		}

		$scope.save = function(){
			$scope.state = 'saving';
			$http.put('api/offices/'+ $routeParams.office +'/people.json', $scope.model.person).
				success(function(){
					$scope.model.person = {};
					$scope.state = 'ok';
				}).
				error(function(){
					$scope.state = 'failure';
				});
		}

		$scope.delete = function(){
			$scope.state = 'deleting';
			$http.delete('api/offices/'+ $routeParams.office +'/people.json', {data: $scope.model.person}).
				success(function(){
					var idx = $scope.office.people.indexOf($scope.model.person);
					$scope.office.people.splice(idx, 1);
					$scope.model.person = {};
					$scope.state = 'ok';
				}).
				error(function(){
					$scope.state = 'failure';
				});
		}

		$scope.create = function(){
			$scope.state = 'create';
			$http.post('api/offices/'+ $routeParams.office +'/people.json', $scope.model.person).
				success(function(savedPerson){
					$scope.model.person = {};
					$scope.office.people.push(savedPerson);
					$scope.state = 'ok';
				}).
				error(function(){
					$scope.state = 'failure';
				});
		}
	}]);