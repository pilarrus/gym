var nav = document.getElementById('container-nav');
var li = document.getElementsByClassName('subli');

// Cambiar el color del nav
function changeColor(color){
	nav.style.backgroundColor = color;
}

// Cambia el color de la sub lista del nav
function changeColorArray(color){
	for (var i = 0; i < li.length; i++){
		li[i].style.backgroundColor = color;
	}
}

function hacerScroll(){
  	y = document.documentElement.scrollTop;
  	console.log(y);
	color = 'rgb(246, 139, 52)';
	if (y > 550 && y < 843){
		changeColor(color);
		changeColorArray(color);
	} 
	else if (y > 1466 && y < 2163){
		changeColor(color);
		changeColorArray(color);
	}
	else if (y > 2569 && y < 3551){
		changeColor(color);
		changeColorArray(color);
	}
	else if (y > 4240 && y < 5459){
		changeColor(color);
		changeColorArray(color);
	}
	else {
		color = 'rgb(0, 0, 0)';
		changeColor(color);
		changeColorArray(color);
	}
}

window.addEventListener('scroll', hacerScroll);