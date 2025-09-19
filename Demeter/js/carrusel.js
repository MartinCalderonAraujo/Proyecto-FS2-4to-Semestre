// se almacena el carrusel en la variable
let card = `
<div id="contenedor-item-carrusel">
    <div class="item-carrusel" id="item-carrusel-1">
        <div class="tarjeta-carrusel" id="tarjeta-carrusel-1">
            <img src="img/vivero1.jpg" alt="">
        </div>
        <div class="flechas-carrusel">
            <a href="#item-carrusel-5"></a>
            <a href="#item-carrusel-2"></a>
        </div>
    </div>

    <div class="item-carrusel" id="item-carrusel-2">
        <div class="tarjeta-carrusel" id="tarjeta-carrusel-2">
            <img src="img/vivero2.jpg" alt="">
        </div>
        <div class="flechas-carrusel">
            <a href="#item-carrusel-1"></a>
            <a href="#item-carrusel-3"></a>
        </div>
    </div>

    <div class="item-carrusel" id="item-carrusel-3">
        <div class="tarjeta-carrusel" id="tarjeta-carrusel-3">
            <img src="img/vivero3.jpg" alt="">
        </div>
        <div class="flechas-carrusel">
            <a href="#item-carrusel-2"></a>
            <a href="#item-carrusel-4"></a>
        </div>
    </div>

    <div class="item-carrusel" id="item-carrusel-4">
        <div class="tarjeta-carrusel" id="tarjeta-carrusel-4">
            <img src="img/vivero4.jpg" alt="">
        </div>
        <div class="flechas-carrusel">
            <a href="#item-carrusel-3"></a>
            <a href="#item-carrusel-5"></a>
        </div>
    </div>

    <div class="item-carrusel" id="item-carrusel-5">
        <div class="tarjeta-carrusel" id="tarjeta-carrusel-5">
            <img src="img/vivero5.jpg" alt="">
        </div>
        <div class="flechas-carrusel">
            <a href="#item-carrusel-4"></a>
            <a href="#item-carrusel-1"></a>
        </div>
    </div>
</div>
`;
// busca en el html el div que tiene el id mi-carrusel y le asigna el contenido guardado en la variable card
document.querySelector("#mi-carrusel").innerHTML = card;

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