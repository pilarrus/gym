// Animación de texto.
var h3 = document.getElementById('animacion');

let writting = str => {
	let a = str.split('');
	let i = 0;
	let printStr = setInterval(function(){
		h3.innerHTML += a[i];
		if (i === a.length-1){
			clearInterval(printStr);
		}
		i++;
	},200);
};


// Controla qué sección se visualiza.
var sections = document.getElementsByTagName('section');
var enviar = document.getElementById('boton');
var cerrar = document.getElementById('icon');

function mostrarSection2(){
	sections[0].style.display = 'none';
	sections[1].style.display = 'flex';

	s = '¡Nos alegra verte por aquí!';

	if (h3.textContent != s){
		writting(s);
	} else {
		h3.innerHTML = "";
		writting(s);
	}
	
}

function mostrarSection1(){
	sections[1].style.display = 'none';
	sections[0].style.display = 'flex';
}

enviar.addEventListener('mousedown', mostrarSection2);
cerrar.addEventListener('mousedown', mostrarSection1);