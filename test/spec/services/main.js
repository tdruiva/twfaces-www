'use strict';

describe('Services', function () {
  var game;
  // load the controller's module
  beforeEach(module('facesOfThoughtworksQuizApp.service'));

  describe('game', function() {
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

});
