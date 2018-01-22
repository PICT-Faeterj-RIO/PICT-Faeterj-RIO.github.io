var feedback = {
  found: function(cartaVirada) {
      ANIMATION.cartas.setAttribute('data-found', 'true');
      cartaVirada.setAttribute('class', 'card-padding animated jello');
      setTimeout(function() {
        $.notify({
            icon: 'fa fa-check',
            message: 'Carta encontrada :), substituir por uma explicação didática ...'
        }, {
          type: 'success',
          mouse_over: 'pause'
        });
      }, 500);
      stopAnimation(2000, 0, (+document.querySelector('.cards').getAttribute('data-index'))+1);
  },

  notFound: function(cartaVirada, cartaClicada) {
      setTimeout(function() {
          cartaVirada.setAttribute('class', 'card-padding hide');
          cartaClicada.lastChild.previousSibling.setAttribute('class', 'card-padding show animated fadeIn');
      }, 1500);
      $.notify({
          icon: 'fa fa-exclamation-triangle',
          message: 'Carta não foi encontrada :/, substituir por uma explicação didática ...'
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
            message: 'Não é necessário continuar, pois ' + i + ' é maior do que a carta procurada :/, substituir por uma explicação didática ... <strong>Saiba mais</strong>',
            url: 'https://github.com/mouse0270/bootstrap-notify',
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

  alreadyFound: function() {
    $.notify({
        icon: 'fa fa-info',
        message: 'Carta já foi encontrada, tente outra busca... substituir por uma explicação didática ...'
    }, {
      type: 'warning',
      mouse_over: 'pause'
    });
  },

  neverFound: function() {
    $.notify({
        icon: 'fa fa-frown-o',
        message: 'Carta não foi encontrada :/, substituir por uma explicação didática ...'
    }, {
      type: 'danger',
      mouse_over: 'pause'
    });
  },

  isSequential: function() {
    $.notify({
        icon: 'fa fa-exclamation-triangle',
        message: 'Oops, lembre-se que a busca é sequencial ;), substituir por uma explicação didática ... <strong>Saiba mais</strong>',
        url: 'https://github.com/mouse0270/bootstrap-notify',
        target: '_blank'
    }, {
      type: 'danger',
      mouse_over: 'pause',
    });
  }

}
