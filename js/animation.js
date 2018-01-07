/* NAMESPACE para variaveis globais */
var ANIMATION = {
    cartas: document.querySelector('.cards'),
    jsonObj: cards,
    naipePraOrdenada: [],
    cenario: 'undefined',
    naipe: 'undefined',
    indiceIncremental: 0,
    numCartas: 0,
    ultimaCartaClicada: 'undefined'
}

document.querySelector('#form').addEventListener('submit', exibirCartas, false);

function exibirCartas(evt) {
    ANIMATION.cenario = obterCenario();
    ANIMATION.naipe = obterNaipe();
    if (isNaN(ANIMATION.cenario[0]) || ANIMATION.cenario[0] < 4 || ANIMATION.cenario[0] > 13 ||
    ANIMATION.cenario[1] === '' || ANIMATION.cenario[2] === '' || ANIMATION.cenario[3] === '') {
        feedback.required();
    } else if(ANIMATION.cenario[0] > 9 && ANIMATION.cenario[3] !== 'sequencial-d') {
          feedback.requiredForOrderedSearch();
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


      // Revisar
      var cartaExiste = document.querySelector('.cards').getAttribute('data-found');
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
      }, 4500);
    }else {
      setTimeout(function() {
          ANIMATION.cartas.firstChild.setAttribute('class', 'card-padding animated pulse infinite');
      }, 500);
    }
}

function iniciarPesquisa(evt) {
    var cartaClicada = evt.target || evt.srcElement;
    if(ANIMATION.cenario[3] === 'binaria') {
      binary.search(cartaClicada);
    } else if(cartaClicada.className.indexOf('pulse') > 0) {
        if (cartaClicada === ANIMATION.cartas.lastChild) {
          ANIMATION.cartas.lastChild.setAttribute('id', 'lastValidCard');
        }
        sequential.type(cartaClicada);
    } else if (ANIMATION.ultimaCartaClicada === ANIMATION.cenario[1] &&
        ANIMATION.numCartas === ANIMATION.cartas.childNodes.length
    ) {
        feedback.alreadyFound();
    } else if (document.querySelector('#lastValidCard') !== null) {
        feedback.neverFound();
    } else if (ANIMATION.cenario[3] !== 'binaria') {
        feedback.isSequential();
    }
}

function obterNaipe() {
    var naipeSelecionado = ANIMATION.jsonObj[ANIMATION.cenario[2]];
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
        naipe.push(naipeSelecionado[i]['dama']);
        naipe.push(naipeSelecionado[i]['rei']);
        naipe.push(naipeSelecionado[i]['valete']);
        naipe.push(naipeSelecionado[i]['as']);
    }

    var cartaExiste = ANIMATION.cartas.getAttribute('data-found');

    var valor = +ANIMATION.cenario[1];
    if(cartaExiste == 'false') {
      naipe.splice(valor-2, 1);
      naipe.push(naipe[ANIMATION.cenario[0]]);
    }

    if(ANIMATION.cenario[3] != 'sequencial-d') {
      var j = +ANIMATION.cenario[0];
      naipe.splice(j);
    }
    console.log(naipe);
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

    getRandomInt(0, 2) === 0 ? ANIMATION.cartas.setAttribute('data-found', 'true') :
    ANIMATION.cartas.setAttribute('data-found', 'false');
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

function carregarJSON(callback) {
    var request = new XMLHttpRequest();
    request.onload = function() {
        console.log(request.response, request.status);
        callback(request.response);
    }
    request.open('GET', 'https://api.myjson.com/bins/bj79p');
    request.responseType = 'json';
    request.send();
}

function callback(data) {
    ANIMATION.jsonObj = data;
}

function restringirCarta() {
  var selectedSearch = document.querySelector('#type-of-search')
  .options[document.querySelector('#type-of-search').selectedIndex].value;
  var select = document.querySelector('#searched-card');
  if(selectedSearch == 'sequencial-o' || selectedSearch == 'binaria') {
    for(var i = 0; i < select.options.length; i++) {
      if(select.options[i].value == 'rei' || select.options[i].value == 'dama' ||
         select.options[i].value == 'valete' || select.options[i].value == 'as') {
            select.options[i].setAttribute('disabled', '');
         }
    }
  } else {
    for(var i = 0; i < select.options.length; i++) {
      if(select.options[i].value == 'rei' || select.options[i].value == 'dama' ||
         select.options[i].value == 'valete' || select.options[i].value == 'as') {
            select.options[i].removeAttribute('disabled');
         }
    }
  }

}

window.document.onload = restringirCarta();

document.querySelector('#form').addEventListener('submit', preload, false);


var images = [];
function preload() {
  if(ANIMATION.cenario[3] == 'binaria') {
    for(var i = 0; i < ANIMATION.cenario[0]; i++) {
      images[i] = new Image();
      images[i].src = ANIMATION.naipe[i][0];
    }
  } else {
    for(var i = 0; i < ANIMATION.cenario[0]; i++) {
      images[i] = new Image();
      images[i].src = ANIMATION.naipe[i][0];
    }
  }
  //console.log(images);
}

carregarJSON(callback);
