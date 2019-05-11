function crearItemSubmenu(nombre, slug){
	var ulSubmenu = document.getElementById('submenu');
	if(ulSubmenu === null){
		//Creamos el UL
		ulSubmenu = document.createElement('ul');
		ulSubmenu.setAttribute('id', 'submenu');
		ulSubmenu.setAttribute('class', 'submenu');
		//Cogemos el primer li.botones
		document.querySelector('li.botones').append(ulSubmenu);
	}
	var li = document.createElement('li');
	li.setAttribute('class', 'subli');
	var a = document.createElement('a');
	a.setAttribute('href', 'html/' + slug + '.html');
	a.innerHTML = nombre;
	li.append(a);
	ulSubmenu.append(li);
}

function crearSectionActividades(actividades){
	var sectionItem = document.getElementById('listaActividades');
	for(var i = 0; i < actividades.length; i++){
		var actividad = actividades[i];
		if(sectionItem){
			var divNombre = document.createElement('div');
			divNombre.innerHTML = actividad.nombre;
			divNombre.setAttribute('class', 'actividad-nombre');

			var divContenedor = document.createElement('div');
			divContenedor.setAttribute('class', 'actividad');
			divContenedor.setAttribute('data-image', actividad.foto);
			divContenedor.style.backgroundImage = 'url('+actividad.foto+')';
			divContenedor.setAttribute('id', 'actividad-'+actividad.slug);
			divContenedor.append(divNombre);

			divContenedor.addEventListener('click', function(e){
				var slug = e.currentTarget.getAttribute('id').substring(10);
				window.location = 'html/' + slug + '.html';			
			});
			//Añadir la actividad solo si estamos en index
			// y no parar la carga del submenu
			sectionItem.append(divContenedor);


		}
		crearItemSubmenu(actividad.nombre, actividad.slug);
	}
}

function fetchXml(url, cb){
	fetch("xml/actividades.xml")
	.then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => cb(data))
	.catch(function(err){
		console.log(err);
		throw 'No se pudo leer las actividades';
	});
}

function dibujarDetallesClase(actividadNode){
	var datos = {};
	var datosNecesarios = ['nombre', 'descripcion', 'video'];

	for(var i = 0; i < datosNecesarios.length; i++){
		let key = datosNecesarios[i];
		datos[key] = actividadNode.getElementsByTagName(key)[0].innerHTML;
	}
	datos['descripcion'] = datos['descripcion'].replace(/parrafo>/gi, 'p>');
	var h2 = document.createElement('h2');
	h2.setAttribute('class', 'titulo');
	h2.innerHTML = datos.nombre;

	var videoI = document.createElement('iframe');
	videoI.setAttribute('width', '560');
	videoI.setAttribute('height', '315');
	videoI.setAttribute('src', 'https://www.youtube.com/embed/' + datos.video);
	videoI.setAttribute('frameborder', '0');

	var video = document.createElement('div');
	video.setAttribute('class', 'video');
	video.append(videoI);

	var desc = document.createElement('div');
	desc.setAttribute('class', 'descripcion');
	desc.innerHTML = datos.descripcion;

	var contenedorClase = document.querySelector('.contenedor-actividades');
	contenedorClase.append(h2, video, desc);
}

function buscarDetallesClase(xmlLeido){
	var contenedorClase = document.getElementsByClassName('contenedor-actividades');
	if(contenedorClase.length < 1) return;
	var claseSlug = contenedorClase[0].getAttribute('data-clase');
	if(claseSlug === null) return;

	var actividades = xmlLeido.getElementsByTagName('actividad');
	for(var i = 0; i < actividades.length; i++){
		var actividad = actividades[i];
		for(var j = 0; j < actividad.childElementCount; j++){
			var tag = actividad.children[j];
			if(tag.tagName === 'slug'){
				if(tag.innerHTML === claseSlug){
					dibujarDetallesClase(actividad);
				}else{
					break;
				}
			}
		}
	}


}

function leerActividadesXML(){
	var url = 'xml/actividades.xml';
	var clases = [];
	fetchXml(url, function(xmlLeido){
		var actividades = xmlLeido.getElementsByTagName('actividad');
		for(var i = 0; i < actividades.length; i++){
			var children = actividades[i].children;
			var clase = {};
			for(var j = 0; j < actividades[i].childElementCount; j++){
				var child = children[j];
				switch(child.tagName){
					case 'nombre':
						clase.nombre = child.innerHTML;
						break;
					case 'foto':
						clase.foto = child.getAttribute('ruta');
						break;
					case 'slug':
						clase.slug = child.innerHTML;
						break;

				}
			}
			clases.push(clase);
		}
		console.log(clases);
		buscarDetallesClase(xmlLeido);
		return crearSectionActividades(clases);
	});
}

window.addEventListener('load', leerActividadesXML);