// Se ejecuta cuando todo el HTML ha terminado de cargarse
document.addEventListener('DOMContentLoaded', function() {

//MÉTODO PARA EL INDEX (Buscador de libros por autor)
// Buscador de libros

const formulario = document.getElementById('formularioBusqueda');
const mostrarTodos = document.getElementById('mostrarTodos');
const resultado = document.getElementById('resultadoBusqueda');

if (formulario) {

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const busqueda = document.getElementById('autor').value.toLowerCase().trim();
        const libros = document.querySelectorAll('.libro');
        let encontrados = 0;

        libros.forEach(function(libro) {
            const texto = libro.textContent.toLowerCase();

            if (texto.includes(busqueda)) {
                libro.style.display = '';encontrados++;
            } else {
                libro.style.display = 'none';
            }
        });

        resultado.textContent = 'Resultados: ' + encontrados + ' libros encontrados';
    });

    mostrarTodos.addEventListener('click', function() {
        const libros = document.querySelectorAll('.libro');

        libros.forEach(function(libro) {
            libro.style.display = '';
        });
        document.getElementById('autor').value = '';
        resultado.textContent = 'Resultados: ' + libros.length + ' libros encontrados';
    });
}
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

// 4. MÉTODO PARA CARRITO DE COMPRAS
document.addEventListener('DOMContentLoaded', () => {
    // Variables y selectores
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const contenedorCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const botonVaciar = document.getElementById('vaciar-carrito');

    // Intentamos cargar el carrito desde localStorage o inicializamos un array vacío
    let carrito = JSON.parse(localStorage.getItem('carritoBookHub')) || [];

    // LÓGICA PARA INDEX.HTML - Agregar al carrito
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const titulo = e.target.getAttribute('data-titulo');
            const autor = e.target.getAttribute('data-autor');
            const precio = parseFloat(e.target.getAttribute('data-precio'));

            const libro = { id, titulo, autor, precio, cantidad: 1 };

            // Revisar si el libro ya está en el carrito
            const existe = carrito.some(item => item.id === id);

            if (existe) {
                // Actualizar la cantidad
                carrito = carrito.map(item => {
                    if (item.id === id) {
                        item.cantidad++;
                    }
                    return item;
                });
            } else {
                // Agregar libro nuevo
                carrito.push(libro);
            }

            guardarEnStorage();
            alert(`"${titulo}" se ha agregado a tu carrito de compras.`);
        });
    });

    // LÓGICA PARA CARRITO-COMPRAS.HTML - Mostrar el carrito
    function mostrarCarrito() {
        if (!contenedorCarrito) return; // Salir si no estamos en la página del carrito

        contenedorCarrito.innerHTML = ''; // Limpiar el HTML
        let precioTotal = 0;

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = '<p style="text-align:center; color: var(--gris-texto);">Tu carrito está vacío. ¡Ve a buscar unos libros!</p>';
            totalCarrito.textContent = 'Total: $0';
            return;
        }

        carrito.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('item-carrito');
            div.innerHTML = `
                <div class="info-item">
                    <h3>${item.titulo}</h3>
                    <p>${item.autor}</p>
                    <p>Precio unitario: $${item.precio} | <strong>Cantidad: ${item.cantidad}</strong></p>
                </div>
                <div>
                    <button class="eliminar-item boton" data-id="${item.id}">X Eliminar</button>
                </div>
            `;
            contenedorCarrito.appendChild(div);
            precioTotal += item.precio * item.cantidad;
        });

        totalCarrito.textContent = `Total: $${precioTotal}`;

        // Asignar función a los nuevos botones de eliminar
        document.querySelectorAll('.eliminar-item').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                // Filtrar el carrito quitando el elemento seleccionado
                carrito = carrito.filter(item => item.id !== id);
                guardarEnStorage();
                mostrarCarrito(); // Volver a dibujar el carrito
            });
        });
    }

    // Guardar el carrito actualizado en localStorage
    function guardarEnStorage() {
        localStorage.setItem('carritoBookHub', JSON.stringify(carrito));
    }

    // Vaciar todo el carrito
    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            carrito = [];
            guardarEnStorage();
            mostrarCarrito();
        });
    }

    // Si estamos en la página del carrito, renderizamos los artículos al cargar
    if (contenedorCarrito) {
        mostrarCarrito();
    }
});

// 5.LÓGICA PARA INDEX.HTML - Agregar al carrito y redirigir
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Obtenemos los datos del botón
            const id = e.target.getAttribute('data-id');
            const titulo = e.target.getAttribute('data-titulo');
            const autor = e.target.getAttribute('data-autor');
            const precio = parseFloat(e.target.getAttribute('data-precio'));

            // Obtenemos el ID del input asociado y leemos la cantidad elegida
            const inputAsociado = e.target.getAttribute('data-input');
            const cantidadSeleccionada = parseInt(document.getElementById(inputAsociado).value);

            // Validamos que la cantidad sea un número válido y mayor a 0
            if (isNaN(cantidadSeleccionada) || cantidadSeleccionada < 1) {
                alert("Por favor, selecciona una cantidad válida.");
                return;
            }

            // Revisar si el libro ya está en el carrito
            const existe = carrito.some(item => item.id === id);

            if (existe) {
                // Si existe, le sumamos la cantidad que el usuario acaba de seleccionar
                carrito = carrito.map(item => {
                    if (item.id === id) {
                        item.cantidad += cantidadSeleccionada;
                    }
                    return item;
                });
            } else {
                // Agregar libro nuevo con su cantidad respectiva
                const libro = { id, titulo, autor, precio, cantidad: cantidadSeleccionada };
                carrito.push(libro);
            }

            // Guardamos en el localStorage
            guardarEnStorage();

            // REDIRECCIÓN: Enviamos al usuario a la página del carrito
            window.location.href = 'carrito-compras.html';
        });
    });

