var sequential = {
  type: function (cartaClicada) {
      cartaClicada.firstChild.className = 'card-padding hide';
      sequential.search(cartaClicada, 0);
  },

  search: function (cartaClicada, i) {

    var i = +ANIMATION.cartas.getAttribute('data-index') || 0;

    var cartaVirada = document.createElement('img');
    cartaVirada.setAttribute('src', ANIMATION.naipe[i][0]);
    cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn');
    cartaClicada.insertBefore(cartaVirada, cartaClicada.firstChild);

      if (ANIMATION.naipe[i][1] == ANIMATION.cenario[1]) {
          feedback.found(cartaVirada);
      } else if (cartaClicada == ANIMATION.cartas.lastChild) {
          feedback.notFound(cartaVirada, cartaClicada);
      } else if (+ANIMATION.naipe[i][1] > +ANIMATION.cenario[1] && ANIMATION.cenario[3] === 'sequencial-o') {
          var j = ANIMATION.cenario[4] == null ? +ANIMATION.cenario[1] + 1 : ANIMATION.cenario[4];
          feedback.hasPassed(cartaVirada, j);
      } else {
          feedback.continue(cartaVirada, cartaClicada);
      }
      ANIMATION.cartas.setAttribute('data-index', ++i);
  }
}
