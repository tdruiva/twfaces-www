'use strict';

describe('Services', function () {
  var $httpBackend;
  // load the controller's module
  beforeEach(module('facesOfThoughtworksQuizApp.service'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
  }));  

  describe('game', function() {
    var game;
    beforeEach(inject(function($injector) {
      game = $injector.get('game');   
      game.reset();
    }));

  });

  describe('statistics', function(){
    var statistics;
    beforeEach(inject(function($injector) {
      statistics = $injector.get('statistics');
      statistics.reset();         
    }));

    it('should reset statistics', function () {      
      expect(statistics.score).toEqual(0);
      expect(statistics.mistakes).toEqual(0);      
    });

    it('should score up', function() {
      statistics.point();
      expect(statistics.score).toEqual(1);
      expect(statistics.mistakes).toEqual(0);
    });

    it('should mistake up', function() {
      statistics.mistake();
      expect(statistics.score).toEqual(0);
      expect(statistics.mistakes).toEqual(1);
    });
  });

  describe('thoughtworkers', function(){
    var thoughtworkers,        
        twers_mock = [
      { picture:'http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg' },
      { picture:'http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg' },
      { picture:'http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg' },
      { picture:'http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg' }
    ];

    beforeEach(inject(function($injector) {
      thoughtworkers = $injector.get('thoughtworkers');      
      $httpBackend.expectGET('api/thoughtworkers.json').respond(twers_mock);
    }));

    it('should defered query', function(){
      var promise = thoughtworkers.query();
      expect(promise).toBeDefined();
      $httpBackend.flush();
      expect(promise.length).toEqual(4);
    });
  });

});
