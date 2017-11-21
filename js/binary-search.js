var binary = {
  type: function() {
    // needs to be implemented
  },

  search: function(cartaClicada) {
    var meio = +ANIMATION.cartas.childNodes.length;
    meio = Math.floor(meio/2);
    cartaProcurada = +ANIMATION.cenario[1];

    var primeiraVez = ANIMATION.listenerCount === 0 ? true : false;
    ANIMATION.listenerCount++;
    var cartaDoNaipe;
    var caminho;

    if(primeiraVez) {
      cartaDoNaipe = +ANIMATION.naipe[meio + ANIMATION.indiceBinaria][1];
      caminho = ANIMATION.naipe[meio + ANIMATION.indiceBinaria][0];
    } else {
      cartaDoNaipe = +ANIMATION.cartas.getAttribute('data-card');
      caminho = ANIMATION.cartas.getAttribute('data-src');
    }

    if(cartaProcurada > cartaDoNaipe) {
        ANIMATION.cartas.childNodes[meio].className = 'card-padding';
        for(var i = 0; i <= meio; i++) {
          ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
          //ANIMATION.cartas.childNodes[i].className = 'hide';
        }

        var j;
        var nonleft = ANIMATION.cartas.getAttribute('data-nonleft');
        if(nonleft === 'true') {
          //j = ANIMATION.cenario[0] - (+ANIMATION.cartas.childNodes.length);
          j = +document.querySelector('.cards').getAttribute('data-card') - 2;
        } else {
          j = meio;
        }
        for(var i = meio; i >= 0; i--, j--) {
          console.log(j);
          var cartaVirada = document.createElement('img');
          cartaVirada.setAttribute('src', ANIMATION.naipe[j][0]);
          cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn opacity');
          ANIMATION.cartas.insertBefore(cartaVirada, ANIMATION.cartas.firstChild);
        }

        setTimeout(function(){
          for(var i = 0; i <= meio; i++) {
            ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
            //ANIMATION.cartas.childNodes[i].className = 'hide';
          }
        }, 1500);

        // indiceBinaria eh um acumulador da quantidade de cartas removidas do DOM
        ANIMATION.indiceBinaria += meio;

        var carta;
        var src;



        console.log('tira cartas da esquerda');
        if(primeiraVez) {
          carta = ANIMATION.naipe[Math.floor(meio+1 + ANIMATION.indiceBinaria/2)][1];
          src = ANIMATION.naipe[Math.floor(meio+1 + ANIMATION.indiceBinaria/2)][0];
        } else {
          carta = ANIMATION.naipe[ANIMATION.cenario[1] - meio][1];
          src = ANIMATION.naipe[ANIMATION.cenario[1] - meio][0];
        }

        ANIMATION.cartas.setAttribute('data-nonleft', true);
        ANIMATION.cartas.setAttribute('data-card', carta);
        ANIMATION.cartas.setAttribute('data-src', src);

        setTimeout(function(){
            meio = +ANIMATION.cartas.childNodes.length;
            ANIMATION.cartas.childNodes[Math.floor(meio/2)].className = 'card-padding card-size animated pulse infinite';
        }, 1501);
    } else if(cartaProcurada < cartaDoNaipe) {
      ANIMATION.cartas.childNodes[meio].className = 'card-padding';
      var final = ANIMATION.cartas.childNodes.length;

      for(var i = final; i > meio; i--) {
        ANIMATION.cartas.removeChild(ANIMATION.cartas.lastChild);
        //ANIMATION.cartas.childNodes[i].className = 'hide';
      }


      foiParaEsquerda = document.querySelector('.cards').getAttribute('data-nonleft');

      if(foiParaEsquerda) {
        cartaTeste = +document.querySelector('.cards').getAttribute('data-card') - 2;
      } else {
        cartaTeste = meio;
      }

      for(var i = meio; i < final; i++, cartaTeste++) {
        var cartaVirada = document.createElement('img');
        cartaVirada.setAttribute('src', ANIMATION.naipe[cartaTeste][0]);
        cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn opacity');
        ANIMATION.cartas.appendChild(cartaVirada);
      }

      setTimeout(function(){
        for(var i = final; i > meio; i--) {
          ANIMATION.cartas.removeChild(ANIMATION.cartas.lastChild);
          //ANIMATION.cartas.childNodes[i].className = 'hide';
        }
      }, 1500);

      /*
      var carta;
      var totalCartas = ANIMATION.cartas.childNodes.length;
      if(ANIMATION.cenario[1] == 2 && totalCartas == 3) {
          var carta = ANIMATION.naipe[1][1];
      } else {
          var carta = ANIMATION.naipe[Math.floor(meio/2)][1];
      }
      */

      var cartaX = +document.querySelector('.cards').getAttribute('data-card');
      var cartaY = +ANIMATION.cenario[1];
      var carta;
      var src;
      var totalCartas = ANIMATION.cartas.childNodes.length;
      var novoMeio = Math.floor(totalCartas/2);

      if(primeiraVez) {
        carta = ANIMATION.naipe[Math.floor(meio/2)][1];
        src = ANIMATION.naipe[Math.floor(meio/2)][0];
      } else {
        if(cartaX < cartaY) {
          console.log('hi five');
          carta = ANIMATION.naipe[cartaX + novoMeio-1][1];
          src = ANIMATION.naipe[cartaX + novoMeio-1][0];
        } else {
            console.log('hi five 2');
            if(novoMeio === 1) novoMeio = 2;
          carta = ANIMATION.naipe[cartaX - novoMeio-1][1];
          src = ANIMATION.naipe[cartaX - novoMeio-1][0];
        }
      }

      console.log('tira cartas da direita');

      ANIMATION.cartas.setAttribute('data-card', carta);
      ANIMATION.cartas.setAttribute('data-nonleft', false);
      ANIMATION.cartas.setAttribute('data-src', src);

      setTimeout(function(){
          meio = +ANIMATION.cartas.childNodes.length;
          ANIMATION.cartas.childNodes[Math.floor(meio/2)].className = 'card-padding card-size animated pulse infinite';
      }, 1600);

    }else {
      var cartaVirada = document.createElement('img');
      cartaVirada.setAttribute('src', caminho);
      cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn opacity');
      meio = +ANIMATION.cartas.childNodes.length;
      meio = Math.floor(meio/2);
      ANIMATION.cartas.insertBefore(cartaVirada, ANIMATION.cartas.childNodes[meio]);
      ANIMATION.cartas.childNodes[meio+1].className = 'card-padding';
      ANIMATION.cartas.removeChild(ANIMATION.cartas.childNodes[meio+1]);
      feedback.found(cartaVirada);
      ANIMATION.indiceBinaria = 0;
      ANIMATION.listenerCount = 0;
    }
  }

}
