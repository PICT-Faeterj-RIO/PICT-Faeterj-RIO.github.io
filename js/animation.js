/* NAMESPACE para variaveis globais */
var ANIMATION = {
    cartas: document.querySelector('.cards'),
    jsonObj: cards,
    cenario: 'undefined',
    naipe: 'undefined',
}

document.querySelector('.bt-play').addEventListener('click', exibirCartas, false);

function exibirCartas(evt) {
    ANIMATION.cenario = obterCenario();
    ANIMATION.naipe = obterNaipe(ANIMATION.cenario[2]);
    ANIMATION.cartas.removeAttribute('data-found');
    ANIMATION.cartas.removeAttribute('data-index');
    ANIMATION.cartas.removeAttribute('data-finished');
    if (ANIMATION.cenario[0] == '' || ANIMATION.cenario[1] == '' ||
    ANIMATION.cenario[2] == '' || ANIMATION.cenario[3] == '') {
        feedback.required();
    } else {
        // Caso seja a primeira tentativa remove o texto inicial
        var textoInicial = document.querySelector('.gig-text');
        if (textoInicial != null) {
            textoInicial.remove();
        }
        // Caso não seja a primeira tentativa remove as cartas do cenario anterior
        while (ANIMATION.cartas.firstChild) {
            ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
        }
        criarCartas();
        ANIMATION.cartas.addEventListener('click', iniciarPesquisa, false);
    }
    ANIMATION.indiceIncremental = 0;
    evt.preventDefault();
}

function criarCartas() {
    for (var i = 0; i < ANIMATION.cenario[0]; i++) {
        var div = document.createElement('div');
        var h6 = document.createElement('h6');
        h6.setAttribute('class', 'text-center text-light');
        var indice = document.createTextNode(i);
        div.setAttribute('class', 'wrap-image');
        var cartaOculta = document.createElement('img');
        cartaOculta.setAttribute('src', 'img/cards/back.png');
        cartaOculta.setAttribute('class', 'card-padding flipInX animated');
        div.appendChild(cartaOculta);
        h6.appendChild(indice);
        div.appendChild(h6);
        ANIMATION.cartas.appendChild(div);
    }

    stopAnimation(1500, 0, ANIMATION.cenario[0]);

    if(ANIMATION.cenario[3] === 'binaria') {
      var meio = Math.floor((ANIMATION.cenario[0]-1)/2);
      setTimeout(function() {
        document.querySelector('.main-container').setAttribute('class', 'main-container container-fluid py-4');
        ANIMATION.cartas.childNodes[meio].lastChild.previousSibling.setAttribute('class', 'card-padding animated pulse infinite');
        ANIMATION.cartas.childNodes[meio].lastChild.previousSibling.setAttribute('data-target', meio);
      }, 1000);
    }else {
      setTimeout(function() {
          ANIMATION.cartas.firstChild.firstChild.setAttribute('class', 'card-padding animated pulse infinite');
      }, 1000);
    }
}

function iniciarPesquisa(evt) {
    var cartaClicada = evt.target || evt.srcElement;
    cartaClicada = cartaClicada.parentNode;
    var encontrado = ANIMATION.cartas.getAttribute('data-found');
    if(ANIMATION.cenario[3] === 'binaria') {
      binary.search(cartaClicada.lastChild.previousSibling);
    } else if(cartaClicada.firstChild.className.indexOf('pulse') > 0) {
        if (cartaClicada === ANIMATION.cartas.lastChild) {
          ANIMATION.cartas.lastChild.setAttribute('id', 'last-card');
        }
        sequential.type(cartaClicada);
    } else if (encontrado) {
        feedback.alreadyFound();
    } else if (document.querySelector('#last-card') !== null) {
        feedback.neverFound();
    } else if (ANIMATION.cenario[3] !== 'binaria') {
        feedback.isSequential();
    }
}

function obterNaipe(string) {
    var naipeSelecionado = ANIMATION.jsonObj[string];
    var naipe = [];
    for (var i in naipeSelecionado) {
        naipe.push(naipeSelecionado[i][2]);
        naipe.push(naipeSelecionado[i][3]);
        naipe.push(naipeSelecionado[i][4]);
        naipe.push(naipeSelecionado[i][5]);
        naipe.push(naipeSelecionado[i][6]);
        naipe.push(naipeSelecionado[i][7]);
        naipe.push(naipeSelecionado[i][8]);
        naipe.push(naipeSelecionado[i][9]);
        naipe.push(naipeSelecionado[i][10]);
        // dama = 11
        naipe.push(naipeSelecionado[i]['dama']);
        // rei = 12
        naipe.push(naipeSelecionado[i]['rei']);
        // valete = 13
        naipe.push(naipeSelecionado[i]['valete']);
        // as = 14
        naipe.push(naipeSelecionado[i]['as']);
    }

    if(ANIMATION.cartas.getAttribute('data-random')) {
        var cartaExiste = ANIMATION.cartas.getAttribute('data-random');

        /* Sempre que o número de cartas a serem exibidas for igual a 13 ou a carta procurada for Ás a possibilidade da
           carta se encontrada será sempre verdadeira */
        var valor = +ANIMATION.cenario[1];
        if(cartaExiste == 'false' && ANIMATION.cenario[0] != 13 && valor != 14) {
          naipe.splice(valor-2, 1);
          naipe.push(naipe[ANIMATION.cenario[0]-1]);
        }

        if(ANIMATION.cenario[3] == 'sequencial-d') {
          shuffleArray(naipe);
        }

        var j = ANIMATION.cenario[0];
        naipe.splice(j);

    }

    return naipe;
}

