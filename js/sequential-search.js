var sequential = {
  type: function (cartaClicada) {
      cartaClicada.className = 'card-padding hide';
      if (ANIMATION.cenario[3] === 'sequencial-d') {
          sequential.search(cartaClicada, getRandomInt(0, 12));
      } else {
          sequential.search(cartaClicada, 0);
      }
  },

  search: function (cartaClicada, i) {

    i = ANIMATION.cenario[3] == 'sequencial-d' ? i : 0;

    var cartaVirada = document.createElement('img');
    cartaVirada.setAttribute('src', ANIMATION.naipe[i][0]);
    cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn');
    ANIMATION.cartas.insertBefore(cartaVirada, cartaClicada);

      if (ANIMATION.naipe[i][1] == ANIMATION.cenario[1]) {
          feedback.found(cartaVirada);
      } else if (cartaClicada == ANIMATION.cartas.lastChild) {
          feedback.notFound(cartaVirada, cartaClicada);
      } else if (+ANIMATION.naipe[i][1] > +ANIMATION.cenario[1] && ANIMATION.cenario[3] === 'sequencial-o') {
          i = +ANIMATION.cenario[1] + 1;
          feedback.hasPassed(cartaVirada, i);
      } else {
          feedback.continue(cartaVirada, cartaClicada);
      }
      if(i == 0) {
        ANIMATION.naipe.splice(0, 1);
      }
  }
}
