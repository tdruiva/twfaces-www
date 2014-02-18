describe('Collection: ', function(){

	beforeEach(module('collection'));

	describe('Array Filter', function(){
		var filter;

		beforeEach(inject(function(ArrayFilter, ArrayCollection){
			var collection = new ArrayCollection(['value1','value2','value3', 'value4', 'value5', 'value6', 'value7']);
			var filter = new ArrayFilter(function(item){
				return item === 'value1';
			});

			var filteredCollection = filter.execute(collection);

			expect(filteredCollection.size()).toBe(1);
			expect(filteredCollection.getAt(0)).toBe('value1');
			expect(collection.size()).toBe(3);
		}));
	});

	describe('Array Collection',function(){
		var collection, emptyCollection;

		beforeEach(inject(function(ArrayCollection){
			collection = new ArrayCollection(['value1','value2','value3']);
			emptyCollection = new ArrayCollection();
		}));

		it('shoud tell if it is empty', function(){
			expect(emptyCollection.isEmpty()).toBeTruthy();
		});

		it('should have a size', function(){
			expect(collection.size()).toBe(3);
		});

		it('should have an array of items', function(){
			expect(collection.items).toBeDefined();
		});

		it('should add a new item', function(){
			collection.add('value4');
			expect(collection.size()).toBe(4);
		});

		it('should remove an item', function(){
			collection.remove('value2');
			expect(collection.size()).toBe(2);

		});

		it('should tell if there is a item after another', function(){
			var first = collection.getAt(0),
				last = collection.getLast();

			expect(collection.haveNext(first)).toBeTruthy();
			expect(collection.haveNext(last)).toBeFalsy();
		});

		it('should tell if there is a item before another', function(){
			var first = collection.getAt(0),
				last = collection.getLast();

			expect(collection.havePrevious(first)).toBeFalsy();
			expect(collection.havePrevious(last)).toBeTruthy();
		});

		it('should get the next element', function(){
			var first = collection.getAt(0),
				second = collection.getAt(1);

			expect(collection.getNext(first)).toBe(second);
		});

		it('should get the next element', function(){
			var first = collection.getAt(0),
				second = collection.getAt(1);

			expect(collection.getPrevious(second)).toBe(first);
		});

		it('should tells if contains a given value', function(){
			var first = collection.getAt(0),
				invalid_value = "I dont exist";

			expect(collection.contains(first)).toBeTruthy();
			expect(collection.contains(invalid_value)).toBeFalsy();
		});

		it('should return tels if not contains a given value', function(){
			var first = collection.getAt(0),
				invalid_value = "I dont exist";

			expect(collection.notContains(first)).toBeFalsy();
			expect(collection.notContains(invalid_value)).toBeTruthy();
		});

		it('should provide each interation', function(){
			var filter = jasmine.createSpy();
			collection.each(filter);

			expect(filter.callCount).toEqual(collection.size());
		});

		it('should shuffle elements', inject(function(ArrayCollection){
			var original = collection,
					target = new ArrayCollection(original.items);

			target.shuffle();

			expect( original ).not.toBe( target );

		}));

		it('should return sample of items', function(){
			var sampleOne = collection.sample(2);
			expect( sampleOne.size() ).toBe(2);
		});

		// it('should randomicaly get an item', function(){
		// 	expect( collection.getRandom() ).not.toBe( collection.getRandom() );
		// });
	});

});