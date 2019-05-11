function createTable(json) {
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
		/*clases.sort(function(a, b){return a.dia < b.dia;});*/

		for(var j = 0; j < clases.length; j++){
			//Incluir el elemento como td normal sin reservas
			var tdActividad = document.createElement('td');
			tdActividad.innerHTML = clases[j].nombre;
			tr.append(tdActividad);
			
		}
		table.append(tr);
	}

	return table;
}

function leerHorario(callback){
	fetch("js/json/horario.json")
	.then(response => response.json())
    .then(data => callback(data))
	.catch(function(err){
		console.log(err);
		throw 'No se pudo leer los horarios';
	});
}

function inicio(){
	//Cargar la tabla de horario
    var listaClases = document.getElementById('listaClases');
    if(listaClases){
    	leerHorario(function(data){
    		listaClases.insertBefore(createTable(data.clases),listaClases.children[0]);
    	});
    }

}

window.addEventListener('load', inicio);