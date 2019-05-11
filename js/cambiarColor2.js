/* Cambiar el color del nav y la sublista del nav de
los html de actividades*/
var nav = document.getElementById('container-nav');
var li = document.getElementsByClassName('subli');

function changeColor(color){
	nav.style.backgroundColor = color;
}


function changeColorArray(color){
	for (var i = 0; i < li.length; i++){
		li[i].style.backgroundColor = color;
	}
}

function hacerScroll(){
  	y = document.documentElement.scrollTop;
	color = 'rgb(246, 139, 52)';
	if (y > 129 && y < 446){
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