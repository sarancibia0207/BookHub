//Seleccionamos el formulario usando su ID
const formulario = document.getElementById('formularioRegistro');
// Le decimos al formulario que escuche cuando el usuario haga clic en "Enviar" (submit)
formulario.addEventListener('submit', function(evento) {
  // Evita que la página se recargue automáticamente
    evento.preventDefault();
    //Obtenemos lo que el usuario escribió en las cajas
    const nombreUsuario = document.getElementById('nombre').value;
    const emailUsuario = document.getElementById('email').value;
    const passwordUsuario = document.getElementById('password').value;
    // Hacemos algo con esa información (Por ahora, mostrar una alerta)
    // En el futuro, aquí enviarías estos datos a una base de datos.
    alert('¡Bienvenido a la Biblioteca, ' + nombreUsuario + '! Tu registro fue exitoso.');
    //Limpiamos el formulario para que quede vacío de nuevo
    formulario.reset();
});

//Seleccionamos el formulario usando su ID
const miFormulario = document.getElementById('formularioCuenta');
//Le decimos al formulario que escuche cuando el usuario haga clic en "Enviar" (submit)
miFormulario.addEventListener('submit', function(evento) {
    // Evita que la página se recargue automáticamente
    evento.preventDefault();
    //Obtenemos lo que el usuario escribió en las cajas
    const nombre = document.getElementById('nombre').value;
    const genero = document.getElementById('libro').value;
    //Mostramos un mensaje de bienvenida personalizado
    alert('¡Cuenta creada con éxito!\n\nBienvenido a la biblioteca, ' + nombre + '. Pronto te recomendaremos libros de ' + genero + '.');
    //Limpiamos el formulario para dejarlo en blanco otra vez
    miFormulario.reset();
});
