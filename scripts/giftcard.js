document.addEventListener("DOMContentLoaded", function () {
    const nombreInput = document.querySelector('input[name="nombre_destinatario"]');
    const colorInputs = document.querySelectorAll('input[name="color"]');
    const fontSizeInputs = document.querySelectorAll('input[name="fontSize"]');
    const montoInput = document.querySelector('input[name="monto"]');
    const ubicacionMontoInputs = document.querySelectorAll('input[name="ubi"]');
    const fondoInputs = document.querySelectorAll('input[name="fondo"]');

    const previewCard = document.querySelector(".vistaPrevia");
    const previewDestinatario = document.querySelector(".vistaPrevia span");
    const previewMonto = document.querySelector(".valor");

    nombreInput.addEventListener("input", function () {
        previewDestinatario.textContent = this.value ? `Gift Card para ${this.value}` : "Gift Card para...";
    });

    colorInputs.forEach(input => {
        input.addEventListener("change", function () {
            previewDestinatario.style.color = this.value;
        });
    });

    fontSizeInputs.forEach(input => {
        input.addEventListener("change", function () {
            previewDestinatario.style.fontSize = this.value;
        });
    });

    montoInput.addEventListener("input", function () {
        previewMonto.textContent = `$${parseFloat(montoInput.value).toFixed(2)}`;
    });

    ubicacionMontoInputs.forEach(input => {
        input.addEventListener("change", function () {
            previewMonto.className = "valor";
            previewMonto.classList.add(this.value);
        });
    });

    fondoInputs.forEach(input => {
        input.addEventListener("change", function () {
            const bgColorMap = {
                "fondo1": "#808080",
                "fondo2": "#ffc0cb",
                "fondo3": "#add8e6",
                "fondo4": "#2b962b",
                "fondo5": "#ffa500"
            };
            previewCard.style.backgroundColor = bgColorMap[this.value];
        });
    });
});