function obterCenario() {
    var cenario = [+document.querySelector('#size')
        .options[document.querySelector('#size').selectedIndex].value,
        document.querySelector('#searched-card')
        .options[document.querySelector('#searched-card').selectedIndex].value,
        document.querySelector('#selected-suit')
        .options[document.querySelector('#selected-suit').selectedIndex].value,
        document.querySelector('#type-of-search')
        .options[document.querySelector('#type-of-search').selectedIndex].value,
        document.querySelector('#searched-card')
        .options[document.querySelector('#searched-card').selectedIndex].getAttribute('data-neighbor')
    ];

    getRandomInt(0, 2) === 0 ? ANIMATION.cartas.setAttribute('data-random', 'true') :
    ANIMATION.cartas.setAttribute('data-random', 'false');
    ANIMATION.cartas.setAttribute('data-first', 0);
    ANIMATION.cartas.setAttribute('data-middle', Math.floor((cenario[0]-1)/2));
    ANIMATION.cartas.setAttribute('data-last', cenario[0]-1);

    return cenario;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function carregarJSON(callback) {
    var request = new XMLHttpRequest();
    request.onload = function() {
        console.log(request.response, request.status);
        callback(request.response);
    }
    request.open('GET', 'https://api.myjson.com/bins/92ucd');
    request.responseType = 'json';
    request.send();
}

function callback(data) {
    ANIMATION.jsonObj = data;
}

carregarJSON(callback);

function preload() {
  var naipes = ['espadas', 'paus', 'copas', 'ouro'];
  var resultado = [];
  var images = [];
  for(var i = 0; i < naipes.length; i++) {
    resultado = obterNaipe(naipes[i]);
    for(var j = 0; j < resultado.length; j++) {
      images.push(new Image().src = resultado[j][0]);
    }
  }
  //console.log(images);
}

preload();

// 1o argumento sempre será o timer e 2o sempre será o inicio e o 3o sempre será o fim
function stopAnimation() {
  var string = '', timer, start, end;
  timer = arguments[0], start = arguments[1], end = arguments[2];
  for( var i = 3; i < arguments.length; i++ ) {
    string += arguments[i] + ' ';
  }

  setTimeout(function() {
    for (var i = start; i < end; i++) {
      if((ANIMATION.cartas.childNodes[i].firstChild.className.indexOf('hide') > 0)) {
        ANIMATION.cartas.childNodes[i].firstChild.nextSibling.setAttribute('class', 'card-padding ' + string);
      } else if(ANIMATION.cartas.childNodes[i].firstChild.className.indexOf('opacity') > 0) {
        ANIMATION.cartas.childNodes[i].firstChild.setAttribute('class', 'card-padding ' + string);
      } else if(!(ANIMATION.cartas.childNodes[i].firstChild.className.indexOf('pulse') > 0)) {
          ANIMATION.cartas.childNodes[i].firstChild.setAttribute('class', 'card-padding ' + string);
        }
    }
  },timer);
}

document.querySelector('.bt-reset').addEventListener('click', reset, false);

function reset() {

  /*if(ANIMATION.cartas.getAttribute('data-random') == null)
    return false;

  if(ANIMATION.cartas.getAttribute('data-redefine'))
    return false;
  */

  console.log(ANIMATION.cenario, 'oi');
  if(typeof ANIMATION.cenario == 'undefined' || ANIMATION.cenario[4] == null)
    return false;

  $('#form').trigger("reset");   // limpa o formulário

  document.querySelector('#complexidade').setAttribute('value', '');

  ANIMATION.cenario = [];   // limpa o cenário anterior

  var pendurar = [];

  for(var i = 0; i < 2; i++) {
    var divPrincipal = document.createElement('div');
    divPrincipal.setAttribute('class', 'row mt-5 reset-message disable-click');
    var divSecundaria = document.createElement('div');
    divSecundaria.setAttribute('class', 'col-12 mt-5');
    var p = document.createElement('p');
    p.setAttribute('class', 'text-muted font-weight-bold');
    //var texto = document.createTextNode('Crie um cenário e aberte o ' + '<i class="fa fa-play text-light border rounded py-1 px-1" aria-hidden="true"></i>' + ' para começar.');
    p.innerHTML = 'Você optou por ' + '<i class="fa fa-undo text-light border rounded py-1 px-1" aria-hidden="true"></i>' + ' o cenário.';
    divSecundaria.appendChild(p);
    divPrincipal.appendChild(divSecundaria);
    pendurar.push(divPrincipal);
  }

  while(ANIMATION.cartas.firstChild) {
    ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
  }

  ANIMATION.cartas.appendChild(pendurar[0]);

  var totalSnippet = document.querySelector('#tab2').childNodes.length;
  var tab2 = document.querySelector('#tab2');

  for(var i = 0; i < totalSnippet; i++) {
    if(typeof tab2.childNodes[i].className != 'undefined' && tab2.childNodes[i].className.indexOf('visible') > 0) {
      tab2.childNodes[i].classList.remove('visible');
      tab2.childNodes[i].className += ' hide';
    }
  }

  var button = document.querySelector('#tab2 .buttonBox');
  button.classList.remove('show');
  button.className += ' hide';

  document.querySelector('#tab2').appendChild(pendurar[1]);

  ANIMATION.cartas.setAttribute('data-redefine', 'true');

}
