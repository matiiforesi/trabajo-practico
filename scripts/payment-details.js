const paymentForm = document.querySelector(".details");
const numeroTarjeta = document.querySelector("#card-number");

numeroTarjeta.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Elimina lo no numérico.
    if (value.length > 4) {
        value = value.replace(/(\d{4})(?=\d)/g, "$1-"); // Añade guiones.
    }
    e.target.value = value;
});

paymentForm.addEventListener("submit", () => {
    localStorage.removeItem("carrito");
});
