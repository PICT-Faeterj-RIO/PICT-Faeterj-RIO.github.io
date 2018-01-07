var feedback = {
  found: function(cartaVirada) {
      cartaVirada.setAttribute('class', 'card-padding card-size animated jello');
      setTimeout(function() {
          alert('Carta encontrada :), substituir por modal explicativo ...');
      }, 500);
  },

  notFound: function(cartaVirada, cartaClicada) {
      setTimeout(function() {
          cartaVirada.setAttribute('class', 'card-padding card-size hide animated fadeOut');
          cartaClicada.setAttribute('class', 'card-padding card-size show animated fadeIn');
          alert('Carta não foi encontrada :/, substituir por modal explicativo ...');
      }, 1500);
  },

  hasPassed: function(cartaVirada, i) {
      cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn');
      cartaVirada.setAttribute('id', 'lastValidCard');
      setTimeout(function() {
          alert('Não é necessário continuar, pois ' + i + ' é maior do que a carta procurada :/, substituir por modal explicativo ...');
      }, 500);
  },

  continue: function (cartaVirada, cartaClicada) {
      ANIMATION.ultimaCartaClicada = cartaVirada;
      setTimeout(function() {
          cartaClicada.nextSibling.setAttribute('class', 'card-padding animated pulse infinite');
          setTimeout(function() {
              cartaVirada.setAttribute('class', 'card-padding card-size hide animated fadeOut');
              cartaClicada.setAttribute('class', 'card-padding card-size show animated fadeIn');
          }, 1500);
      }, 100);
  },

  required: function() {
    alert('Preencha o cenário corretamente.');
  },

  requiredForOrderedSearch: function() {
    alert('Como a busca sequencial ordenada ou binária so envolve cartas númericas, só é' +
      ' permitido cartas no intervalo de 4 a 9 :/');
  },

  alreadyFound: function() {
    alert('Carta já foi encontrada, tente outra busca.. substituir por modal explicativo ...');
  },

  neverFound: function() {
    alert('Carta não foi encontrada :/, substituir por modal explicativo ...');
  },

  isSequential: function() {
    alert('Oops, lembre-se que a busca é sequencial ;), substituir por modal explicativo ...');
  }
}
