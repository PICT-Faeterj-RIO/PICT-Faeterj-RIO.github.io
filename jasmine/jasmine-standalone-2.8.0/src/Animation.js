/* NAMESPACE para variaveis globais */
var ANIMATION = {
    cartas: document.querySelector('.cards'),
    jsonObj: 'undefined',
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
    } else if(ANIMATION.cenario[0] > 9 && ANIMATION.cenario[3] === 'sequencial-o') {
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
    //console.log(evt.timeStamp);
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
    setTimeout(function() {
        ANIMATION.cartas.firstChild.setAttribute('class', 'card-padding animated pulse infinite');
    }, 500);
}

function iniciarPesquisa(evt) {
    var cartaClicada = evt.target || evt.srcElement;
    if (cartaClicada.className.indexOf('pulse') > 0) {
        if (cartaClicada === ANIMATION.cartas.lastChild) {
            ANIMATION.cartas.lastChild.setAttribute('id', 'lastValidCard');
        }
        if (ANIMATION.cenario[3] === 'binaria') {
            binary.search(cartaClicada);
        } else {
            sequential.type(cartaClicada);
        }
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

carregarJSON(callback);
