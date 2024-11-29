const formularioContacto = document.querySelector("#contactForm");

formularioContacto.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombreApellido = document.querySelector("#nombre_y_apellido").value;
    const telefono = document.querySelector("#tel-number").value;
    const email = document.querySelector("#email").value;
    const comentario = document.querySelector("#comentario").value;

    let isValid = true;

    // Eliminar mensajes de error previos.
    const mensajesError = document.querySelectorAll(".error-message");
    mensajesError.forEach((mensaje) => mensaje.remove());

    if (nombreApellido === "") {
        const errorNombre = document.createElement("p");
        errorNombre.classList.add("error-message");
        errorNombre.textContent = "El campo de nombre y apellido no puede estar vacío.";

        document.querySelector("#nombre_y_apellido").after(errorNombre);
        isValid = false;
    }

    // Regex = Regular Expression.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const errorEmail = document.createElement("p");
        errorEmail.classList.add("error-message");
        errorEmail.textContent = "Por favor ingrese un correo electrónico válido.";

        document.querySelector("#email").after(errorEmail);
        isValid = false;
    }

    const telRegex = /^\d{4}-?\d{4}$/;
    if (telefono !== "" && !telRegex.test(telefono)) {
        const errorTelefono = document.createElement("p");
        errorTelefono.classList.add("error-message");
        errorTelefono.textContent = "Por favor ingrese un número de teléfono válido.";

        document.querySelector("#tel-number").after(errorTelefono);
        isValid = false;
    }

    if (comentario.trim() === "") {
        const errorComentario = document.createElement("p");
        errorComentario.classList.add("error-message");
        errorComentario.textContent = "El campo de comentario no puede estar vacío.";

        document.querySelector("#comentario").after(errorComentario);
        isValid = false;
    }

    // Si el formulario es válido se muestra el modal.
    if (isValid) {
        const summaryModal = document.querySelector("#summaryModal");
        summaryModal.style.display = "block";
    }
});

const botonAceptar = document.querySelector("#confirmModal");
botonAceptar.addEventListener("click", function () {
    const ocultarPopup = document.querySelector("#summaryModal");
    ocultarPopup.style.display = "none";
    window.location.href = "./home.html";
});

const comentarioInput = document.querySelector("#comentario");
comentarioInput.addEventListener("input", function () {
    const maxChars = 1000;
    const caracteresActuales = this.value.length;
    const caracteresRestantes = maxChars - caracteresActuales;

    const contadorCaracteres = document.querySelector("#charCount");
    contadorCaracteres.textContent = `Caracteres restantes: ${caracteresRestantes}`;

    // Limita el comentario a 1000 caracteres.
    if (caracteresActuales > maxChars) {
        this.value = this.value.substring(0, maxChars);
        contadorCaracteres.textContent = `Caracteres restantes: 0`;
    }
});

const telefonoInput = document.querySelector("#tel-number");
telefonoInput.addEventListener("input", function (event) {
    let value = event.target.value;
    value = value.replace(/[^0-9-]/g, ""); // Permite solo números y guiones.
    event.target.value = value;
});
