var feedback = {
  found: function(cartaVirada) {
      ANIMATION.cartas.setAttribute('data-found', 'true');
      cartaVirada.setAttribute('class', 'card-padding card-size animated jello');
      setTimeout(function() {
        $.notify({
            icon: 'fa fa-check',
            message: 'Carta encontrada :), substituir por uma explicação didática ...'
        }, {
          type: 'success',
          mouse_over: 'pause'
        });
      }, 500);
  },

  notFound: function(cartaVirada, cartaClicada) {
      setTimeout(function() {
          cartaVirada.setAttribute('class', 'card-padding card-size hide animated fadeOut');
          cartaClicada.lastChild.previousSibling.setAttribute('class', 'card-padding card-size show animated fadeIn');
          $.notify({
              icon: 'fa fa-exclamation-triangle',
              message: 'Carta não foi encontrada :/, substituir por uma explicação didática ...'
          }, {
            type: 'danger',
            mouse_over: 'pause'
          });
      }, 1500);
  },

  hasPassed: function(cartaVirada, i) {
      cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn');
      cartaVirada.setAttribute('id', 'last-card');
      setTimeout(function() {
        $.notify({
            icon: 'fa fa-info',
            message: 'Não é necessário continuar, pois ' + i + ' é maior do que a carta procurada :/, substituir por uma explicação didática ...'
        }, {
          type: 'warning',
          mouse_over: 'pause'
        });
      }, 500);
  },

  continue: function (cartaVirada, cartaClicada) {
      setTimeout(function() {
          cartaClicada.nextSibling.firstChild.setAttribute('class', 'wrap-image card-padding animated pulse infinite');
          setTimeout(function() {
              cartaVirada.setAttribute('class', 'card-padding card-size hide animated fadeOut');
              cartaClicada.lastChild.previousSibling.setAttribute('class', 'wrap-image card-padding card-size show animated fadeIn');
          }, 1500);
      }, 100);
  },

  required: function() {
    $.notify({
        icon: 'fa fa-exclamation-triangle',
        message: 'Preencha o cenário corretamente.'
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
        message: 'Oops, lembre-se que a busca é sequencial ;), substituir por uma explicação didática ...'
    }, {
      type: 'danger',
      mouse_over: 'pause'
    });
  }

}
