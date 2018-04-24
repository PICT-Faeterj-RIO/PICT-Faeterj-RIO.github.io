var binary = {
  type: function() {
    // needs to be implemented
  },

  search: function(cartaClicada) {

    var conjuntoCartas = document.querySelector('.cards');
    var n = conjuntoCartas.childNodes.length;
    var primeiro = +conjuntoCartas.getAttribute('data-first');
    var ultimo = +conjuntoCartas.getAttribute('data-last');
    var meio = Math.floor((primeiro+ultimo)/2);

    var alvo = +cartaClicada.getAttribute('data-target');

    var meioNoNaipe = typeof ANIMATION.naipe[meio] != 'undefined' ? +ANIMATION.naipe[meio][1] : 'index out of bounds';
    var cartaProcurada = +ANIMATION.cenario[1];
    var cartaEncontrada = conjuntoCartas.getAttribute('data-found');

    var finalizado = ANIMATION.cartas.getAttribute('data-finished');
    if(finalizado) {
      feedback.neverFound();
    } else if(alvo != meio && cartaEncontrada != 'true') {
      feedback.isBinary();
    } else if(meioNoNaipe > cartaProcurada) {

      var x = ANIMATION.cartas.childNodes.length;
      for(var i = meio; i < n; i++) {
        ANIMATION.cartas.removeChild(ANIMATION.cartas.lastChild);
      }

      var j = meio
      for(var i = meio; i < n; i++) {
        var div = document.createElement('div');
        var h6 = document.createElement('h6');
        h6.setAttribute('class', 'text-center text-light');
        var indice = document.createTextNode(j);
        div.setAttribute('class', 'wrap-image');
        var cartaOculta = document.createElement('img');
        cartaOculta.setAttribute('src', ANIMATION.naipe[j++][0]);
        cartaOculta.setAttribute('class', 'card-padding fadeIn animated opacity');
        div.appendChild(cartaOculta);
        h6.appendChild(indice);
        div.appendChild(h6);
        ANIMATION.cartas.appendChild(div);
      }

      stopAnimation(1500, meio, n, 'opacity');


      ANIMATION.cartas.setAttribute('data-last', meio-1);

      var primeiro = +conjuntoCartas.getAttribute('data-first');
      var ultimo = +conjuntoCartas.getAttribute('data-last');


      if(primeiro > ultimo) {
        ANIMATION.cartas.setAttribute('data-finished', 'true');
        feedback.notFound();
        ANIMATION.cartas.childNodes[novoMeio].lastChild.previousSibling.className = 'card-padding opacity';
      }
      setTimeout(function() {
        var x = ANIMATION.cartas.childNodes.length;
        var novoMeio = Math.floor((primeiro+ultimo)/2);
        ANIMATION.cartas.childNodes[novoMeio].lastChild.previousSibling.className = 'card-padding animated pulse infinite';
        ANIMATION.cartas.childNodes[novoMeio].lastChild.previousSibling.setAttribute('data-target', novoMeio);
      }, 1500);

    } else if(meioNoNaipe < cartaProcurada) {
      var x = ANIMATION.cartas.childNodes.length;
      for(var i = 0; i < meio+1; i++) {
        ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
      }

      var j = meio;
      for(var i = 0; i < meio+1; i++) {
        var div = document.createElement('div');
        var h6 = document.createElement('h6');
        h6.setAttribute('class', 'text-center text-light');
        var indice = document.createTextNode(j);
        div.setAttribute('class', 'wrap-image');
        var cartaOculta = document.createElement('img');
        cartaOculta.setAttribute('src', ANIMATION.naipe[j--][0]);
        cartaOculta.setAttribute('class', 'card-padding fadeIn animated opacity');
        div.appendChild(cartaOculta);
        h6.appendChild(indice);
        div.appendChild(h6);
        ANIMATION.cartas.insertBefore(div, ANIMATION.cartas.firstChild);
      }

      stopAnimation(1500, 0, meio+1, 'opacity');

      ANIMATION.cartas.setAttribute('data-first', meio+1);

      var primeiro = +conjuntoCartas.getAttribute('data-first');
      var ultimo = +conjuntoCartas.getAttribute('data-last');

      if(primeiro > ultimo) {
        ANIMATION.cartas.setAttribute('data-finished', 'true');
        feedback.notFound();
        ANIMATION.cartas.childNodes[novoMeio].lastChild.previousSibling.className = 'card-padding opacity';
      }

      setTimeout(function() {
        var x = ANIMATION.cartas.childNodes.length;
        var novoMeio = Math.floor((primeiro+ultimo)/2);
        ANIMATION.cartas.childNodes[novoMeio].lastChild.previousSibling.className = 'card-padding animated pulse infinite';
        ANIMATION.cartas.childNodes[novoMeio].lastChild.previousSibling.setAttribute('data-target', novoMeio);
      }, 1500);

    } else if(cartaEncontrada) {
      feedback.alreadyFound();
    } else if (meioNoNaipe == cartaProcurada) {
      var cartaVirada = document.createElement('img');
      cartaVirada.setAttribute('src', ANIMATION.naipe[meio][0]);
      cartaVirada.setAttribute('class', 'card-padding animated fadeIn opacity');
      var x = ANIMATION.cartas.childNodes.length;
      var novoMeio = x == 1 ? 0 : Math.floor((x-1)/2);
      cartaClicada.parentNode.insertBefore(cartaVirada, cartaClicada.nextSibling);
      cartaClicada.className = 'card-padding hide';
      feedback.found(cartaVirada);
      stopAnimation(2000, meio, meio+1);
    }

  }

}
