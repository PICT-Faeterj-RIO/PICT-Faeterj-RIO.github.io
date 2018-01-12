var binary = {
  type: function() {
    // needs to be implemented
  },

  message: function message(string) {
    $.notify({
        icon: 'fa fa-exclamation-triangle',
        message: string
    }, {
      type: 'danger',
      mouse_over: 'pause'
    });
  },

  search: function(cartaClicada) {

    var conjuntoCartas = document.querySelector('.cards');
    var n = conjuntoCartas.childNodes.length;
    var primeiro = +conjuntoCartas.getAttribute('data-first');
    var ultimo = +conjuntoCartas.getAttribute('data-last');
    var meio = Math.floor((primeiro+ultimo)/2);

    var alvo = +cartaClicada.getAttribute('data-target');

    var meioNoNaipe = +ANIMATION.naipe[meio][1];
    console.log(meioNoNaipe, meio, ANIMATION.naipe);
    var cartaProcurada = +ANIMATION.cenario[1];
    var cartaEncontrada = conjuntoCartas.getAttribute('data-found');

    var finalizado = ANIMATION.cartas.getAttribute('data-finished');
    if(finalizado) {
      feedback.neverFound();
    } else if(alvo != meio) {
      binary.message('Oops, lembre-se que a busca é binária ;), substituir por modal explicativo ...');
    } else if(meioNoNaipe > cartaProcurada) {

      var x = ANIMATION.cartas.childNodes.length;
      for(var i = meio; i < n; i++) {
        ANIMATION.cartas.removeChild(ANIMATION.cartas.lastChild);
      }

      var j = meio
      for(var i = meio; i < n; i++) {
        var cartaASerMostrada = document.createElement('img');
        cartaASerMostrada.setAttribute('src', ANIMATION.naipe[j++][0]);
        cartaASerMostrada.setAttribute('class', 'card-padding card-size fadeIn animated opacity');
        ANIMATION.cartas.appendChild(cartaASerMostrada);
      }

      ANIMATION.cartas.setAttribute('data-last', meio-1);

      var primeiro = +conjuntoCartas.getAttribute('data-first');
      var ultimo = +conjuntoCartas.getAttribute('data-last');

      setTimeout(function() {
        var x = ANIMATION.cartas.childNodes.length;
        var novoMeio = Math.floor((primeiro+ultimo)/2);
        ANIMATION.cartas.childNodes[novoMeio].className = 'card-padding card-size animated pulse infinite';
        ANIMATION.cartas.childNodes[novoMeio].setAttribute('data-target', novoMeio);

        if(primeiro > ultimo) {
          ANIMATION.cartas.setAttribute('data-finished', 'true');
          binary.message('Carta não encontrada');
          ANIMATION.cartas.childNodes[novoMeio].className = 'card-padding card-size opacity'
        }

      }, 1500);

    } else if(meioNoNaipe < cartaProcurada) {
      var x = ANIMATION.cartas.childNodes.length;
      for(var i = 0; i < meio+1; i++) {
        ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
      }

      var j = meio;
      console.log(j);
      for(var i = 0; i < meio+1; i++) {
        var cartaASerMostrada = document.createElement('img');
        cartaASerMostrada.setAttribute('src', ANIMATION.naipe[j--][0]);
        cartaASerMostrada.setAttribute('class', 'card-padding card-size fadeIn animated opacity');
        ANIMATION.cartas.insertBefore(cartaASerMostrada, ANIMATION.cartas.firstChild);
      }

      ANIMATION.cartas.setAttribute('data-first', meio+1);

      var primeiro = +conjuntoCartas.getAttribute('data-first');
      var ultimo = +conjuntoCartas.getAttribute('data-last');

      setTimeout(function() {
        var x = ANIMATION.cartas.childNodes.length;
        var novoMeio = Math.floor((primeiro+ultimo)/2);
        ANIMATION.cartas.childNodes[novoMeio].className = 'card-padding card-size animated pulse infinite';
        ANIMATION.cartas.childNodes[novoMeio].setAttribute('data-target', novoMeio);

        if(primeiro > ultimo) {
          ANIMATION.cartas.setAttribute('data-finished', 'true');
          binary.message('Carta não encontrada');
          ANIMATION.cartas.childNodes[novoMeio].className = 'card-padding card-size opacity'
        }

      }, 1500);

    } else if(cartaEncontrada) {
      feedback.alreadyFound();
    } else if (meioNoNaipe == cartaProcurada) {
      var cartaVirada = document.createElement('img');
      cartaVirada.setAttribute('src', ANIMATION.naipe[meio][0]);
      cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn opacity');
      var x = ANIMATION.cartas.childNodes.length;
      var novoMeio = x == 1 ? 0 : Math.floor((x-1)/2);
      cartaClicada.parentNode.insertBefore(cartaVirada, cartaClicada.nextSibling);
      cartaClicada.className = 'card-padding';
      ANIMATION.cartas.removeChild(cartaClicada);
      feedback.found(cartaVirada);
    }

  }

}
