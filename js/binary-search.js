var binary = {
  type: function() {
    // needs to be implemented
  },

  message: function message(string) {
    alert(string);
  },

  search: function(cartaClicada) {

    var conjuntoCartas = document.querySelector('.cards');
    var n = conjuntoCartas.childNodes.length;
    var primeiro = +conjuntoCartas.getAttribute('data-first');
    var ultimo = +conjuntoCartas.getAttribute('data-last');
    var meio = Math.floor((primeiro+ultimo)/2);

    var meioNoNaipe = +ANIMATION.naipe[meio][1];
    console.log(meioNoNaipe, meio, ANIMATION.naipe);
    var cartaProcurada = +ANIMATION.cenario[1];
    if(meioNoNaipe > cartaProcurada) {

      var x = ANIMATION.cartas.childNodes.length;
      var meioTeste = x == 1 ? 0 : Math.floor((x-1)/2);
      for(var i = meioTeste; i < n; i++) {
        ANIMATION.cartas.removeChild(ANIMATION.cartas.lastChild);
      }

      var j = meio
      for(var i = meioTeste; i < n; i++) {
        var cartaASerMostrada = document.createElement('img');
        cartaASerMostrada.setAttribute('src', ANIMATION.naipe[j++][0]);
        cartaASerMostrada.setAttribute('class', 'card-padding card-size fadeIn animated opacity');
        ANIMATION.cartas.appendChild(cartaASerMostrada);
      }

      ANIMATION.cartas.setAttribute('data-last', meio-1);

      setTimeout(function() {
        for(var i = meioTeste; i < n; i++) {
          ANIMATION.cartas.removeChild(ANIMATION.cartas.lastChild);
        }
      }, 3000);

      var primeiro = +conjuntoCartas.getAttribute('data-first');
      var ultimo = +conjuntoCartas.getAttribute('data-last');

      setTimeout(function() {
        var x = ANIMATION.cartas.childNodes.length;
        var novoMeio = x == 1 ? 0 : Math.floor((x-1)/2);
        if(typeof ANIMATION.cartas.childNodes[novoMeio] == 'undefined') {
          binary.message('Carta não encontrada');
        }
        ANIMATION.cartas.childNodes[novoMeio].className = 'card-padding card-size animated pulse infinite';
      }, 3000);

    } else if(meioNoNaipe < cartaProcurada) {
      var x = ANIMATION.cartas.childNodes.length;
      var meioTeste = x == 1 ? 0 : Math.floor((x-1)/2);
      for(var i = 0; i < meioTeste+1; i++) {
        ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
      }

      var j = meio;
      for(var i = 0; i < meioTeste+1; i++) {
        var cartaASerMostrada = document.createElement('img');
        cartaASerMostrada.setAttribute('src', ANIMATION.naipe[j--][0]);
        cartaASerMostrada.setAttribute('class', 'card-padding card-size fadeIn animated opacity');
        ANIMATION.cartas.insertBefore(cartaASerMostrada, ANIMATION.cartas.firstChild);
      }

      ANIMATION.cartas.setAttribute('data-first', meio+1);

      setTimeout(function(){
        for(var i = 0; i < meioTeste+1; i++) {
          ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
        }
      }, 3000);

      var primeiro = +conjuntoCartas.getAttribute('data-first');
      var ultimo = +conjuntoCartas.getAttribute('data-last');

      setTimeout(function() {
        var x = ANIMATION.cartas.childNodes.length;
        var novoMeio = x == 1 ? 0 : Math.floor((x-1)/2);
        if(typeof ANIMATION.cartas.childNodes[novoMeio] == 'undefined') {
          binary.message('Carta não encontrada');
        }
        ANIMATION.cartas.childNodes[novoMeio].className = 'card-padding card-size animated pulse infinite';
      }, 3000);

    } else if(meioNoNaipe == cartaProcurada) {
      var cartaVirada = document.createElement('img');
      cartaVirada.setAttribute('src', ANIMATION.naipe[meio][0]);
      cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn opacity');
      var x = ANIMATION.cartas.childNodes.length;
      var novoMeio = x == 1 ? 0 : Math.floor((x-1)/2);
      cartaClicada.parentNode.insertBefore(cartaVirada, cartaClicada.nextSibling);
      cartaClicada.className = 'card-padding';
      ANIMATION.cartas.removeChild(cartaClicada);
      feedback.found(cartaVirada);
    } else {
      alert('Carta não encontrada');

    }

  }

}
