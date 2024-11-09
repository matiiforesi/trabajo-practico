const form = document.querySelector('.contenedor-fields');
const addPersonButton = document.getElementById('add-person');
addPersonButton.addEventListener('click', addPerson);
document.addEventListener('DOMContentLoaded', addPerson);

function addPerson(event) {
    const fields = document.querySelector('.fields');
    const field = document.createElement('div');
    field.classList.add('field');

    const nombre = document.createElement('input');
    nombre.type = 'text';
    nombre.placeholder = 'Nombre';

    const apellido = document.createElement('input');
    apellido.type = 'text';
    apellido.placeholder = 'Apellido';

    const numero = document.createElement('input');
    numero.type = 'number';
    numero.placeholder = 'DNI';

    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'delete';
    button.classList = 'deletePerson'
    button.onclick = function () {
        if (fields.querySelectorAll('.field').length > 1) {
            field.remove();
        } else {
            alert('Debe haber al menos un campo.');
        }
    }
    const deleteIcon = document.createElement('img');
    deleteIcon.src = '/assets/circulo-negativo.png'
    deleteIcon.alt = 'delete';

    button.appendChild(deleteIcon);

    field.appendChild(nombre);
    field.appendChild(apellido);
    field.appendChild(numero);
    field.appendChild(button);

    fields.appendChild(field);
}