const formularioInicioSesion = document.querySelector("#formularioInicioSesion");

if (formularioInicioSesion) {
    formularioInicioSesion.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = event.target.email.value;
        const contraseña = event.target.contraseña.value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // La arrow function (=>) funciona como condición del .find() de la misma manera que en el registro pero se le agrega la comprobación de la contraseña.
        const usuario = usuarios.find(user => user.email === email && user.contraseña === contraseña);

        if (usuario) {
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
            alert("Inicio de sesión exitoso. ¡Bienvenido!");
            location.href = "./home.html";
        } else {
            alert("Datos inválidos. Por favor, verifica tu correo y contraseña.");
        }
    });
}

const iniciarSesionBtn = document.querySelector('#iniciarSesionBtn');
const registrarseBtn = document.querySelector('#registrarseBtn');
const cerrarSesionBtn = document.querySelector('#cerrarSesionBtn');

const usuarioLogueado = localStorage.getItem('usuarioLogueado');

if (usuarioLogueado) {
    // Si hay un usuario logueado, se cambian los botones de "Iniciar sesión" y "Registrarse" por "Cerrar sesión".
    iniciarSesionBtn.style.display = 'none';
    registrarseBtn.style.display = 'none';
    cerrarSesionBtn.style.display = 'inline-block';
} else {
    // Si NO hay un usuario logueado o se desloguea, se cambia "Cerrar sesión" por "Iniciar sesión" y "Registrarse"
    iniciarSesionBtn.style.display = 'inline-block';
    registrarseBtn.style.display = 'inline-block';
    cerrarSesionBtn.style.display = 'none';
}

cerrarSesionBtn.addEventListener('click', function () {
    localStorage.removeItem('usuarioLogueado');
    location.reload(); // Recarga la página para actualizar los botones
});