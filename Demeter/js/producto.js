class producto{
    id;
    nombre;
    precio;
    cantidad;
    total;
    imagen;

    Producto(id,nombre,precio,cantidad,total,imagen){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.cantidad=cantidad;
        this.total=total;
        this.imagen=imagen;
    }    
    
}

function agregarProducto(id) {
    console.log("Seleccion: " + id);
    const data = JSON.parse(localStorage.getItem("productos"))

    console.log(data[id-1])
    console.log(data[id-1]["nombre"])
    let nombreProducto = data[id-1]["nombre"];
    var valor = parseInt(document.getElementById("footer1").innerHTML);
    valor=valor+1;
    console.log(valor);
    document.getElementById("footer2").innerHTML=valor;
    document.getElementById("footer1").innerHTML=nombreProducto;
}

var productos=[
            new Producto(1,"Humedad",15000,"img/sensor de humedad.jpg"),
            new Producto(2,"Luz",1000,"img/sensor de luz.jpg"),
            new Producto(3,"Voltaje",21000,"img/sensor de voltaje.jpg"),
        ]
        // se dejara el listado en LocalStorage
        localStorage.setItem("productos",JSON.stringify(productos));


// MESCLAR CON EL OTRO AGREGAR PRODUCTO, ESTE ES UN COPY PASTE DEL PROYECTO DE LOS PASTELES

function agregarProductoOdl(id){
    console.log("Selecciono:"+id);
    const data=JSON.parse(localStorage.getItem("pasteles"))
    
    // recorrer el arreglo
    console.log(data[id-1]);
    console.log(data[id-1]["nombre"])

    // creacion del nuevo reg.
    var pastelCarro=new productoPastel()
    pastelCarro.id=data[id-1]["id"]
    pastelCarro.nombre=data[id-1]["nombre"]
    pastelCarro.precio=data[id-1]["precio"]
    pastelCarro.cantidad=1
    pastelCarro.total=data[id-1]["precio"]
    pastelCarro.imagen=data[id-1]["imagen"]

    let nombre_pastel=data[id-1]["nombre"];
    var valor=parseInt(document.getElementById("productos").innerHTML);
    valor=valor+1;
    //console.log(valor);
    document.getElementById("productos").innerHTML=valor;
    let items=0
    let subtotal= 0
    let iva=0
    let total=0

    var carrito=JSON.parse(localStorage.getItem("carrito"))
    if(!carrito){
        console.log("no existe")
        carrito=[
            pastelCarro,
        ]
        items=1
        subtotal=pastelCarro.precio
        iva= pastelCarro.precio*0.19
        total=subtotal+iva
        localStorage.setItem("carrito",JSON.stringify(carrito))
        console.log("Producto Agregado")
    }else{
        //console.log("existe")
        let pos=0
        let existe=0
        
        carrito.forEach(item =>{
            // console.log("id:"+item.id+ " nombre:"+item.nombre+ " cantidad:"+item.cantidad)
            if(item.id==pastelCarro.id){
                //console.log("Existe producto en elc carro:"+item.id)
                let cant= item.cantidad+1
                let total=item.precio*cant 
                carrito[pos]["cantidad"]=cant 
                carrito[pos]["total"]=total
                existe=1
                
            }                                       
            pos=pos+1                    
        })
        if(existe==0){
            carrito.push(pastelCarro)
        }
        /// totales
        carrito.forEach(i=>{
            subtotal=subtotal+i.total
        }) 
        iva=subtotal*0.19
        total=iva+subtotal 
        items=carrito.length              
        localStorage.setItem("carrito",JSON.stringify(carrito))
        console.log("Producto Agregado")
    }
    document.getElementById("items").innerHTML=items
    document.getElementById("subtotal").innerHTML=subtotal
    document.getElementById("iva").innerHTML=iva
    document.getElementById("total").innerHTML=total
}


