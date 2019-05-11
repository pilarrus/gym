//Simula que se ha enviado el formulario
var button = document.getElementsByClassName('enviar');

function message(){
    confirm('El formulario se ha enviado correctamente');
}

button[0].addEventListener('click', message);