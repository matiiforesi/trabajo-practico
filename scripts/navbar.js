const searchBar = document.querySelector(".search-bar input");
const cursosNavbar = {
    "JavaScript": "cursoVirtual.html?curso=Curso%20de%20JavaScript",
    "HTML & CSS": "cursoVirtual.html?curso=Curso%20de%20HTML%20%26%20CSS",
    "Python": "cursoVirtual.html?curso=Curso%20de%20Python",
    "SQL": "cursoPresencial.html?curso=Curso%20de%20SQL",
    "Java": "cursoPresencial.html?curso=Curso%20de%20Java",
    "Diseño UI/UX": "cursoPresencial.html?curso=Curso%20de%20Dise%C3%B1o%20UI%2FUX"
};

searchBar.addEventListener("change", () => {
    const cursoSeleccionado = searchBar.value;
    const url = cursosNavbar[cursoSeleccionado];
    if (url) {
        window.location.href = url;
    } else {
        alert("El curso seleccionado no está disponible.");
    }
});
