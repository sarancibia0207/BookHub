// Se ejecuta cuando todo el HTML ha terminado de cargarse
document.addEventListener('DOMContentLoaded', function() {

//MÉTODO PARA EL INDEX (Buscador de libros por autor)
const formBusqueda = document.getElementById('formularioBusqueda');
// Comprobamos si estamos en la página del index.html
if (formBusqueda) {
  formBusqueda.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evitamos recargar la página
// Capturamos el texto buscado, lo pasamos a minúsculas y quitamos espacios
    const textoBuscado = document.getElementById('autor').value.toLowerCase().trim();
    const libros = document.querySelectorAll('.libro');
    let encontrados = 0;
// Si la caja de búsqueda está vacía, mostramos todos los libros
    if (textoBuscado === '') {
      libros.forEach(libro => libro.style.display = 'inline-block');
      alert('Por favor escribe el nombre de un autor.');
      return;
    }
// Recorremos cada tarjeta de libro en el HTML
    libros.forEach(function(libro) {
// Obtenemos el texto del autor (<p>) dentro de la tarjeta
      const autorLibro = libro.querySelector('p').textContent.toLowerCase();
// Si el autor coincide con la búsqueda, lo mostramos; si no, lo ocultamos
      if (autorLibro.includes(textoBuscado)) {
        libro.style.display = 'inline-block';
        encontrados++;
      } else {
          libro.style.display = 'none';
      }
    });
// Mensaje si no se encontró nada
    if (encontrados === 0) {
      alert('No se encontraron libros de ese autor.');
    }
  });
}

 // 2. MÉTODO PARA CREAR CUENTA
const formCuenta = document.getElementById('formularioCuenta');
// Comprobamos si estamos en la página de crear-cuenta.html
if (formCuenta) {
  formCuenta.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evitamos recargar la página
// Capturamos lo que escribió el usuario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const genero = document.getElementById('libro').value;
    const clave = document.getElementById('clave').value;
// Validación simple de contraseña
    if (clave.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return; // Detenemos la ejecución
    }
// Confirmación de éxito
    alert('¡Cuenta creada con éxito!\n\nBienvenido a BookHub, ' + nombre + '.\nHemos guardado tus gustos sobre: ' + genero);
// Limpiamos los campos del formulario
    formCuenta.reset();
  });
}

// 3. MÉTODO PARA INICIO DE SESIÓN
const formLogin = document.getElementById('formularioLogin');
// Comprobamos si estamos en la página de inicio-sesion.html
if (formLogin) {
  formLogin.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evitamos recargar la página
    // Capturamos los valores
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
// Confirmación de éxito
    alert('¡Bienvenido de nuevo!\nHas iniciado sesión correctamente con el correo: ' + email);
// Limpiamos los campos del formulario
    formLogin.reset();
    });
  }
});
