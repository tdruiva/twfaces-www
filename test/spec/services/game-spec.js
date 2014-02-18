'use strict';

describe('game', function() {
  var game;


  // load the modules
  beforeEach(module('fixtures'));
  beforeEach(module('facesQuizApp'));

  // setup services e mock expectation
  beforeEach(inject(function($injector) {
    var thoughtworkers = $injector.get('thoughtworkers'),
        Game = $injector.get('Game');

    var $httpBackend = $injector.get('$httpBackend');
    $httpBackend.expectGET('api/thoughtworkers.json').respond($injector.get('people'));

    //feed the collection
    thoughtworkers.query().then(function(people){
      game = new Game('test-game', people);
      game.start();
    });

    $httpBackend.flush();

  }));


  it('should have a person to be recognized', function(){
    expect(game.challengePerson).toBeDefined();
  });

  it('should have 4 people representing the round', function(){
    expect(game.challengeGroup.size()).toBe(4);
  });

  it('selected person is one of the 4 people of the round', function(){
    expect(game.challengeGroup.contains( game.challengePerson )).toBeTruthy();
  });

  it('should score up when guess right', function(){
    expect(game.statistics.score).toBe(0);
    // do a right guess ( passing th expected value)
    game.guessPerson( game.challengePerson );
    expect(game.statistics.score).toBe(1);
  });

  it('should end game', function(){
    var numberOfPeopleToGuess = game.people.size();

    for (var i = 0; i < numberOfPeopleToGuess - 1; i++) {
      game.guessPerson( game.challengePerson );
    }

    //1 right guess to win
    expect( game.ended ).toBeFalsy();
    game.guessPerson( game.challengePerson );

    expect( game.ended ).toBeTruthy();
  });

});




