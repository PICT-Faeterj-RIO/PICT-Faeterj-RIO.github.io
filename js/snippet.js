document.querySelector('#tab2-link').addEventListener('click', chooseSnippet, false);
document.querySelector('.bt-play').addEventListener('click', chooseSnippet, false);
document.querySelector('.buttonBox').addEventListener('click', chooseSnippet, false);

var tab2 = document.querySelector('#tab2');
var gitText = document.querySelector('#tab2 .gig-text');
var resetText = document.getElementsByClassName('reset-message');
var sequentialFunc = document.querySelector('.sequentialFunc');
var sequentialFuncO = document.querySelector('.sequentialFuncO');
var binaryFunc = document.querySelector('.binaryFunc');
var buttonBox = document.querySelector('.buttonBox');
var complexidade = document.querySelector('#complexidade');
var sequentialFuncR = document.querySelector('.sequentialFuncR');
var sequentialFuncOR = document.querySelector('.sequentialFuncOR');
var binaryFuncR = document.querySelector('.binaryFuncR');

function chooseSnippet(evt) {
	console.log(resetText[0]);

	var target = evt.target || evt.srcElement;
	var main = document.querySelector('#tab2');

	if(target.getAttribute('type') && tab2.getAttribute('data-recur')) {
			if(ANIMATION.cenario[3] == 'sequencial-d') {
				sequentialFuncR.setAttribute('class', 'sequentialFuncR hide');
				sequentialFunc.setAttribute('class', 'sequentialFunc animated visible');
			} else if(ANIMATION.cenario[3] == 'sequencial-o') {
				sequentialFuncOR.setAttribute('class', 'sequentialFuncOR hide');
				sequentialFuncO.setAttribute('class', 'sequentialFuncO animated visible');
			} else {
				binaryFuncR.setAttribute('class', 'binaryFuncR hide');
				binaryFunc.setAttribute('class', 'binaryFunc animated visible');
			}
			target.removeChild(target.firstChild);
			target.appendChild(document.createTextNode('Versão recursiva'));
			document.querySelector('#tab2').removeAttribute('data-recur');
	} else if(target.getAttribute('type') || tab2.getAttribute('data-recur')) {
			if(ANIMATION.cenario[3] == 'sequencial-d') {
				sequentialFunc.setAttribute('class', 'sequentialFunc hide');
				sequentialFuncOR.setAttribute('class', 'sequentialFuncOR hide');
				binaryFuncR.setAttribute('class', 'binaryFuncR hide');
				sequentialFuncR.setAttribute('class', 'sequentialFuncR animated visible');
			} else if(ANIMATION.cenario[3] == 'sequencial-o') {
				sequentialFuncO.setAttribute('class', 'sequentialFuncO hide');
				sequentialFuncR.setAttribute('class', 'sequentialFuncR hide');
				binaryFuncR.setAttribute('class', 'binaryFuncR hide');
				sequentialFuncOR.setAttribute('class', 'sequentialFuncOR animated visible');
			} else {
				binaryFunc.setAttribute('class', 'binaryFunc hide');
				sequentialFuncR.setAttribute('class', 'sequentialFuncR hide');
				sequentialFuncOR.setAttribute('class', 'sequentialFuncOR hide');
				binaryFuncR.setAttribute('class', 'binaryFuncR animated visible');
			}
		target.removeChild(target.firstChild);
		target.appendChild(document.createTextNode('Versão iterativa'));
		document.querySelector('#tab2').setAttribute('data-recur', 'true');
	} else if(ANIMATION.cenario[3] == 'binaria') {
		try {
			main.removeChild(gitText);
		} finally {
			buttonBox.setAttribute('class', 'btn btn-primary buttonBox show');
			sequentialFuncR.setAttribute('class', 'sequentialFuncR hide');
			sequentialFunc.setAttribute('class', 'sequentialFunc hide');
			sequentialFuncOR.setAttribute('class', 'sequentialFuncOR hide');
			sequentialFuncO.setAttribute('class', 'sequentialFuncO hide');
			binaryFunc.setAttribute('class', 'sequentialFunc visible');
			complexidade.setAttribute('value', 'Θ(log2 n)');
			main.removeChild(resetText[0]);
		}
	} else if (ANIMATION.cenario[3] == 'sequencial-o') {
		try {
			main.removeChild(gitText);
		} finally {

			buttonBox.setAttribute('class', 'btn btn-primary buttonBox show');
			binaryFuncR.setAttribute('class', 'binaryFuncR hide');
			binaryFunc.setAttribute('class', 'binaryFunc hide');
			sequentialFuncR.setAttribute('class', 'sequentialFuncR hide');
			sequentialFunc.setAttribute('class', 'sequentialFunc hide');
			sequentialFuncO.setAttribute('class', 'sequentialFuncO visible');
			complexidade.setAttribute('value', 'O(n)');
			main.removeChild(resetText[0]);
		}
	} else if(ANIMATION.cenario[3] == 'sequencial-d') {
		try {
			main.removeChild(gitText);
		} finally {
			buttonBox.setAttribute('class', 'btn btn-primary buttonBox show');
			binaryFuncR.setAttribute('class', 'binaryFuncR hide');
			binaryFunc.setAttribute('class', 'binaryFunc hide');
			sequentialFuncOR.setAttribute('class', 'sequentialFuncOR hide');
			sequentialFuncO.setAttribute('class', 'sequentialFuncO hide');
			sequentialFunc.setAttribute('class', 'sequentialFunc visible');
			complexidade.setAttribute('value', 'O(n)');
			main.removeChild(resetText[0]);
		}
	}
}
