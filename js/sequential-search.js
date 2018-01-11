var sequential = {
  type: function (cartaClicada) {
      cartaClicada.className = 'card-padding hide';
      if (ANIMATION.cenario[3] === 'sequencial-d') {
          sequential.search(cartaClicada, 0);
      } else {
          sequential.search(cartaClicada, 0);
      }
  },

  search: function (cartaClicada, i) {

    var i = +ANIMATION.cartas.getAttribute('data-index') || 0;

    var cartaVirada = document.createElement('img');
    cartaVirada.setAttribute('src', ANIMATION.naipe[i][0]);
    cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn');
    ANIMATION.cartas.insertBefore(cartaVirada, cartaClicada);

      if (ANIMATION.naipe[i][1] == ANIMATION.cenario[1]) {
          feedback.found(cartaVirada);
      } else if (cartaClicada == ANIMATION.cartas.lastChild) {
          feedback.notFound(cartaVirada, cartaClicada);
      } else if (+ANIMATION.naipe[i][1] > +ANIMATION.cenario[1] && ANIMATION.cenario[3] === 'sequencial-o') {
          var j = +ANIMATION.cenario[1] + 1;
          feedback.hasPassed(cartaVirada, j);
      } else {
          feedback.continue(cartaVirada, cartaClicada);
      }
      ANIMATION.cartas.setAttribute('data-index', ++i);
  }
}