document.addEventListener('DOMContentLoaded', function() {

    // 1. Buscador de libros por autor
    const formBusqueda = document.getElementById('formularioBusqueda');
    const mostrarTodos = document.getElementById('mostrarTodos');
    const resultado = document.getElementById('resultadoBusqueda');

    if (formBusqueda) {
        formBusqueda.addEventListener('submit', function(evento) {
            evento.preventDefault();
            const textoBuscado = document.getElementById('autor').value.toLowerCase().trim();
            const libros = document.querySelectorAll('.libro');
            let encontrados = 0;

            if (textoBuscado === '') {
                libros.forEach(libro => libro.style.display = 'inline-block');
                alert('Por favor escribe el nombre de un autor o título.');
                return;
            }

            libros.forEach(function(libro) {
                const textoCompleto = libro.textContent.toLowerCase();
                if (textoCompleto.includes(textoBuscado)) {
                    libro.style.display = 'inline-block';
                    encontrados++;
                } else {
                    libro.style.display = 'none';
                }
            });

            if (resultado) resultado.textContent = 'Resultados: ' + encontrados + ' libros encontrados';
            if (encontrados === 0) alert('No se encontraron libros.');
        });

        if (mostrarTodos) {
            mostrarTodos.addEventListener('click', function() {
                const libros = document.querySelectorAll('.libro');
                libros.forEach(libro => libro.style.display = 'inline-block');
                document.getElementById('autor').value = '';
                if (resultado) resultado.textContent = 'Resultados: ' + libros.length + ' libros encontrados';
            });
        }
    }

    // 2. MÉTODO PARA CREAR CUENTA
    const formCuenta = document.getElementById('formularioCuenta');
    if (formCuenta) {
        formCuenta.addEventListener('submit', function(evento) {
            evento.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const genero = document.getElementById('libro').value;
            const clave = document.getElementById('clave').value;

            if (clave.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            alert('¡Cuenta creada con éxito!\n\nBienvenido a BookHub, ' + nombre + '.\nHemos guardado tus gustos sobre: ' + genero);
            formCuenta.reset();
        });
    }

    // 3. MÉTODO PARA INICIO DE SESIÓN
    const formLogin = document.getElementById('formularioLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(evento) {
            evento.preventDefault();
            const email = document.getElementById('email').value;
            alert('¡Bienvenido de nuevo!\nHas iniciado sesión correctamente con el correo: ' + email);
            formLogin.reset();
        });
    }

    // 4. LÓGICA DEL CARRITO DE COMPRAS
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const contenedorCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const botonVaciar = document.getElementById('vaciar-carrito');

    // Cargar carrito de la memoria
    let carrito = JSON.parse(localStorage.getItem('carritoBookHub')) || [];

    // Lógica para AGREGAR (En el index.html)
    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const titulo = e.target.getAttribute('data-titulo');
                const autor = e.target.getAttribute('data-autor');
                const precio = parseFloat(e.target.getAttribute('data-precio'));

                const inputAsociado = e.target.getAttribute('data-input');
                const cantidadElemento = document.getElementById(inputAsociado);
                const cantidadSeleccionada = parseInt(cantidadElemento.value);

                if (isNaN(cantidadSeleccionada) || cantidadSeleccionada < 1) {
                    alert("Por favor, selecciona una cantidad válida.");
                    return;
                }

                const existe = carrito.some(item => item.id === id);
                if (existe) {
                    carrito = carrito.map(item => {
                        if (item.id === id) item.cantidad += cantidadSeleccionada;
                        return item;
                    });
                } else {
                    carrito.push({ id, titulo, autor, precio, cantidad: cantidadSeleccionada });
                }

                localStorage.setItem('carritoBookHub', JSON.stringify(carrito));
                window.location.href = 'carrito-compras.html';
            });
        });
    }

    // Lógica para MOSTRAR (En carrito-compras.html)
    function mostrarCarrito() {
        if (!contenedorCarrito) return;

        contenedorCarrito.innerHTML = '';
        let precioTotal = 0;

        if (carrito.length === 0) {
            contenedorCarrito.innerHTML = '<p style="text-align:center; color: var(--gris-texto);">Tu carrito está vacío. ¡Ve a buscar unos libros!</p>';
            totalCarrito.textContent = 'Total: $0';
            return;
        }

        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            const div = document.createElement('div');
            div.classList.add('item-carrito');
            div.innerHTML = `
                <div class="info-item">
                    <h3>${item.titulo}</h3>
                    <p>${item.autor}</p>
                    <p>Precio unitario: $${item.precio} | <strong>Cantidad: ${item.cantidad}</strong></p>
                </div>
                <div style="text-align: right;">
                    <p class="precio" style="margin-bottom: 5px !important;">Subtotal: $${subtotal}</p>
                    <button class="eliminar-item boton" data-id="${item.id}">X Eliminar</button>
                </div>
            `;
            contenedorCarrito.appendChild(div);
            precioTotal += subtotal;
        });

        totalCarrito.textContent = `Total: $${precioTotal}`;

        // Activar botones de eliminar
        document.querySelectorAll('.eliminar-item').forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                carrito = carrito.filter(item => item.id !== id);
                localStorage.setItem('carritoBookHub', JSON.stringify(carrito));
                mostrarCarrito();
            });
        });
    }

    // Vaciar todo el carrito
    if (botonVaciar) {
        botonVaciar.addEventListener('click', () => {
            carrito = [];
            localStorage.setItem('carritoBookHub', JSON.stringify(carrito));
            mostrarCarrito();
        });
    }

    // Pintar el carrito apenas cargue la página carrito-compras.html
    if (contenedorCarrito) {
        mostrarCarrito();
    }
});
