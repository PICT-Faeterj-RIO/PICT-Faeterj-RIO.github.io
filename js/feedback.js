var feedback = {
  found: function(cartaVirada) {
      ANIMATION.cartas.setAttribute('data-found', 'true');
      cartaVirada.setAttribute('class', 'card-padding animated jello');
      setTimeout(function() {
        $.notify({
            icon: 'fa fa-check',
            message: 'Carta encontrada ' + feedback.complexidade() + ' <strong>Saiba mais</strong>',
            url: './saibamais.html',
            target: '_blank'
        }, {
          type: 'success',
          mouse_over: 'pause'
        });
      }, 500);
      if(ANIMATION.cenario[3] != 'binaria') {
        stopAnimation(2000, 0, (+document.querySelector('.cards').getAttribute('data-index'))+1);
      }
  },

  notFound: function(cartaVirada, cartaClicada) {
      setTimeout(function() {
          cartaVirada.setAttribute('class', 'card-padding hide');
          cartaClicada.lastChild.previousSibling.setAttribute('class', 'card-padding show animated fadeIn');
      }, 1500);
      $.notify({
          icon: 'fa fa-exclamation-triangle',
          message: 'Carta não foi encontrada :/ <strong>Saiba mais</strong>',
          url: './saibamais.html',
          target: '_blank'
      }, {
        type: 'danger',
        mouse_over: 'pause'
      });
      stopAnimation(2000, 0, ANIMATION.cenario[0]);
  },

  hasPassed: function(cartaVirada, i) {
      cartaVirada.setAttribute('class', 'card-padding animated fadeIn');
      cartaVirada.setAttribute('id', 'last-card');
      setTimeout(function() {
        $.notify({
            icon: 'fa fa-info',
            message: 'Não é necessário continuar, pois ' + i + ' é maior do que a carta procurada :/ <strong>Saiba mais</strong>',
            url: './saibamais.html',
            target: '_blank'
        }, {
          type: 'warning',
          mouse_over: 'pause'
        });
      }, 500);
      stopAnimation(2000, 0, (+document.querySelector('.cards').getAttribute('data-index'))+1);
  },

  continue: function (cartaVirada, cartaClicada) {
      setTimeout(function() {
          cartaClicada.nextSibling.firstChild.setAttribute('class', 'card-padding animated pulse infinite');
          setTimeout(function() {
              cartaVirada.setAttribute('class', 'card-padding hide');
              cartaClicada.lastChild.previousSibling.setAttribute('class', 'card-padding show animated fadeIn');
          }, 1000);
      }, 100);
      stopAnimation(1500, 0, (+document.querySelector('.cards').getAttribute('data-index'))+1);
  },

  required: function() {
    $.notify({
        icon: 'fa fa-exclamation-triangle',
        message: 'Um dos campos está vazio.'
    }, {
      type: 'danger',
      mouse_over: 'pause'
    });
  },

  failedToReset: function() {
    $.notify({
        icon: 'fa fa-exclamation-triangle',
        message: 'Você precisa criar um cenário para só então pode desfazê-lo.'
    }, {
      type: 'danger',
      mouse_over: 'pause'
    });
  },

  alreadyFound: function() {
    $.notify({
        icon: 'fa fa-info',
        message: 'Carta já foi encontrada, tente uma nova busca... <strong>Saiba mais</strong>',
        url: './saibamais.html',
        target: '_blank'
    }, {
      type: 'warning',
      mouse_over: 'pause'
    });
  },

  neverFound: function() {
    $.notify({
        icon: 'fa fa-frown-o',
        message: 'Carta não foi encontrada :/ <strong>Saiba mais</strong>',
        url: './saibamais.html',
        target: '_blank'
    }, {
      type: 'danger',
      mouse_over: 'pause'
    });
  },

  isSequential: function() {
    $.notify({
        icon: 'fa fa-exclamation-triangle',
        message: 'Oops, lembre-se que a busca é sequencial ;) <strong>Saiba mais</strong>',
        url: './saibamais.html',
        target: '_blank'
    }, {
      type: 'danger',
      mouse_over: 'pause'
    });
  },

  isBinary: function() {
    $.notify({
        icon: 'fa fa-exclamation-triangle',
        message: 'Oops, lembre-se que a busca é binária ;) <strong>Saiba mais</strong>',
        url: './saibamais.html',
        target: '_blank'
    }, {
      type: 'danger',
      mouse_over: 'pause'
    });
  },

  helper: function() {
    $.notify({
        icon: 'fa fa-info',
        message: 'Este aplicativo tem como objetivo demonstrar o funcionamento da ' +
        'busca sequencial e binária utilizando analogia com cartas do baralho. <strong>Saiba mais</strong>',
        url: './saibamais.html',
        target: '_blank'
    }, {
      type: 'info',
      mouse_over: 'pause',
      timer: 5000,
      placement: {
		      from: "bottom",
		      align: "right"
	   },
    });
    clearInterval(helper);
  },

  complexidade: function() {
    var contexto = feedback.pegarContexto();
    var complexidade;
    if(ANIMATION.cenario[3] != 'binaria') {
      complexidade = contexto[3] == 1 ? 'no melhor caso O(1) ;)' : contexto[3] == ANIMATION.cenario[0] ? 'no pior caso O(n)' : '';
    } else {
      complexidade = ANIMATION.cenario[0]-1 == contexto[2] && contexto[4]  ? 'no melhor caso O(1) ;)' : '';
    }
    return complexidade;
  },

  pegarContexto: function() {
      var indiceAtual = +ANIMATION.cartas.getAttribute('data-index');
      var inicio = +ANIMATION.cartas.getAttribute('data-first');
      var meio = +ANIMATION.cartas.getAttribute('data-middle');
      var fim = +ANIMATION.cartas.getAttribute('data-last');
      var achou = ANIMATION.cartas.getAttribute('data-found');
      var contexto = [inicio, meio, fim, indiceAtual, achou];
      return contexto;
  }

}
