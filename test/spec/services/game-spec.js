describe('game', function() {
  var game, mock_people;

  mock_people = [
    { "name":"Bill Gates", "gender": "M", "picture":"http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg" },
    { "name":"Steve Jobs", "gender": "M", "picture":"http://www.biography.com/imported/images/Biography/Images/Profiles/J/Steven-Jobs-9354805-2-402.jpg" },
    { "name":"Linus", "gender": "M", "picture":"https://lh6.googleusercontent.com/-NiPyywVIsoY/Thf27LvrMRE/AAAAAAAAMCw/J96w8wgXMwM/s250-c-k-no/ProfilePhotos" },
    { "name":"Mark Mark-Zuckerberg", "gender": "M", "picture":"http://www.biography.com/imported/images/Biography/Images/Profiles/Z/Mark-Zuckerberg-507402-1-402.jpg" },
    { "name":"Tina Turner", "gender": "F", "picture":"http://images4.wikia.nocookie.net/__cb20100415160748/fairlyoddparents/en/images/7/7a/ImgTina_Turner3.jpg" },
    { "name":"Angela Merkel", "gender": "F", "picture":"http://i.dailymail.co.uk/i/pix/2013/05/22/article-0-19EDEBB3000005DC-32_306x423.jpg" },
    { "name":"Queen", "gender": "F", "picture":"http://i.telegraph.co.uk/multimedia/archive/01767/queen_1767138c.jpg" },
    { "name":"Palmerinha", "gender": "F", "picture":"http://contigo.abril.com.br/blog/chiado/files/2010/09/palmirinha_olha550.jpg" }
  ];

  // load the module
  beforeEach(module('facesQuizApp'));

  // setup services e mock expectation
  beforeEach(inject(function($injector) {
    var thoughtworkers = $injector.get('thoughtworkers'),
        Game = $injector.get('Game');

    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.expectGET('api/thoughtworkers.json').respond(mock_people);

    //feed the collection
    thoughtworkers.query().then(function(people){
      game = new Game(people);
    });

    $httpBackend.flush();

  }));


  it('should tell the person to be recognized in the turn', function(){
    expect(game.challengePerson).toBeDefined();
  });

  it('should give four people where the challenge person where in', function(){
    expect(game.challengeGroup.size()).toBe(4);
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
    };

    //falta uma jogada para fechar
    expect( game.ended ).toBeFalsy();
    game.guessPerson( game.challengePerson );

    expect( game.ended ).toBeTruthy();
    expect( game.statistics.score ).toEqual(0);
  });

});




