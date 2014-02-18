angular.module('facesQuizApp').
	controller('GameCtrl', ['$scope', '$http', '$routeParams', 'localStorage' ,'Game',
		function ($scope, $http, $routeParams, localStorage, Game) {
			var game, mistakes, miniFaces = [];

			$http.get('api/offices/'+ $routeParams.office + ".json")
        .success(function(office){

          $scope.office = office;
					$scope.game = new Game(office.slug, office.people, findRecognizedPeople(office.people));

					$scope.game.on('start', function(){
						cleanMistakes();
					});

					$scope.game.on('turn', function(){
						cleanMistakes();
					});

					$scope.game.on('point', function(){
						saveRecognizedPeople();
						cleanMistakes();
						saveMiniFace()
					});

					$scope.game.on('reset', function(){
						localStorage.clearEndGame($scope.office.name);
						deleteRecognizedPeople();
					});

					$scope.game.on('gameover', function(){
						localStorage.saveEndGame($scope.office.name);
					});

					if(office.people.length > 4){
						$scope.game.start();
					}

        })
        .error(function(data, status){
          $scope.failure = true;
        });

			$scope.reset = function(){
				$scope.game.reset();
			};

			$scope.guess = function(person, index){
				if(mistakes[index]) { return; }

				mistakes[index] = 'miss';
				$scope.game.guessPerson(person);
			};

			$scope.cssFaceAt = function(index){
				return mistakes[index];
			}

			$scope.cssMiniFaceAt = function(index){
				return miniFaces[index];
			}

			function saveMiniFace(){
				$scope.foundIndex = $scope.game.challengePersonIndex();
				miniFaces[$scope.foundIndex] = 'fadeIn'
			}

			function cleanMistakes(){
				mistakes = [];
			}

			function deleteRecognizedPeople(){
					localStorage.clearSavedPeople($scope.office.slug);
					miniFaces = [];
			}

			function saveRecognizedPeople(){
				localStorage.savePerson($scope.office.slug, $scope.game.challengePerson);
			}

			function findRecognizedPeople(everyone){
				var recognizedIds = localStorage.getSavedPeople($scope.office.slug),
						recognized = [];

				for (var i = 0; i < everyone.length; i++) {
					if(recognizedIds.indexOf(everyone[i].id) >= 0 ){
						recognized.push(everyone[i]);
						miniFaces[i] = 'fadeIn'
					}
				}
				return recognized;
			}

		}]);