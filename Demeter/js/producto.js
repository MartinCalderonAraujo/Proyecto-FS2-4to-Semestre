class Producto {
    id;
    nombre;
    precio;
    imagen;

    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

/*
// TEST NO USAR
function agregarProductooooo(id) {
    console.log("Seleccion: " + id);
    const data = JSON.parse(localStorage.getItem("productos"))

    console.log(data[id - 1])
    console.log(data[id - 1]["nombre"])
    let nombreProducto = data[id - 1]["nombre"];
    var valor = parseInt(document.getElementById("footer1").innerHTML);
    valor = valor + 1;
    console.log(valor);
    document.getElementById("footer2").innerHTML = valor;
    document.getElementById("footer1").innerHTML = nombreProducto;
}
*/

// TEST NO USAR

var productos = [
    new Producto(1, "Humedad", 30000, "img/sensor de humedad.jpg"),
    new Producto(2, "Luz", 30000, "img/sensor de luz.jpg"),
    new Producto(3, "Voltaje", 30000, "img/sensor de voltaje.jpg"),
    new Producto(4, "Ph", 30000, "img/sensor de ph.jpg"),
    new Producto(5, "Temperatura", 30000, "img/sensor de temperatura.jpg"),
    new Producto(6, "Co2", 30000, "img/sensor de co2.jpg"),
]

// se dejara el listado en LocalStorage
// localStorage.setItem("productos",JSON.stringify(productos));

////////////////////////////////////////////////////////////////////////////////////////////////////////

// se dejara el listado en LocalStorage
localStorage.setItem("productos", JSON.stringify(productos));

function agregarProducto(id) {
    console.log("Selecciono:" + id);
    const data = JSON.parse(localStorage.getItem("productos"))
    // recorrer el arreglo
    console.log(data[id - 1]);
    console.log(data[id - 1]["nombre"])

    // creacion del nuevo reg.
    var productoCarro = new Producto()
    productoCarro.id = data[id - 1]["id"]
    productoCarro.nombre = data[id - 1]["nombre"]
    productoCarro.precio = data[id - 1]["precio"]
    productoCarro.cantidad = 1
    productoCarro.total = data[id - 1]["precio"]
    productoCarro.imagen = data[id - 1]["imagen"]

    let nombre_producto = data[id - 1]["nombre"];

    var valor = parseInt(document.getElementById("productos").innerHTML);
    valor = valor + 1;
    //console.log(valor);
    document.getElementById("productos").innerHTML = valor;
    let items = 0
    let subtotal = 0
    let iva = 0
    let total = 0

    var carrito = JSON.parse(localStorage.getItem("carrito"))
    if (!carrito) {
        console.log("no existe")
        carrito = [
            productoCarro,
        ]
        items = 1
        subtotal = productoCarro.precio
        iva = productoCarro.precio * 0.19
        total = subtotal + iva
        localStorage.setItem("carrito", JSON.stringify(carrito))
        console.log("Producto Agregado")
    } else {
        //console.log("existe")
        let pos = 0
        let existe = 0

        carrito.forEach(item => {
            // console.log("id:"+item.id+ " nombre:"+item.nombre+ " cantidad:"+item.cantidad)
            if (item.id == productoCarro.id) {
                //console.log("Existe producto en elc carro:"+item.id)
                let cant = item.cantidad + 1
                let total = item.precio * cant
                carrito[pos]["cantidad"] = cant
                carrito[pos]["total"] = total
                existe = 1

            }
            pos = pos + 1
        })
        if (existe == 0) {
            carrito.push(productoCarro)
        }
        /// totales
        carrito.forEach(i => {
            subtotal = subtotal + i.total
        })
        iva = subtotal * 0.19
        total = iva + subtotal
        items = carrito.length
        localStorage.setItem("carrito", JSON.stringify(carrito))
        console.log("Producto Agregado")
    }
}

