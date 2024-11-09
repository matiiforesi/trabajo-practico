const formularioRecupero = document.querySelector("#formularioRecupero");

formularioRecupero.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailIngresado = formularioRecupero.querySelector('input[name="email"]').value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(user => user.email === emailIngresado);

    const mensajeContenedor = document.querySelector("#mensajeRecupero");
    mensajeContenedor.innerHTML = ""; // Limpia lo que haya adentro de #mensaje.

    // Crea una etiqueta 'p' dentro de #mensaje para mostrar lo que corresponda.
    const mensaje = document.createElement("p");

    if (usuarioEncontrado) {
        // Si el correo está registrado.
        mensaje.textContent = "Enviaremos un correo con las instrucciones para recuperar tu contraseña."
        mensaje.style.color = "green";
    } else {
        // Si el correo no está registrado.
        mensaje.textContent = "El email ingresado no corresponde a un usuario registrado."
        mensaje.style.color = "red";
    }

    mensajeContenedor.appendChild(mensaje);
});