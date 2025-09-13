
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
                    tabla=tabla+"<td> <input type='button' value='Eliminar' onclick='eliminar("+pos+")'></td>"
                    tabla=tabla+"</tr>"   
                    pos=pos+1
                })                     
                tabla=tabla+"</table>"
                
                document.getElementById("detalle").innerHTML=tabla     
}

