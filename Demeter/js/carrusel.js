const itemsCarrusel = document.querySelectorAll('#contenedor-item-carrusel .item-carrusel');
let indiceActual = 0;

// Inicializa mostrando el primer item
itemsCarrusel[indiceActual].classList.add('active');

function cambiarItem() {
    itemsCarrusel[indiceActual].classList.remove('active'); // oculta el actual
    indiceActual = (indiceActual + 1) % itemsCarrusel.length; // siguiente
    itemsCarrusel[indiceActual].classList.add('active');    // muestra el siguiente
}

// Cambia cada 4 segundos
setInterval(cambiarItem, 4000);
