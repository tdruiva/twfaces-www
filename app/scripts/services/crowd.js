angular.module('facesQuizApp.service').
	factory('Crowd',['$cookieStore', 'ArrayCollection', 'ArrayFilter',
		function($cookieStore, ArrayCollection, ArrayFilter){

			var Crowd = function(allPeople, ignoredPeople){
				var that = this;

				this.all = new ArrayCollection(allPeople || []);
				this.ignoredPeople = new ArrayCollection(ignoredPeople || []);
				this.avaliablePeople = new ArrayCollection([]);

				this.all.each(function(person){
					if( that.ignoredPeople.notContains(person) ){
						that.avaliablePeople.add(person)
					}
				});

			}

			Crowd.prototype.size = function() {
				return this.all.size();
			};

			Crowd.prototype.isThereAnyAvaliablePeople = function() {
				return this.ignoredPeople.size() < this.all.size();
			};

			Crowd.prototype.getOneAvaliable = function() {
				return this.avaliablePeople.getRandom();
			};

			Crowd.prototype.isPersonIgnored = function(person) {
				return this.avaliablePeople.notContains(person) &&
								this.ignoredPeople.contains(person);
			};

			Crowd.prototype.sample = function(size, gender) {
				return (gender) ? this.sampleOfGender(size, gender) : this.sampleOfEveryone(size);
			};

			Crowd.prototype.sampleOfEveryone = function(size) {
				return this.all.sample(size);
			};

			Crowd.prototype.sampleOfGender = function(size, gender) {
				var sample = new ArrayCollection();
				while(sample.size() < size){

					var person = this.all.getRandom();
					if( sample.notContains(person) && person.gender === gender){
						sample.add(person);
					}
				}
				return sample;
			};

			Crowd.prototype.ignore = function(person){
				this.ignoredPeople.add(person);
				this.avaliablePeople.remove(person);
				this.save();
			}

			//private
			Crowd.prototype.save = function(first_argument) {
				$cookieStore.put('ignored_people', this.ignoredPeople.items);
			};

			Crowd.prototype.reset = function(first_argument) {
				$cookieStore.remove('ignored_people');
			};


			return Crowd;
		}]);