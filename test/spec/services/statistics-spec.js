'use strict';

describe('statistics', function () {

  var statistics;

  // load the module
  beforeEach(module('facesQuizApp'));

  beforeEach(inject(function($injector) {
    var Statistics = $injector.get('Statistics');
    statistics = new Statistics('test-statistics');
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
