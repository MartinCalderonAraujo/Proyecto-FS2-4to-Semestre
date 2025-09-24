import { Inventario, ControladorInventario } from '/Demeter/js/productoV2.js';

var inventario = new Inventario();
var controlador = new ControladorInventario(inventario);
controlador.renderTabla('.tableInventario');



//////////////////////////////////////////////////////////////////////

// --- FORMULARIO AGREGAR PRODUCTO ---

function formTrigger(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('inputId').value);
    const nombre = document.getElementById('inputNombre').value;
    const precio = parseInt(document.getElementById('inputPrecio').value);
    const imagen = document.getElementById('inputImagen').value;
    controlador.agregarProducto({ id, nombre, precio, imagen });
    controlador.renderTabla('.tableInventario');
    e.target.reset();
}

function delete_Trigger(e) {
    if (e.target && e.target.classList.contains('buttonEliminar')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        controlador.eliminarProducto(id);
        controlador.renderTabla('.tableInventario');
    }
};

// ejecución de delete_Trigger al document


document.getElementById('formAgregarProducto').addEventListener('submit', formTrigger);
document.addEventListener('click', delete_Trigger);

