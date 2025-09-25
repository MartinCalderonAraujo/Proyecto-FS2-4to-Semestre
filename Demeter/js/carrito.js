class Producto {
    id;
    nombre;
    precio;
    imagen;
    cantidad;
    total;

    constructor(id, nombre, precio, cantidad, total, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = cantidad;
        this.total = total;
    }
}

var carrito = JSON.parse(localStorage.getItem("carrito"))

function eliminar(indice){
    if(confirm("Desea Eliminar Registro?")){
        console.log(indice)
        carrito.splice(indice,1)
        console.log("Eliminar Registro")
        localStorage.setItem("carrito",JSON.stringify(carrito))
        cargaInicial()
    }
}

function cargaInicial(){
            var tabla="<table border=1>"   
                tabla=tabla+"<tr>"
                tabla=tabla+"<td>Codigo</td> <td>Nombre</td>"
                tabla=tabla+"<td>Precio</td> <td>Cantidad</td> <td>Total</td> <td>Imagen</td>"
                tabla=tabla+"<td>Operacion</td>"   
                tabla=tabla+"</tr>" 
                let pos=0  
                carrito.forEach(i=>{
                    tabla=tabla+"<tr>"
                    tabla=tabla+"<td>"+i.id+"</td>"
                    tabla=tabla+"<td>"+i.nombre+"</td>"
                    tabla=tabla+"<td>"+i.precio+"</td>"
                    tabla=tabla+"<td>"+i.cantidad+"</td>" 
                    tabla=tabla+"<td>"+i.total+"</td>"
                    tabla=tabla+"<td> <img src='"+i.imagen+"' width=150px height=100px></td>"
                    tabla=tabla+"<td> <input type='button' class='table-eliminar' value='Eliminar' onclick='eliminar("+pos+")'></td>"
                    tabla=tabla+"</tr>"   
                    pos=pos+1
                })                     
                tabla=tabla+"</table>"
                
                document.getElementById("tabla-carrito").innerHTML=tabla  
    
                actualizarDetalleCompra()
}

window.onload = function () {
    if (carrito && carrito.length > 0) {
        cargaInicial();
    } else {
        document.getElementById("carrito").innerHTML = "<p>El carrito está vacío</p>";
    }
}

function actualizarDetalleCompra() {
    let productos = 0;
    let items = 0;
    let subtotal = 0;
    let iva = 0;
    let total = 0;

    if (carrito && carrito.length > 0) {
        carrito.forEach(i => {
            productos += i.cantidad;
            subtotal += i.total;
        });
        items = carrito.length;
        iva = subtotal * 0.19;
        total = subtotal + iva;
    }

    document.getElementById("productos").innerHTML = productos
    document.getElementById("items").innerHTML = items
    document.getElementById("subtotal").innerHTML = "$" + subtotal
    document.getElementById("iva").innerHTML = "$" + iva
    document.getElementById("total").innerHTML = "$" + total
}