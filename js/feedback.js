var feedback = {
  found: function(cartaVirada) {
      ANIMATION.cartas.setAttribute('data-found', 'true');
      cartaVirada.setAttribute('class', 'card-padding card-size animated jello');
      setTimeout(function() {
          var div = document.createElement('div');
          div.setAttribute('class', 'alert alert-success');
          div.setAttribute('role', 'alert');
          var text = document.createTextNode('Carta encontrada :), substituir por modal explicativo ...');
          document.body.appendChild(div);
          div.appendChild(text);
      }, 500);
      feedback.removeFeed();
  },

  notFound: function(cartaVirada, cartaClicada) {
      setTimeout(function() {
          cartaVirada.setAttribute('class', 'card-padding card-size hide animated fadeOut');
          cartaClicada.setAttribute('class', 'card-padding card-size show animated fadeIn');
          var div = document.createElement('div');
          div.setAttribute('class', 'alert alert-danger');
          div.setAttribute('role', 'alert');
          var text = document.createTextNode('Carta não foi encontrada :/, substituir por modal explicativo ...');
          document.body.appendChild(div);
          div.appendChild(text);
      }, 1500);
      feedback.removeFeed();
  },

  hasPassed: function(cartaVirada, i) {
      cartaVirada.setAttribute('class', 'card-padding card-size animated fadeIn');
      cartaVirada.setAttribute('id', 'lastValidCard');
      setTimeout(function() {
        var div = document.createElement('div');
        div.setAttribute('class', 'alert alert-dark');
        div.setAttribute('role', 'alert');
        var text = document.createTextNode('Não é necessário continuar, pois ' + i + ' é maior do que a carta procurada :/, substituir por modal explicativo ...');
        document.body.appendChild(div);
        div.appendChild(text);
      }, 500);
      feedback.removeFeed();
  },

  continue: function (cartaVirada, cartaClicada) {
      setTimeout(function() {
          cartaClicada.nextSibling.setAttribute('class', 'card-padding animated pulse infinite');
          setTimeout(function() {
              cartaVirada.setAttribute('class', 'card-padding card-size hide animated fadeOut');
              cartaClicada.setAttribute('class', 'card-padding card-size show animated fadeIn');
          }, 1500);
          feedback.removeFeed();
      }, 100);
  },

  required: function() {
    var div = document.createElement('div');
    div.setAttribute('class', 'alert alert-danger');
    div.setAttribute('role', 'alert');
    var text = document.createTextNode('Preencha o cenário corretamente.');
    document.body.appendChild(div);
    div.appendChild(text);
    feedback.removeFeed();
  },

  alreadyFound: function() {
    var div = document.createElement('div');
    div.setAttribute('class', 'alert alert-primary');
    div.setAttribute('role', 'alert');
    var text = document.createTextNode('Carta já foi encontrada, tente outra busca.. substituir por modal explicativo ...');
    document.body.appendChild(div);
    div.appendChild(text);
    feedback.removeFeed();
  },

  neverFound: function() {
    var div = document.createElement('div');
    div.setAttribute('class', 'alert alert-primary');
    div.setAttribute('role', 'alert');
    var text = document.createTextNode('Carta não foi encontrada :/, substituir por modal explicativo ...');
    document.body.appendChild(div);
    div.appendChild(text);
    feedback.removeFeed();
  },

  isSequential: function() {
    var div = document.createElement('div');
    div.setAttribute('class', 'alert alert-primary');
    div.setAttribute('role', 'alert');
    var text = document.createTextNode('Oops, lembre-se que a busca é sequencial ;), substituir por modal explicativo ...');
    document.body.appendChild(div);
    div.appendChild(text);
    feedback.removeFeed();
  },

  removeFeed: function() {
    setTimeout(function(){
      var elem = document.querySelector('.alert');
      elem.parentNode.removeChild(elem);
    }, 5000);
  }
}
