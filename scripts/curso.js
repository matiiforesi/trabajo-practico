const cursos = {
    "Curso de JavaScript": {
        titulo: "Curso de JavaScript",
        valor: "$84.99",
        modalidad: "Virtual",
        tiempo: "68.5hs",
        pagina: "cursoVirtual.html",
    },
    "Curso de HTML & CSS": {
        titulo: "Curso de HTML & CSS",
        valor: "$74.99",
        modalidad: "Virtual",
        tiempo: "37.5hs",
        pagina: "cursoVirtual.html",
    },
    "Curso de Python": {
        titulo: "Curso de Python",
        valor: "$84.99",
        modalidad: "Virtual",
        tiempo: "52hs",
        pagina: "cursoVirtual.html",
    },
    "Curso de SQL": {
        titulo: "Curso de SQL",
        valor: "$69.99",
        modalidad: "Presencial",
        tiempo: "21hs",
        pagina: "cursoPresencial.html",
    },
    "Curso de Java": {
        titulo: "Curso de Java",
        valor: "$84.99",
        modalidad: "Presencial",
        tiempo: "135hs",
        pagina: "cursoPresencial.html"
    },
    "Curso de Diseño UI/UX": {
        titulo: "Curso de Diseño UI/UX",
        valor: "$69.99",
        modalidad: "Presencial",
        tiempo: "25hs",
        pagina: "cursoPresencial.html",
    }
};

const urlParams = new URLSearchParams(window.location.search);
const tituloCurso = urlParams.get("curso");

// Busca el curso en el objeto 'cursos'.
const datosCurso = cursos[tituloCurso];

function actualizarDetalleCurso() {
    if (datosCurso) {
        const detalleCurso = document.querySelector(".detalle-curso");
        detalleCurso.querySelector("h3").textContent = `${datosCurso.titulo}`;
        detalleCurso.querySelector("ul").innerHTML = `
            <li>Valor: ${datosCurso.valor}</li>
            <li>Modalidad: ${datosCurso.modalidad}</li>
            <li>Tiempo de dedicación necesario: ${datosCurso.tiempo}</li>
            <li>Descripción del curso:
                <p class="detalle-curso__descripcion">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi optio iure at non
                    tempore.
                    Consequuntur, consectetur quam! Rerum hic deserunt blanditiis ipsum facilis dolorum quam
                    delectus corrupti dolore dignissimos? Consequuntur. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Temporibus molestiae, odit labore excepturi reprehenderit inventore.
                    Iusto placeat tenetur aperiam quibusdam, repellat neque? Recusandae facere, ad natus
                    voluptatibus saepe quibusdam quaerat?
                </p>
            </li>
        `;

        // Configura dinámicamente el enlace del botón "Inscribirse", usado para llevar info al formulario de inscripción.
        const linkInscripcion = document.querySelector("#linkInscripcion");
        if (linkInscripcion) {
            const urlInscripcion = `./inscripcion.html?curso=${encodeURIComponent(datosCurso.titulo)}&valor=${encodeURIComponent(datosCurso.valor)}`;
            linkInscripcion.setAttribute("href", urlInscripcion);
        }
    }
}

// Función para modificar los enlaces.
function configurarEnlaces() {
    const publicidades = document.querySelectorAll(".publicidades");
    publicidades.forEach(publicidad => {
        // Extrae el título desde el atributo data-curso.
        const datosCurso = JSON.parse(publicidad.getAttribute("data-curso"));
        const titulo = datosCurso.titulo;
        if (titulo && cursos[titulo]) {
            const datosCursoActual = cursos[titulo];
            const boton = publicidad.querySelector("a");
            boton.setAttribute("href", `./${datosCursoActual.pagina}?curso=${encodeURIComponent(datosCursoActual.titulo)}`);
        }
    });
}

const botonComprar = document.querySelector("#buyButton");
if (botonComprar) {
    botonComprar.addEventListener("click", (e) => {
        e.preventDefault()
        const cursoSeleccionado = {
            nombre: document.querySelector(".detalle-curso h3").textContent,
            precio: parseFloat(
                document.querySelector(".detalle-curso ul li:nth-child(1)").textContent.replace("Valor: $", "")
            ),
            modalidad: "Virtual",
            cantidad: 1 // Solo para cursos presenciales, pero se puede mantener como 1 por consistencia.
        };

        // Llamada a la función de carrito.js para agregar el curso al carrito.
        agregarCurso(cursoSeleccionado);
        alert("¡Curso agregado al carrito!");
    });
}

actualizarDetalleCurso();
configurarEnlaces();
