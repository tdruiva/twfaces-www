angular.module('collection', []).
	filter('shuffle', function() {
      var shuffledArr = [],
          shuffledLength = 0;
      return function(o) {
      	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  		return o;
      };
  }).
	factory('ArrayFilter', ['ArrayCollection', function (ArrayCollection) {
		var fn;
		var ArrayFilter = function(filterFN){
			fn = filterFN;
		}

		ArrayFilter.prototype.execute = function(collection) {
			var filteredCollection = new ArrayCollection();

			collection.each(function(referenceItem){
				if( fn(referenceItem) )
					filteredCollection.add(referenceItem);
			});

			return filteredCollection;
		};
		return ArrayFilter;
	}]).


	factory('ArrayCollection',['$filter', function($filter){

		var ArrayCollection = function(items){
			this.items = (items && items.slice)? items.slice() : [];
		}

		ArrayCollection.prototype.isEmpty = function() {
			return this.size() === 0;
		};

		ArrayCollection.prototype.size = function() {
			return this.items.length;
		};

		ArrayCollection.prototype.add = function(item){
			this.items.push(item);
		};

		ArrayCollection.prototype.remove = function(item){
			var index = this.itemIndex(item);
			this.items.splice(index, 1);
		};

		ArrayCollection.prototype.getAt = function(idx){
			return this.items[idx];
		};

		ArrayCollection.prototype.getNext = function(refenceItem){
			var nextIndex = this.itemIndex(refenceItem) + 1;
			return this.getAt( nextIndex );
		};

		ArrayCollection.prototype.getPrevious = function(refenceItem){
			var previousIndex = this.itemIndex(refenceItem) - 1;
			return this.getAt( previousIndex );
		};

		ArrayCollection.prototype.getLast = function(){
			return this.getAt( this.size() - 1 );
		};

		ArrayCollection.prototype.haveNext = function(referenceItem){
			return this.itemIndex(referenceItem)+1 < this.size();
		};

		ArrayCollection.prototype.havePrevious = function(referenceItem){
			return this.itemIndex(referenceItem) > 0;
		};

		ArrayCollection.prototype.contains = function(referenceItem) {
			return this.itemIndex(referenceItem) >= 0;
		};

		ArrayCollection.prototype.itemIndex = function(referenceItem) {
			var idx = this.items.indexOf(referenceItem);

			if( idx >= 0 ) return idx;

			for (var i = 0; i < this.items.length; i++) {
				if( this.items[i].hasOwnProperty('id') && referenceItem.hasOwnProperty('id') && this.items[i].id === referenceItem.id){
					idx = i;
					break;
				}
			};

			return idx;
		};

		ArrayCollection.prototype.notContains = function(referenceItem) {
			return !this.contains(referenceItem);
		};

		ArrayCollection.prototype.getRandom = function() {
			return this.getAt( Math.floor( Math.random() * this.size() ) );
		};

		ArrayCollection.prototype.each = function(fn) {
			for (var i = 0; i < this.size(); i++) {
				var referenceItem = this.getAt(i);
				fn.call(this, referenceItem );
			};
		};

		ArrayCollection.prototype.shuffle = function() {
			this.items = $filter('shuffle')(this.items);
		};

		ArrayCollection.prototype.sample = function(size) {
			var sample = new ArrayCollection( this.items );
			sample.shuffle();
			sample.items = sample.items.splice(0, size);
			return sample;
		};


		return ArrayCollection;
	}]);