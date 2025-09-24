
export class Inventario {
    constructor() {
        var guardado = localStorage.getItem('productos');
        if (guardado) { this.productos = JSON.parse(guardado); }
        else {
            this.productos = [
                { id: 1, nombre: 'Humedad', precio: 30000, imagen: 'img/sensor de humedad.jpg' },
                { id: 2, nombre: 'Luz', precio: 30000, imagen: 'img/sensor de luz.jpg' },
                { id: 3, nombre: 'Voltaje', precio: 30000, imagen: 'img/sensor de voltaje.jpg' },
                { id: 4, nombre: 'Ph', precio: 30000, imagen: 'img/sensor de ph.jpg' },
                { id: 5, nombre: 'Temperatura', precio: 30000, imagen: 'img/sensor de temperatura.jpg' },
                { id: 6, nombre: 'Co2', precio: 30000, imagen: 'img/sensor de co2.jpg' },
                { id: 7, nombre: 'NPK', precio: 30000, imagen: 'img/sensor NPK.png' },
                { id: 8, nombre: 'Portatil', precio: 30000, imagen: 'img/portatil.png' },
                { id: 9, nombre: 'Camara de escaneo', precio: 30000, imagen: 'img/camara escaneo.png' },
                { id: 10, nombre: 'Dron escaneo', precio: 30000, imagen: 'img/dron escaneo.png' },
                { id: 11, nombre: 'Robot riego', precio: 30000, imagen: 'img/robot riego.png' },
                { id: 12, nombre: 'Dron fumigador', precio: 30000, imagen: 'img/dron fumigador.png' },
                { id: 13, nombre: 'Macetero v1', precio: 30000, imagen: 'img/macetero v1.png' },
                { id: 14, nombre: 'Macetero v2', precio: 30000, imagen: 'img/macetero v2.png' },
                { id: 15, nombre: 'Macetero v3', precio: 30000, imagen: 'img/macetero v3.png' }
            ];
        }
    }
    agregarProducto(producto) {
        var existe = this.productos.find(function (p) { return p.id === producto.id; });
        if (!existe) {
            this.productos.push(producto);
            localStorage.setItem('productos', JSON.stringify(this.productos));
        }
    }
    editarProducto(producto) {
        var i = this.productos.findIndex(function (p) { return p.id === producto.id; });
        if (i !== -1) {
            this.productos[i] = producto;
            localStorage.setItem('productos', JSON.stringify(this.productos));
        }
    }
    eliminarProducto(id) {
        this.productos = this.productos.filter(function (p) { return p.id !== id; });
        localStorage.setItem('productos', JSON.stringify(this.productos));
    }
    obtenerProductos() { return this.productos; }
}




export class ControladorInventario {
    constructor(inventario) { this.inventario = inventario; }
    agregarProducto(producto) { this.inventario.agregarProducto(producto); }
    editarProducto(producto) { this.inventario.editarProducto(producto); }
    eliminarProducto(id) { this.inventario.eliminarProducto(id); }
    obtenerProductos() { return this.inventario.obtenerProductos(); }

    //INYECTOR DEl inventario de localstorage a HTML
    renderTabla(selector) {
        const productos = this.obtenerProductos();
        const tbody = document.querySelector(selector);
        if (!tbody) return;
        tbody.innerHTML = '';
        productos.forEach((p, idx) => {
            const row = document.createElement('tr');
            row.className = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';
            row.innerHTML = `
          <td class="p-3 border border-gray-300"><img src="/Demeter/${p.imagen}" alt="${p.imagen}" class="h-12"></td>
          <td class="p-3 border border-gray-300">${p.id}</td>
          <td class="p-3 border border-gray-300">${p.nombre}</td>
          <td class="p-3 border border-gray-300">$${p.precio.toLocaleString()}</td>
          <td class="p-3 border border-gray-300">
            <button class="buttonEliminar bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2" data-id=${p.id}>Eliminar</button>
            </td>
        `;
            tbody.appendChild(row);
        });
    }
}

