var xhttp = new XMLHttpRequest();
var ultimoIdCarrito=0;
xhttp.onreadystatechange = function() {
    let carrito = new Array;
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let respuesta = xhttp.responseText;
       let respuestaArray = JSON.parse(respuesta);
       //console.log(xhttp.responseText);
       console.log(respuestaArray[0]);


       for (let i = 0; i < respuestaArray.length; i++) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const nombreProducto = document.createElement("h3");
        const precio = document.createElement("p");
        const inputCantidad = document.createElement("input");
        inputCantidad.className= "cantidad";
        inputCantidad.type = "number";
        inputCantidad.placeholder = "Cantidad";
        const botonAñadir = document.createElement("button");
        botonAñadir.appendChild(document.createTextNode("Añadir al carrito"));
        botonAñadir.onclick = añadir;


        nombreProducto.appendChild(document.createTextNode(respuestaArray[i].nombre));
        precio.appendChild(document.createTextNode("Precio: "+respuestaArray[i].precio+"€"));
        span.appendChild(nombreProducto);
        span.appendChild(precio);
        span.appendChild(inputCantidad);
        span.appendChild(document.createElement("br"));
        span.appendChild(document.createElement("br"));
        span.appendChild(botonAñadir);
        //span.append(respuestaArray[i].nombre);
        //span.append("" + respuestaArray[i].precio);
        //let li = document.createElement("li");
        li.appendChild(span);
       
        document.getElementById("productos").appendChild(li);
        

        
        function añadir(){
            let producto = {
                nombre: respuestaArray[i].nombre,
                cantidad: Number(inputCantidad.value),
                precio: respuestaArray[i].precio
            }
            const tr= document.createElement("tr");
            const tdNombre= document.createElement("td");
            const tdPrecio= document.createElement("td");
            const tdCantidad= document.createElement("td");
            const tdTotal= document.createElement("td");
            const botonBorrar = document.createElement("button");
            botonBorrar.id="borrar";
            botonBorrar.appendChild(document.createTextNode("Borrar"));
            //botonBorrar.onclick
            tdNombre.appendChild(document.createTextNode(producto.nombre));
            tr.appendChild(tdNombre);
            tdPrecio.appendChild(document.createTextNode(producto.precio));
            tr.appendChild(tdPrecio);
            tdCantidad.appendChild(document.createTextNode(producto.cantidad));
            tr.appendChild(tdCantidad);
            tdTotal.appendChild(document.createTextNode(producto.precio*producto.cantidad));
            tr.appendChild(tdTotal);
            tr.appendChild(botonBorrar);
            document.getElementsByTagName("tbody")[0].appendChild(tr);
            carrito.push(producto);
            console.log(carrito);
            console.log("añadido");
        }
        
       }
       
       
    }
};
xhttp.open("GET", "http://localhost:3000/productos", true);
xhttp.send();





