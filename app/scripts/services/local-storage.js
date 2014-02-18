angular.module('facesQuizApp.service').
	service('localStorage', ['$cookieStore', function ($cookieStore) {

		this.clearSavedPeople = function(officeName){
			$cookieStore.remove(officeName + '_recognized_people');
		}

		this.getSavedPeople = function(officeName){
			return $cookieStore.get(officeName + '_recognized_people') || [];
		}

		this.savePerson = function(officeName, person){
			var people = this.getSavedPeople(officeName);
			people.push(person.id);

			$cookieStore.put(officeName + '_recognized_people', people);
		}

		this.saveEndGame = function(officeName){
			$cookieStore.put(officeName + 'ended', true);
		}

		this.clearEndGame = function (officeName) {
			$cookieStore.put(officeName + 'ended', false);
		}

	}]);