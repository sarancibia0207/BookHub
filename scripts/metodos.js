function obtenerInfo(){

}

function inyectarFooter(){
    document.getElementById("header").innerHTML = ""
}

//Seleccionamos el formulario usando su ID
const formulario = document.getElementById('formularioRegistro');
// Le decimos al formulario que escuche cuando el usuario haga clic en "Enviar" (submit)
formulario.addEventListener('submit', function(evento) {
    // Evitamos que la página se recargue (que es lo que hace por defecto un formulario)
    evento.preventDefault();
    //Capturamos los valores que el usuario escribió en las cajas de texto
    const nombreUsuario = document.getElementById('nombre').value;
    const emailUsuario = document.getElementById('email').value;
    const passwordUsuario = document.getElementById('password').value;
    // Hacemos algo con esa información (Por ahora, mostrar una alerta)
    // En el futuro, aquí enviarías estos datos a una base de datos.
    alert('¡Bienvenido a la Biblioteca, ' + nombreUsuario + '! Tu registro fue exitoso.');
    //Limpiamos el formulario para que quede vacío de nuevo
    formulario.reset();
});
