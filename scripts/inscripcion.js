const formulario = document.querySelector("#registrationForm");
const añadirPersona = document.querySelector("#add-person");
const tarifa = document.querySelector("#feeAmount");
const botonRegistro = document.querySelector("#registerButton");

const modal = document.querySelector("#summaryModal");
const resumenModal = document.querySelector("#summaryContent");
const confirmarModal = document.querySelector("#confirmModal");
const cerrarModal = document.querySelector("#closeModal");

const urlParams = new URLSearchParams(window.location.search);

// Obtiene el nombre del curso según el que se haya seleccionado.
function obtenerTitulo() {
    const nombreCursoSeleccionado = urlParams.get("curso");
    const nombreCurso = document.querySelector("h2");
    nombreCurso.textContent = `${nombreCursoSeleccionado}`;
}

// Obtiene la tarifa base según el curso seleccionado.
function obtenerTarifaBase() {
    const valorCursoSeleccionado = urlParams.get("valor");
    const tarifaBase = parseFloat(valorCursoSeleccionado.replace('$', '').replace(',', '.'));
    return tarifaBase;
}

let tarifaBase = obtenerTarifaBase();
let nombreCurso = obtenerTitulo()

let contadorPersonas = 1;

function patternTelefono(input) {
    input.addEventListener("input", function (event) {
        let value = event.target.value;
        value = value.replace(/[^0-9-]/g, ""); // Permite solo números y guiones.
        event.target.value = value;
    });
}

// Si se ingresa un teléfono en los inputs de la primera persona, se le aplica el pattern.
const telefonoDefault = document.querySelector("#tel-number");
if (telefonoDefault) {
    patternTelefono(telefonoDefault);
}

añadirPersona.addEventListener("click", () => {
    contadorPersonas++;

    const nuevaPersona = document.createElement("div");
    nuevaPersona.classList.add("field");
    nuevaPersona.innerHTML = `
        <input type="text" placeholder="Nombre" required>
        <input type="text" placeholder="Apellido" required>
        <input type="number" placeholder="DNI" required>
        <input type="email" placeholder="Email" required>
        <input type="text" id="tel-number" placeholder="Teléfono (opcional)">
        <div class="delete-person" id="delete-person">
            <img src="./assets/circulo-negativo.png" alt="delete">
        </div>
    `;

    // .insertBefore() añade un nodo como hijo de otro antes que ese otro, siendo (nuevoNodo, nodoReferencia).
    formulario.insertBefore(nuevaPersona, añadirPersona);
    actualizarTarifa();

    // Si se ingresa un teléfono en los inputs de una persona agregada, se le aplica el pattern.
    const nuevoTelefono = nuevaPersona.querySelector("#tel-number");
    if (nuevoTelefono) {
        patternTelefono(nuevoTelefono);
    }
});

function actualizarTarifa() {
    const tarifaTotal = tarifaBase * contadorPersonas;
    tarifa.textContent = `$${tarifaTotal.toFixed(2)}`;
}

formulario.addEventListener("click", (event) => {
    // .closest() busca al ancestro que más cercano al click. Lo usé porque no funcionaba cuando se hacia click sobre la imágen.
    if (event.target && event.target.closest(".delete-person")) {
        const campos = formulario.querySelectorAll(".field");

        // Si solo hay una persona, limpia los campos.
        if (campos.length === 1) {
            const persona = campos[0];
            const nombreABorrar = persona.querySelector('input[placeholder="Nombre"]');
            const apellidoABorrar = persona.querySelector('input[placeholder="Apellido"]');
            const dniABorrar = persona.querySelector('input[placeholder="DNI"]');
            const emailABorrar = persona.querySelector('input[placeholder="Email"]');
            const telefonoABorrar = persona.querySelector('input[placeholder="Teléfono (opcional)"]');

            // Solo se limpian los existentes.
            if (nombreABorrar) {
                nombreABorrar.value = '';
            }
            if (apellidoABorrar) {
                apellidoABorrar.value = '';
            }
            if (dniABorrar) {
                dniABorrar.value = '';
            }
            if (emailABorrar) {
                emailABorrar.value = '';
            }
            if (telefonoABorrar) {
                telefonoABorrar.value = '';
            }
        } else {
            // Si hay más de una persona, se elimina la persona seleccionada. 
            const personaAEliminar = event.target.closest(".field");
            if (personaAEliminar) {
                personaAEliminar.remove();
                contadorPersonas--;
                actualizarTarifa();
            }
        }
    }
});

botonRegistro.addEventListener("click", (event) => {
    event.preventDefault();
    resumenModal.innerHTML = "";

    const camposResumen = formulario.querySelectorAll(".field");
    let isValid = true;

    camposResumen.forEach((field, index) => {
        const nombreAValidar = field.querySelector('input[placeholder="Nombre"]')?.value;
        const apellidoAValidar = field.querySelector('input[placeholder="Apellido"]')?.value;
        const dniAValidar = field.querySelector('input[placeholder="DNI"]')?.value;
        const emailAValidar = field.querySelector('input[placeholder="Email"]')?.value;
        const telefonoAValidar = field.querySelector('input[placeholder="Teléfono (opcional)"]')?.value;

        if (nombreAValidar === "") {
            alert("Por favor ingrese un nombre.");
            isValid = false;
        }

        if (apellidoAValidar === "") {
            alert("Por favor ingrese un apellido.");
            isValid = false;
        }

        if (dniAValidar === "" || dniAValidar.length > 8) {
            alert("Por favor ingrese un DNI válido.");
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAValidar)) {
            alert("Por favor ingrese un correo electrónico válido.");
            isValid = false;
        }

        const telRegex = /^\d{4}-?\d{4}$/;
        if (telefonoAValidar !== "" && !telRegex.test(telefonoAValidar)) {
            alert("Por favor ingrese un número de teléfono válido.");
            isValid = false;
        }

        if (isValid) {
            resumenModal.innerHTML += `<p><strong>${index + 1}.</strong> ${nombreAValidar} ${apellidoAValidar} - ${emailAValidar}</p>`;
        }
    });

    if (isValid) {
        modal.style.display = "block";
    }
});

confirmarModal.onclick = function () {
    window.location.href = "./carrito.html";
};

cerrarModal.onclick = function () {
    modal.style.display = "none";
};

actualizarTarifa();
