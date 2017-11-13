describe('JSON object state', function(){

  it('Should return undefined reference before calling JSON API', function() {
    expect(ANIMATION.jsonObj).toEqual('undefined');
  });

  it('Should return a reference to JSON file calling JSON API', function() {
    carregarJSON(callback);
    expect(ANIMATION.jsonObj).not.toBe(null);
  });

  it('Should not return undefined reference after calling JSON API', function() {
    expect(ANIMATION.jsonObj).not.toEqual('udefined');
  });

});


describe('Spy on \'type method\'', function() {
  it('Should  spy on \'type method\' of sequential search', function() {
    spyOn(sequential, 'type');
    sequential.type(null);
    expect(sequential.type).toHaveBeenCalledWith(null);
  });

});
