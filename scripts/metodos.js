document.addEventListener('DOMContentLoaded', function() {
    // Mostrar "Mi Perfil" en si el usuario inicia sesion 
    function actualizarNav() {
        const linkPerfil = document.getElementById('linkPerfil');
        const haySesion = localStorage.getItem('sesionActivaBookHub');
        if (linkPerfil) linkPerfil.style.display = haySesion ? 'inline' : 'none';
    }
    actualizarNav();

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

    // 2. Metodo para crear cuenta de usuario
    const formCuenta = document.getElementById('formularioCuenta');
    if (formCuenta) {
        formCuenta.addEventListener('submit', function(evento) {
            evento.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const genero = document.getElementById('libro').value;
            const clave = document.getElementById('clave').value;

            if (clave.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            localStorage.setItem('perfilBookHub', JSON.stringify({ nombre, email, genero }));

            alert('¡Cuenta creada con éxito!\n\nBienvenido a BookHub, ' + nombre + '.\nHemos guardado tus gustos sobre: ' + genero);
            formCuenta.reset();
        });
    }

    // 3. Metodo para iniciar sesión de usuario
    const formLogin = document.getElementById('formularioLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', function(evento) {
            evento.preventDefault();
            const email = document.getElementById('email').value;
            localStorage.setItem('sesionActivaBookHub', email);
            alert('¡Bienvenido de nuevo!\nHas iniciado sesión correctamente con el correo: ' + email);
            formLogin.reset();
            actualizarNav();
        });
    }

    // 4. Logica para el carrito de compras
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const contenedorCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    const botonVaciar = document.getElementById('vaciar-carrito');

    // Cargar carrito de la memoria
    let carrito = JSON.parse(localStorage.getItem('carritoBookHub')) || [];

    // Logica para AGREGAR (En el index.html)
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
                alert(`"${titulo}" se agrego a tu carrito de compras.`);
            });
        });
    }

    // Logica para MOSTRAR (En carrito-compras.html)
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

    // 6. MÉTODO PARA MI PERFIL (userpage.html)
    const datosPerfil = document.getElementById('datosPerfil');
    if (datosPerfil) {
        const perfilGuardado = JSON.parse(localStorage.getItem('perfilBookHub'));

        if (perfilGuardado) {
            document.getElementById('perfilNombre').textContent = perfilGuardado.nombre || '';
            document.getElementById('perfilEmail').textContent = perfilGuardado.email || '';
            document.getElementById('perfilGenero').textContent = perfilGuardado.genero || '';
        }

        const botonCerrarSesion = document.getElementById('cerrarSesion');
        if (botonCerrarSesion) {
            botonCerrarSesion.addEventListener('click', () => {
                localStorage.removeItem('perfilBookHub');
                localStorage.removeItem('sesionActivaBookHub');
                alert('Sesión cerrada correctamente.');
                actualizarNav();
                window.location.href = 'inicio-sesion.html';
            });
        }
    }
});
