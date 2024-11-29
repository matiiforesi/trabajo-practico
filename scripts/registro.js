const registroFormulario = document.querySelector("#registroFormulario");

registroFormulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = event.target.nombre.value;
    const apellido = event.target.apellido.value;
    const email = event.target.email.value;
    const contraseña = event.target.contraseña.value;
    const validarContraseña = event.target.validar_contraseña.value;

    const mensajeContenedor = document.querySelector("#mensajeError");
    mensajeContenedor.innerHTML = "";

    if (contraseña !== validarContraseña) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Las contraseñas no coinciden.";
        mensaje.style.color = "red";
        mensajeContenedor.appendChild(mensaje);
        return;
    }

    const nuevoUsuario = { nombre, apellido, email, contraseña };

    // Obtiene los usuarios del localStorage, si no hay usuarios registrados devuelve un array vacio (|| []).
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Arrow function (=>) como condición del .find() busca sobre user, que representa a cada elemento del array usuarios, si el mail ingresado coincide con alguno ya registrado.
    const usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Este correo ya fue registrado.";
        mensaje.style.color = "red";
        mensajeContenedor.appendChild(mensaje);
        return;
    }

    // Agrega un usuario al array de usuarios y lo guarda en el localStorage.
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso. Se le rediccionará a la página de inicio de sesión.");
    window.location.href = "./inicioSesion.html";
});
