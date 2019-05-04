function cargarLocalStorage(keyName)
{
	try{
		var reservas = JSON.parse(window.localStorage.getItem(keyName));
		return (typeof reservas !== 'object' || reservas === null) ? [] : reservas;
	}catch(ex){
		return [];
	}
}

function guardarLocalStorage(keyName, reservas)
{
	window.localStorage.setItem(keyName, JSON.stringify(reservas));
}

function anularClase(clase)
{
	var reservas = cargarLocalStorage('reservas').filter(reserva => !(reserva.inicio === clase.inicio && reserva.dia === clase.dia));
	guardarLocalStorage('reservas', reservas);
	window.location.reload();
}

function reservarClase(clase)
{
	var reservas = cargarLocalStorage('reservas');
	reservas.push(clase);
	guardarLocalStorage('reservas',reservas);
	window.location.reload();
}

/**
 * Busca en localStorage si la clase ya está reservada por el usuario local
 */
function estaReservada(clase)
{
	var reservada = cargarLocalStorage('reservas').filter(item => item.dia === clase.dia && item.inicio === clase.inicio);
	return reservada.length !== 0
}

/**
 * Crea el TD de la tabla que estará preparado para el evento onClick
*/
function crearReservaTD(clase)
{
	//Obtener las plazas disponibles del JSON
	var plazasDisponibles = clase.disponibles;
	//Almacenar si es una clase ya reservada por el usuario
	var claseReservada = estaReservada(clase);
	//Tener en cuenta si en local storage hay una reserva sobre esta clase
	if(claseReservada) plazasDisponibles--;
	
	//Preparar el elemento
	var td = document.createElement('td');
	var div = document.createElement('div');
	div.innerHTML = clase.nombre;
	if(claseReservada)
		div.setAttribute('class', 'reservabtn plazaReservada');
	else
		div.setAttribute('class', (plazasDisponibles > 0 ? 'reservabtn plazaslibres' : 'reservabtn sinplazas'));

	div.addEventListener('click', function(){
		if(claseReservada){
			if(confirm('Deseas cancelar la reserva de la clase de ' + clase.nombre)){
				anularClase(clase);
			}
		}else{
			if(plazasDisponibles > 0){
				if(confirm('Deseas reservar la clase de ' + clase.nombre + ' que comienza a las ' + clase.inicio+'?')){
					reservarClase(clase);
				}
			}else{
				alert('La clase ya no tiene plazas disponibles');
			}
		}
		
	})
	td.append(div);
	return td;
}

function createTable(json, incluirReservas)
{
	var table = document.createElement('table');
	table.setAttribute("class", "horario");
	table.innerHTML = '<tr><th></th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th></tr>';

	var horas = [10,11,18,19,20,21];
	for(var i = 0; i < 6; i++){
		//Espacio de descanso
		if(i === 2){
			var tdDescanso = document.createElement('td');
			tdDescanso.setAttribute('colspan', 6);
			var trDescanso =document.createElement('tr');
			trDescanso.append(tdDescanso);
			table.append(trDescanso);
		}
		var hora = horas[i];
		var tr = document.createElement('tr');

		//Primera celda. Horario
		var thHora = document.createElement('th');
		thHora.innerHTML = hora + ':00';
		tr.append(thHora);
		
		var clases = json.filter(item => item.inicio === hora);
		clases.sort(function(a, b){return a.dia < b.dia;});

		for(var j = 0; j < clases.length; j++){
			if(incluirReservas === true){
				//Incluir el elemento complejo que permita reservas y clicks
				tr.append(crearReservaTD(clases[j]));
			}else{
				//Incluir el elemento como td normal sin reservas
				var tdActividad = document.createElement('td');
				tdActividad.innerHTML = clases[j].nombre;
				tr.append(tdActividad);
			}
		}
		table.append(tr);
	}

	return table;
}

function leerHorario(callback){
	fetch("/js/json/reservas.json")
	.then(response => response.json())
    .then(data => callback(data))
	.catch(function(err){
		console.log(err);
		throw 'No se pudo leer los horarios';
	});
}

function loginCorrecto()
{
	var reservasDiv = document.getElementById('reservasDiv');

	var logout = document.createElement('button');
	logout.innerHTML = 'Cerrar sesión';
	logout.setAttribute('class', 'logoutBtn');
	logout.addEventListener('click', function(e){
		guardarLocalStorage('user', {});
		window.location.reload();
	});

	var logoutDiv = document.createElement('div');
	logoutDiv.setAttribute('class', 'logoutDiv');
	logoutDiv.append(logout);
	
	reservasDiv.append(logoutDiv);

	leerHorario(function(data){
		reservasDiv.append(createTable(data.clases, true));
	});
	return;
}

function controlarLogin(){
	var section = document.querySelector('.box-identificacion');
	var form = document.getElementById('loginReserva');
	//Si ya está logueado...
	var loadedUser = cargarLocalStorage('user');
	if(loadedUser && loadedUser.login && loadedUser.login === true){
		section.remove();
		return loginCorrecto();
	}

	
	form.addEventListener('submit', function(e){
		e.preventDefault();
		var user = document.getElementById('usuario');
		var pass = document.getElementById('password');
		if(pass.value === '0123'){
			section.remove();
			guardarLocalStorage('user', {login: true, username: user.value});
			return loginCorrecto();
		}
	});
}

function inicio(){
	//Cargar solo la tabla de horario (sin reservas)
    var listaClases = document.getElementById('listaClases');
    if(listaClases){
    	leerHorario(function(data){
    		listaClases.insertBefore(createTable(data.clases, false),listaClases.children[0]);
    	});
    }

    //Si no, estamos en la página de reservas. Esperar a que valide el form y cargar
    var login = document.querySelector('.box-identificacion');
    if(login){
    	controlarLogin();
    }
}

window.addEventListener('load', inicio);