var sequential = {
  type: function (cartaClicada) {
      cartaClicada.className = 'card-padding hide';
      if (ANIMATION.cenario[3] === 'sequencial-d') {
          sequential.search(cartaClicada, getRandomInt(0, 12));
      } else {
          sequential.search(cartaClicada, ANIMATION.indiceIncremental++);
      }
  },

  search: function (cartaClicada, i) {
    var cartaVirada = document.createElement('img');

    cartaVirada.setAttribute('src', ANIMATION.naipe[i][0]);
    cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn');
    ANIMATION.cartas.insertBefore(cartaVirada, cartaClicada);

      /* Se a carta escolhida for de número 2 e a busca for ordenada, cria a
      possiblidade desta carta não ser encontrada */
      if(ANIMATION.cenario[1] == 2 && ANIMATION.cenario[3] === 'sequencial-o') {
              i = getRandomInt(0,2) === 0 ? i : i+1;
              ANIMATION.numCartas = 0;
      }

      // Cria a possiblidade da carta não ser encontrada
      if (ANIMATION.naipe[i + 1][1] == ANIMATION.cenario[1]) {
          ANIMATION.indiceIncremental = getRandomInt(0,2) === 0 ?
              ANIMATION.indiceIncremental :
              ANIMATION.indiceIncremental + 1;
      }

      if (ANIMATION.naipe[i][1] == ANIMATION.cenario[1]) {
          feedback.found(cartaVirada);
          ANIMATION.ultimaCartaClicada = ANIMATION.naipe[i][1];
          ANIMATION.numCartas = ANIMATION.cartas.childNodes.length;
          ANIMATION.indiceIncremental = 0;
      } else if (cartaClicada == ANIMATION.cartas.lastChild) {
          feedback.notFound(cartaVirada, cartaClicada);
          ANIMATION.indiceIncremental = 0;
      } else if (+ANIMATION.naipe[i][1] > +ANIMATION.cenario[1] && ANIMATION.cenario[3] === 'sequencial-o') {
          feedback.hasPassed(cartaVirada, i);
          ANIMATION.indiceIncremental = 0;
      } else {
          feedback.continue(cartaVirada, cartaClicada);
      }
  }
}
