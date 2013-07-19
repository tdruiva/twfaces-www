describe('crowd', function(){
  var crowd;

  // load the module
  beforeEach(module('facesQuizApp.service'));

  beforeEach(inject(function($injector){
    var Crowd = $injector.get('Crowd'),
        everyone = [
          { "name":"Bill Gates", "gender": "M", "picture":"http://www.winbeta.org/sites/default/files/newsimages/billgates.jpg" },
          { "name":"Steve Jobs", "gender": "M", "picture":"http://www.biography.com/imported/images/Biography/Images/Profiles/J/Steven-Jobs-9354805-2-402.jpg" },
          { "name":"Linus", "gender": "M", "picture":"https://lh6.googleusercontent.com/-NiPyywVIsoY/Thf27LvrMRE/AAAAAAAAMCw/J96w8wgXMwM/s250-c-k-no/ProfilePhotos" },
          { "name":"Mark Mark-Zuckerberg", "gender": "M", "picture":"http://www.biography.com/imported/images/Biography/Images/Profiles/Z/Mark-Zuckerberg-507402-1-402.jpg" },
          { "name":"Tina Turner", "gender": "F", "picture":"http://images4.wikia.nocookie.net/__cb20100415160748/fairlyoddparents/en/images/7/7a/ImgTina_Turner3.jpg" },
          { "name":"Angela Merkel", "gender": "F", "picture":"http://i.dailymail.co.uk/i/pix/2013/05/22/article-0-19EDEBB3000005DC-32_306x423.jpg" },
          { "name":"Queen", "gender": "F", "picture":"http://i.telegraph.co.uk/multimedia/archive/01767/queen_1767138c.jpg" },
          { "name":"Palmerinha", "gender": "F", "picture":"http://contigo.abril.com.br/blog/chiado/files/2010/09/palmirinha_olha550.jpg" }
        ],
        ignoredPeople = everyone[0];

    crowd = new Crowd(everyone, ignoredPeople);
  }));

  it('should return avaliable people', function(){
    expect(crowd.avaliablePeople.size(), 7)
  });

  it('should return ignored people', function(){
    expect(crowd.ignoredPeople.size(), 1);
  });

  it('should return a random avaliable person', function(){
    var notIgnoredPerson = crowd.getOneAvaliable();
    expect( crowd.isPersonIgnored(notIgnoredPerson) ).toBeFalsy();
  });

  it('should return a sample of X random people whatever ignored or not by gender', function(){
    var total = 0;

    crowd.sample(3, 'M').each(function(man){
      expect( man.gender ).toBe('M');
      total++;
    });

    crowd.sample(3, 'F').each(function(man){
      expect( man.gender ).toBe('F');
      total++;
    });

    expect(total).toEqual(6);

  });

  it('should ignore someone', function(){
    var notIgnoredPerson = crowd.getOneAvaliable();
    crowd.ignore( notIgnoredPerson );

    expect(crowd.avaliablePeople.size(), 6);
    expect(crowd.ignoredPeople.size(), 2);

    expect( crowd.isPersonIgnored( notIgnoredPerson ) ).toBeTruthy();
  });

  // it('should give a random group with X men not ignored yet', function(){

  // });

  // it('should give a random group with X women not ignored yet', function(){

  // });

});