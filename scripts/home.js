const sliderContainer = document.querySelector(".slider__container");
const sliderItems = document.querySelectorAll(".slider__item");
const botonAnterior = document.querySelector("#prevBtn");
const botonSiguiente = document.querySelector("#nextBtn");

const totalItems = sliderItems.length;
let itemActual = 0;

// Cambio automático de item cada 6 segundos.
setInterval(() => {
    changeSlide(itemActual + 1);
}, 6000);

botonAnterior.addEventListener("click", () => {
    changeSlide(itemActual - 1);
});

botonSiguiente.addEventListener("click", () => {
    changeSlide(itemActual + 1);
});

function changeSlide(index) {
    // Asegura que el índice esté dentro del rango.
    if (index < 0) {
        itemActual = totalItems - 1; // Si es menor que 0, va al último item.
    } else if (index >= totalItems) {
        itemActual = 0; // Si es mayor o igual al total de items, va al primero.
    } else {
        itemActual = index;
    }

    sliderContainer.style.transform = `translateX(-${itemActual * 100}%)`;
}

changeSlide(itemActual);
