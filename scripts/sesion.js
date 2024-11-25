const formularioInicioSesion = document.querySelector("#formularioInicioSesion");

if (formularioInicioSesion) {
    formularioInicioSesion.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = event.target.email.value;
        const contraseña = event.target.contraseña.value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // La arrow function (=>) funciona como condición del .find() de la misma manera que en el registro pero se le agrega la comprobación de la contraseña.
        const usuario = usuarios.find(user => user.email === email && user.contraseña === contraseña);

        const mensajeContenedor = document.querySelector("#mensajeError");
        mensajeContenedor.innerHTML = "";

        if (usuario) {
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
            location.href = "./home.html";
        } else {
            const mensaje = document.createElement("p");
            mensaje.textContent = "Datos inválidos. Por favor, verifica tu correo y contraseña.";
            mensaje.style.color = "red";
            mensajeContenedor.appendChild(mensaje);
        }
    });
}

const iniciarSesionBtn = document.querySelector('#iniciarSesionBtn');
const registrarseBtn = document.querySelector('#registrarseBtn');
const cerrarSesionBtn = document.querySelector('#cerrarSesionBtn');
const eliminarUsuarioBtn = document.querySelector('#eliminarUsuarioBtn');

const usuarioLogueado = localStorage.getItem('usuarioLogueado');

if (usuarioLogueado) {
    // Si hay un usuario logueado, se cambian los botones de "Iniciar sesión" y "Registrarse" por "Cerrar sesión" y "Eliminar usuario".
    iniciarSesionBtn.style.display = 'none';
    registrarseBtn.style.display = 'none';
    cerrarSesionBtn.style.display = 'inline-block';
    eliminarUsuarioBtn.style.display = 'inline-block';
} else {
    // Si NO hay un usuario logueado o se desloguea, se cambian "Cerrar sesión" y "Eliminar usuario" por "Iniciar sesión" y "Registrarse"
    iniciarSesionBtn.style.display = 'inline-block';
    registrarseBtn.style.display = 'inline-block';
    cerrarSesionBtn.style.display = 'none';
    eliminarUsuarioBtn.style.display = 'none';
}

cerrarSesionBtn.addEventListener('click', function () {
    localStorage.removeItem('usuarioLogueado');
    location.reload(); // Recarga la página para actualizar los botones
});

eliminarUsuarioBtn.addEventListener('click', function () {
    const confirmation = confirm('¿Está seguro de querer eliminar el usuario actual?');
    if (confirmation) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuario = JSON.parse(usuarioLogueado);

        // Filtrar el usuario logueado y actualizar el localStorage
        const usuariosActualizados = usuarios.filter(user => user.email !== usuario.email);
        localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));

        // Eliminar la sesión activa
        localStorage.removeItem('usuarioLogueado');

        alert('Su cuenta fué eliminada correctamente.');
        location.href = "./home.html"
    }
});

