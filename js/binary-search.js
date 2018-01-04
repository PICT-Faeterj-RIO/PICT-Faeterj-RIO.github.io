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

    var meioNoNaipe = +ANIMATION.naipePraBinaria[meio][1];
    var cartaProcurada = +ANIMATION.cenario[1];

    if(meioNoNaipe > cartaProcurada) {

      for(var i = meio; i < n; i++) {
        ANIMATION.cartas.removeChild(ANIMATION.cartas.lastChild);
      }


      // novo codigo aqui
      for(var i = meio; i < n; i++) {
        var cartaASerMostrada = document.createElement('img');
        cartaASerMostrada.setAttribute('src', ANIMATION.naipePraBinaria[i][0]);
        cartaASerMostrada.setAttribute('class', 'card-padding card-size fadeIn animated opacity');
        ANIMATION.cartas.appendChild(cartaASerMostrada);
      }

      ANIMATION.cartas.setAttribute('data-last', meio-1);

      ANIMATION.naipePraBinaria.splice(meio, n-meio);

      setTimeout(function() {
        for(var i = meio; i < n; i++) {
          ANIMATION.cartas.removeChild(ANIMATION.cartas.lastChild);
        }
      }, 3000);


      var primeiro = +conjuntoCartas.getAttribute('data-first');
      var ultimo = +conjuntoCartas.getAttribute('data-last');
      var novoMeio = Math.floor((primeiro+ultimo)/2);

      // Revisar
      setTimeout(function() {
        ANIMATION.cartas.childNodes[novoMeio].className = 'card-padding card-size animated pulse infinite';
      }, 3000);

    } else if(meioNoNaipe < cartaProcurada) {
      for(var i = 0; i < meio+1; i++) {
        ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
      }

      // novo codigo aqui
      var j = meio;
      for(var i = 0; i < meio+1; i++) {
        var cartaASerMostrada = document.createElement('img');
        cartaASerMostrada.setAttribute('src', ANIMATION.naipePraBinaria[j--][0]);
        cartaASerMostrada.setAttribute('class', 'card-padding card-size fadeIn animated opacity');
        ANIMATION.cartas.insertBefore(cartaASerMostrada, ANIMATION.cartas.firstChild);
      }

      ANIMATION.cartas.setAttribute('data-first', meio+1);

      ANIMATION.naipePraBinaria.splice(0, meio);

      setTimeout(function(){
        for(var i = 0; i < meio+1; i++) {
          ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
        }
      }, 3000);

      var primeiro = +conjuntoCartas.getAttribute('data-first');
      var ultimo = +conjuntoCartas.getAttribute('data-last');
      var novoMeio = Math.floor((primeiro+ultimo)/2);

      // Corrigir erro
      console.log(ANIMATION.naipePraBinaria);
      console.log('Meio ', meio);
      console.log('Primeiro ', primeiro);
      console.log('Ultimo ', ultimo);
      console.log('Novo meio ', novoMeio);
      
      // Revisar
      setTimeout(function() {
        ANIMATION.cartas.childNodes[novoMeio].className = 'card-padding card-size animated pulse infinite';
      }, 3000);

    } else if(meioNoNaipe == cartaProcurada) {
      var cartaVirada = document.createElement('img');
      cartaVirada.setAttribute('src', ANIMATION.naipe[meio][0]);
      cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn opacity');
      ANIMATION.cartas.insertBefore(cartaVirada, ANIMATION.cartas.childNodes[meio]);
      ANIMATION.cartas.childNodes[meio+1].className = 'card-padding';
      ANIMATION.cartas.removeChild(ANIMATION.cartas.childNodes[meio+1]);
      feedback.found(cartaVirada);
    } else {
      alert('Carta não encontrada');

    }

  }

}
