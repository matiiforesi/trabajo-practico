let carrito = []; // Array para almacenar los cursos.

const sidebar = document.querySelector("#sidebar");
const abrirSidebarBtn = document.querySelector(".cart");
const numeroIconCarrito = document.querySelector(".cart span");
const cerrarSidebarBtn = document.querySelector("#cerrarSidebarBtn");
const mensajeVacio = document.querySelector(".mensajeVacio");
const listaSidebar = document.querySelector("#listaSidebar");
const totalSidebar = document.querySelector("#precioSidebar");

abrirSidebarBtn.addEventListener("click", () => {
    actualizarCarrito();
    sidebar.style.display = "flex";
});

cerrarSidebarBtn.addEventListener("click", () => {
    sidebar.style.display = "none";
});

function actualizarCarrito() {
    listaSidebar.innerHTML = "";

    if (carrito.length === 0) {
        mensajeVacio.style.display = "block";
    } else {
        mensajeVacio.style.display = "none";
    }

    // Crea elementos para cada curso del carrito.
    carrito.forEach((curso, index) => {
        const li = document.createElement("li");
        li.textContent = `${curso.nombre} - $${curso.precio}`;
        li.classList.add("item-carrito");

        const eliminarCursoBtn = document.createElement("button");
        eliminarCursoBtn.textContent = "X";
        eliminarCursoBtn.classList.add("eliminar-curso");
        eliminarCursoBtn.addEventListener("click", () => eliminarCurso(index));

        li.appendChild(eliminarCursoBtn);
        listaSidebar.appendChild(li);
    });

    // Actualiza el total.
    const total = carrito.reduce((sum, curso) => sum + curso.precio, 0);
    totalSidebar.textContent = `$${total.toFixed(2)}`;

    // Actualiza el contador del ícono del carrito.
    numeroIconCarrito.textContent = carrito.length;
}

function agregarCurso(curso) {
    carrito.push(curso);
    actualizarCarrito();
}

function eliminarCurso(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}
