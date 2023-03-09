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

       document.getElementById("mostrarCarrito").onclick = () =>{
        var x = document.getElementById("carritoDiv");
        if (x.style.display !="block") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    
    }


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
            botonBorrar.onclick = borrar;
            

            /*tdTotal.append("Total");
            trTotal.append(tdTotal);
            trTotal.append(document.createElement("td"));
            trTotal.append(document.createElement("td"));
            precioTotal.append(suma);
            trTotal.append(precioTotal);
            table.append(trTotal);*/
            
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




            const trTotal= document.createElement("tr");
            const tdTotalNombre = document.createElement("td");
            tdTotalNombre.appendChild(document.createTextNode("Total"));

            const sumaTotal = document.createElement("td");
            

            
            trTotal.appendChild(tdTotalNombre);
            trTotal.appendChild(document.createElement("td"));
            trTotal.appendChild(document.createElement("td"));
            trTotal.appendChild(sumaTotal);




            
            if(document.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length>2){
                document.getElementsByTagName("tbody")[0].lastElementChild.previousElementSibling.remove();
            }

            sumado();
            
            
/*
            //for (let k = 1; k < document.getElementById("carrito").getElementsByTagName("tr").length; k++) {
                
                console.log(Number(document.getElementById("carrito").getElementsByTagName("tr")[1].getElementsByTagName("td")[3].textContent));
                //suma+=Number(document.getElementById("carrito").getElementsByTagName("tr")[k].getElementsByTagName("td")[3].textContent)
                console.log(suma+);
            //}*/
            sumaTotal.appendChild(document.createTextNode(suma));
            sumaTotal.id ="sumaTotal";
            
            document.getElementsByTagName("tbody")[0].appendChild(trTotal);

            carrito.push(producto);


            document.getElementById("cantidadEnCarrito").appendChild(document.createTextNode(carrito.length));
            if(document.getElementById("cantidadEnCarrito").childNodes.length>1){
                document.getElementById("cantidadEnCarrito").firstChild.remove();
            }

            console.log(carrito);
            console.log("añadido");
        }

        function borrar(){
            
            for (let j = 1; j < document.getElementById("carrito").getElementsByTagName("tr").length; j++) {
               // console.log(document.getElementById("carrito").getElementsByTagName("tr")[j]);
                if(document.getElementById("carrito").getElementsByTagName("tr")[j]==event.target.parentElement){
                   // console.log(j-1);
                    carrito.splice(j-1,1);

                }

            }
            
            
            //console.log(event.target.parentElement);
            //console.log(carrito);

            
            event.target.parentElement.remove();

            document.getElementById("cantidadEnCarrito").appendChild(document.createTextNode(carrito.length));
            if(document.getElementById("cantidadEnCarrito").childNodes.length>1){
                document.getElementById("cantidadEnCarrito").firstChild.remove();
            }

            sumadoBorrado();
            sumaTotal.appendChild(document.createTextNode(suma));
 
            //if(document.getElementById("sumaTotal").childNodes)
            document.getElementById("sumaTotal").firstChild.remove();
            console.log("borrado");
        }

        function sumado() {
            suma=0;
           // console.log(document.getElementById("carrito").getElementsByTagName("tr").length);
            for (let k = 1; k < document.getElementById("carrito").getElementsByTagName("tr").length; k++) {
            
            //    console.log(Number(document.getElementById("carrito").getElementsByTagName("tr")[1].getElementsByTagName("td")[3].textContent));
                suma += Number(document.getElementById("carrito").getElementsByTagName("tr")[k].getElementsByTagName("td")[3].textContent);
                console.log(suma);
                console.log(document.getElementById("carrito").lastElementChild.getElementsByTagName("td")[3]);
                
            }
            
            
        }

        function sumadoBorrado() {
            suma=0;
           // console.log(document.getElementById("carrito").getElementsByTagName("tr").length);
            for (let k = 1; k < document.getElementById("carrito").getElementsByTagName("tr").length-1; k++) {
            
            //    console.log(Number(document.getElementById("carrito").getElementsByTagName("tr")[1].getElementsByTagName("td")[3].textContent));
                suma += Number(document.getElementById("carrito").getElementsByTagName("tr")[k].getElementsByTagName("td")[3].textContent);
                console.log(suma);
                console.log(document.getElementById("carrito").lastElementChild.getElementsByTagName("td")[3]);
                
            }
            
            
        }

        
        
       }
       
       
    }
};
xhttp.open("GET", "http://localhost:3000/productos", true);
xhttp.send();





