/* NAMESPACE para variaveis globais */
var ANIMATION = {
    cartas: document.querySelector('.cards'),
    jsonObj: cards,
    cenario: 'undefined',
    naipe: 'undefined',
}

document.querySelector('#form').addEventListener('submit', exibirCartas, false);

function exibirCartas(evt) {
    ANIMATION.cenario = obterCenario();
    ANIMATION.naipe = obterNaipe(ANIMATION.cenario[2]);
    ANIMATION.cartas.removeAttribute('data-found');
    ANIMATION.cartas.removeAttribute('data-index');
    ANIMATION.cartas.removeAttribute('data-finished');
    if (isNaN(ANIMATION.cenario[0]) || ANIMATION.cenario[0] < 4 || ANIMATION.cenario[0] > 13 ||
    ANIMATION.cenario[1] === '' || ANIMATION.cenario[2] === '' || ANIMATION.cenario[3] === '') {
        feedback.required();
    } else {
        // Caso seja a primeira tentativa remove a imagem inicial
        var imagemInicial = document.querySelector('#playing-cards');
        if (imagemInicial != null) {
            imagemInicial.remove();
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
        var cartaOculta = document.createElement('img');
        cartaOculta.setAttribute('src', 'img/cards/back.png');
        cartaOculta.setAttribute('class', 'card-padding flipInX animated');
        ANIMATION.cartas.appendChild(cartaOculta);
    }

    if(ANIMATION.cenario[3] === 'binaria') {
      setTimeout(function(){
        for(var i = 0; i < ANIMATION.cenario[0]; i++) {
            ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
        }
      }, 1500);

      var cartaExiste = document.querySelector('.cards').getAttribute('data-random');
      setTimeout(function(){
        for(var i = 0; i < ANIMATION.cenario[0]; i++) {
          var cartaASerMostrada = document.createElement('img');
          cartaASerMostrada.setAttribute('src', ANIMATION.naipe[i][0]);
          cartaASerMostrada.setAttribute('class', 'card-padding fadeIn animated card-size');
          ANIMATION.cartas.appendChild(cartaASerMostrada);
        }
      },1500);

      setTimeout(function(){
        for(var i = 0; i < ANIMATION.cenario[0]; i++) {
            ANIMATION.cartas.removeChild(ANIMATION.cartas.firstChild);
        }
      }, 4500);

      setTimeout(function(){
        for (var i = 0; i < ANIMATION.cenario[0]; i++) {
            var cartaOculta = document.createElement('img');
            cartaOculta.setAttribute('src', 'img/cards/back.png');
            cartaOculta.setAttribute('class', 'card-padding fadeIn animated');
            ANIMATION.cartas.appendChild(cartaOculta);
        }
      }, 4500);

      var meio = Math.floor((ANIMATION.cenario[0]-1)/2);
      setTimeout(function() {
        ANIMATION.cartas.childNodes[meio].setAttribute('class', 'card-padding animated pulse infinite');
        ANIMATION.cartas.childNodes[meio].setAttribute('data-target', meio);
      }, 4500);
    }else {
      setTimeout(function() {
          ANIMATION.cartas.firstChild.setAttribute('class', 'card-padding animated pulse infinite');
      }, 500);
    }
}

function iniciarPesquisa(evt) {
    var cartaClicada = evt.target || evt.srcElement;
    var encontrado = ANIMATION.cartas.getAttribute('data-found');
    if(ANIMATION.cenario[3] === 'binaria') {
      binary.search(cartaClicada);
    } else if(cartaClicada.className.indexOf('pulse') > 0) {
        if (cartaClicada === ANIMATION.cartas.lastChild) {
          ANIMATION.cartas.lastChild.setAttribute('id', 'lastValidCard');
        }
        sequential.type(cartaClicada);
    } else if (encontrado) {
        feedback.alreadyFound();
    } else if (document.querySelector('#lastValidCard') !== null) {
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

        var valor = +ANIMATION.cenario[1];
        if(cartaExiste == 'false') {
          naipe.splice(valor-2, 1);
          naipe.push(naipe[ANIMATION.cenario[0]]);
        }

        if(ANIMATION.cenario[3] == 'sequencial-d') {
          shuffleArray(naipe);
        }

        var j = +ANIMATION.cenario[0];
        naipe.splice(j);

    }

    return naipe;
}

function obterCenario() {
    var cenario = [+document.querySelector('#size').value,
        document.querySelector('#searched-card')
        .options[document.querySelector('#searched-card').selectedIndex].value,
        document.querySelector('#selected-suit')
        .options[document.querySelector('#selected-suit').selectedIndex].value,
        document.querySelector('#type-of-search')
        .options[document.querySelector('#type-of-search').selectedIndex].value
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
    request.open('GET', 'https://api.myjson.com/bins/w5zk9');
    request.responseType = 'json';
    request.send();
}

function callback(data) {
    ANIMATION.jsonObj = data;
}

function preload() {
  var naipes = ['espadas', 'paus', 'copas', 'ouro'];
  var resultado = [];
  var images = [];
  for(var i = 0; i < naipes.length; i++) {
    resultado = obterNaipe(naipes[i]);
    console.log(resultado);
    for(var j = 0; j < resultado.length; j++) {
      images.push(new Image().src = resultado[j][0]);
    }
  }
  //console.log(images);
}

preload();


carregarJSON(callback);
