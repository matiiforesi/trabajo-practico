const datosCursosModal = {
    "JavaScript": {
        titulo: "Curso de JavaScript",
        modalidad: "Virtual",
        pagina: "cursoVirtual.html"
    },
    "HTML & CSS": {
        titulo: "Curso de HTML & CSS",
        modalidad: "Virtual",
        pagina: "cursoVirtual.html"
    },
    "Python": {
        titulo: "Curso de Python",
        modalidad: "Virtual",
        pagina: "cursoVirtual.html"
    },
    "SQL": {
        titulo: "Curso de SQL",
        modalidad: "Presencial",
        pagina: "cusoPresencial.html"
    },
    "Java": {
        titulo: "Curso de Java",
        modalidad: "Presencial",
        pagina: "cursoPresencial.html"
    },
    "Diseño UI/UX": {
        titulo: "Curso de Diseño UI/UX",
        modalidad: "Presencial",
        pagina: "cursoPresencial.html",
    }
};

const modal = document.querySelector(".modal-curso");
const modalTitulo = document.querySelector("#modal-titulo");
const modalModalidad = document.querySelector("#modal-modalidad");
const botonIrCurso = document.querySelector("#boton-ir-curso");
const botonCerrarModal = document.querySelector("#boton-cerrar-modal");

const abrirModal = (tituloCurso) => {
    const curso = datosCursosModal[tituloCurso];
    modalTitulo.textContent = curso.titulo;
    modalModalidad.textContent = `Modalidad: ${curso.modalidad}`;
    botonIrCurso.onclick = () => {
        window.location.href = `./${curso.pagina}?curso=${encodeURIComponent(curso.titulo)}`;
    };
    modal.style.display = "flex";
};

document.querySelectorAll(".calendar-container .day button").forEach((boton) => {
    boton.addEventListener("click", (e) => {
        const tituloCurso = boton.dataset.curso; // Obtiene el nombre del curso del atributo data-curso.
        abrirModal(tituloCurso);
    });
});

botonCerrarModal.addEventListener("click", () => {
    modal.style.display = "none"
});
