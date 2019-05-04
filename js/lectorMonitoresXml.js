function crearSectionMonitores(monitores){
	var sectionItem = document.getElementById('listaMonitores');
	for(var i = 0; i < monitores.length; i++){
		var monitor = monitores[i];

		var imgFoto = document.createElement('img');
		imgFoto.setAttribute('src', monitor.foto);
		imgFoto.setAttribute('class', 'monitor-foto');

		var pNombre = document.createElement('p');
		pNombre.innerHTML = monitor.nombre + " " + monitor.apellido;
		pNombre.setAttribute('class', 'monitor-nombre');

		var pDescripcion = document.createElement('p');
		pDescripcion.innerHTML = monitor.descripcion;
		pDescripcion.setAttribute('class', 'monitor-descripcion');

		var divContenedor = document.createElement('div');
		divContenedor.setAttribute('class', 'monitor');
		divContenedor.append(imgFoto);
		divContenedor.append(pNombre);
		divContenedor.append(pDescripcion);

		sectionItem.append(divContenedor);
	}
}

function fetchMonitoresXml(url, cb){
	fetch("xml/monitores.xml")
	.then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => cb(data))
	.catch(function(err){
		console.log(err);
		throw 'No se pudo leer los monitores';
	});
}

function leerMonitoresXML(){
	var url = 'xml/monitores.xml';
	var profesionales = [];

	fetchMonitoresXml(url, function(xmlLeido){
		var monitores = xmlLeido.getElementsByTagName('monitor');

		for(var i = 0; i < monitores.length; i++){
			var children = monitores[i].children;
			var monitor = {};

			monitor.nombre = monitores[i].getAttribute('nombre');
			monitor.apellido = monitores[i].getAttribute('apellido');

			for(var j = 0; j < monitores[i].childElementCount; j++){
				var child = children[j];

				switch(child.tagName){
					case 'foto':
						monitor.foto = child.getAttribute('ruta');
						break;
					case 'descripcion':
						monitor.descripcion = child.innerHTML;
						break;

				}
			}
			profesionales.push(monitor);
		}
		console.log(profesionales);
		return crearSectionMonitores(profesionales);
	});
}

window.addEventListener('load', leerMonitoresXML);
/*window.onload = function(){
	leerMonitoresXML();
}*/