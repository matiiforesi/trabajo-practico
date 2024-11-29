let carrito = []; // Array para almacenar los cursos.

const sidebar = document.querySelector("#sidebar");
const abrirSidebarBtn = document.querySelector(".cart");
const numeroIconCarrito = document.querySelector(".cart span");
const cerrarSidebarBtn = document.querySelector("#cerrarSidebarBtn");
const mensajeVacio = document.querySelector(".mensajeVacio");
const listaSidebar = document.querySelector("#listaSidebar");
const totalSidebar = document.querySelector("#precioSidebar");

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

abrirSidebarBtn.addEventListener("click", () => {
    actualizarSidebar();
    sidebar.style.display = "flex";
});

cerrarSidebarBtn.addEventListener("click", () => {
    sidebar.style.display = "none";
});

function actualizarSidebar() {
    listaSidebar.innerHTML = "";

    if (carrito.length === 0) {
        mensajeVacio.style.display = "block";
    } else {
        mensajeVacio.style.display = "none";
    }

    carrito.forEach((curso, index) => {
        const li = document.createElement("li");
        li.classList.add("item-carrito");

        li.innerHTML = `
            <div>
                <p><strong>${curso.nombre}</strong> - $${curso.precio.toFixed(2)}</p>
                ${curso.modalidad === "Presencial" ? `<p class="cantidad-personas">Inscritos: ${curso.cantidad}</p>` : ""}
            </div>
        `;

        const eliminarCursoBtn = document.createElement("button");
        eliminarCursoBtn.textContent = "X";
        eliminarCursoBtn.classList.add("eliminar-curso");
        eliminarCursoBtn.addEventListener("click", () => eliminarCurso(index));

        li.appendChild(eliminarCursoBtn);

        listaSidebar.appendChild(li);
    });

    // Calcula y actualiza el total.
    const total = carrito.reduce((sum, curso) => sum + curso.precio, 0);
    totalSidebar.textContent = `$${total.toFixed(2)}`;

    // Actualiza el número de cursos en el ícono del carrito.
    numeroIconCarrito.textContent = carrito.length;
}

function agregarCurso(curso) {
    carrito.push(curso);
    guardarCarrito();
    actualizarSidebar();
    actualizarCarrito();
}

function eliminarCurso(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarSidebar();
    actualizarCarrito();
}

function actualizarCarrito() {
    const carroVacio = document.querySelector(".carro-vacio");
    const carroCargado = document.querySelector(".carro-cargado")
    const pagar = document.querySelector(".pagar");
    const listaCarrito = document.querySelector(".cesta-curso");
    const precioTotal = document.querySelector(".cart-precio-p");

    if (!carroVacio || !carroCargado || !pagar || !listaCarrito || !precioTotal) {
        return; // Si alguno de estos elementos no está presente, se sale de la función.
    }

    // Elimina solo los elementos dinámicos relacionados con los cursos.
    const cursosEnCarrito = listaCarrito.querySelectorAll(".curso-desc");
    cursosEnCarrito.forEach((curso) => curso.remove());

    if (carrito.length === 0) {
        carroVacio.style.display = "block";
        carroCargado.style.display = "none"
        pagar.addEventListener("click", (e) => {
            e.preventDefault();
            alert("No se agregaron items al carro.")
        });
    } else {
        carroVacio.style.display = "none";
        carroCargado.style.display = "flex"
    }

    carrito.forEach((curso, index) => {
        const divCurso = document.createElement("div");
        divCurso.classList.add("curso-desc");

        // Determina la imagen el item.
        const imagenCurso = curso.modalidad === "Presencial"
            ? "./assets/curso-presencial--carrito.jpg"
            : curso.modalidad === "Gift Card"
                ? `./assets/gift-card--carrito.png`
                : "./assets/curso-virtual--carrito.jpg";

        divCurso.innerHTML = `
            <img src="${imagenCurso}">
            <div class="course-details">
                <b>${curso.nombre}</b>
                <p class="tipo-curso">${curso.modalidad === "Presencial" ? "Presencial" : curso.modalidad === "Gift Card" ? "Gift Card" : "Virtual"}</p>
                <p>Precio: $${curso.precio}</p>
                ${curso.modalidad === "Presencial" ? `<p>Inscritos: ${curso.cantidad}</p>` : ""}
            </div>
            <button class="eliminar-curso" data-index="${index}">Eliminar</button>
        `;

        carroCargado.appendChild(divCurso);
    });

    const total = carrito.reduce((sum, curso) => sum + curso.precio * (curso.cantidad || 1), 0);
    if (precioTotal) {
        precioTotal.textContent = `$${total.toFixed(2)}`;
    }

    const botonesEliminar = listaCarrito.querySelectorAll(".eliminar-curso");
    botonesEliminar.forEach((boton) => {
        const index = parseInt(boton.dataset.index, 10);
        boton.addEventListener("click", () => eliminarCurso(index));
    });
}

const agregarGiftCardBtn = document.querySelector("#agregarGiftCard");

if (agregarGiftCardBtn) {
    agregarGiftCardBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const nombreInput = document.querySelector('input[name="nombre_destinatario"]');
        const montoInput = document.querySelector('input[name="monto"]');

        const nombreDestinatario = nombreInput.value.trim();
        const monto = parseFloat(montoInput.value);

        if (nombreDestinatario === "") {
            alert("Por favor, ingrese el nombre del destinatario.")
            return;
        }

        if (isNaN(monto) || monto <= 0) {
            alert("Por favor, ingrese un monto válido para la gift card.");
            return;
        }

        // Crea el objeto gift card.
        const giftCard = {
            nombre: `Gift Card para ${nombreDestinatario}`,
            precio: monto,
            modalidad: "Gift Card",
            cantidad: 1
        };

        agregarCurso(giftCard);
        alert("¡Gift Card agregada al carrito!");
    });
}

cargarCarrito();
actualizarSidebar();
actualizarCarrito();
