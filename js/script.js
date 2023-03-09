var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    let carrito = new Array;
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let respuesta = xhttp.responseText;
       let respuestaArray = JSON.parse(respuesta);



       document.getElementById("mostrarCarrito").onclick = () =>{ //muestra el carrito al pulsar el icono
        var x = document.getElementById("carritoDiv");
        if (x.style.display !="block") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    
    }


       for (let i = 0; i < respuestaArray.length; i++) { //crea la página con los productos
        
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
        const botonBuscar = document.getElementById("botonBuscar");
        botonBuscar.onclick = buscar;


        nombreProducto.appendChild(document.createTextNode(respuestaArray[i].nombre));
        precio.appendChild(document.createTextNode("Precio: "+respuestaArray[i].precio+"€"));
        span.appendChild(nombreProducto);
        span.appendChild(precio);
        span.appendChild(inputCantidad);
        span.appendChild(document.createElement("br"));
        span.appendChild(document.createElement("br"));
        span.appendChild(botonAñadir);

        li.appendChild(span);
       
        document.getElementById("productos").appendChild(li);
        
        

        
        function añadir(){ //añade los productos al carrito
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

        function borrar(){ //elimina los productos del carrito
            
            for (let j = 1; j < document.getElementById("carrito").getElementsByTagName("tr").length; j++) {

                if(document.getElementById("carrito").getElementsByTagName("tr")[j]==event.target.parentElement){

                    carrito.splice(j-1,1);

                }

            }
            


            
            event.target.parentElement.remove();

            document.getElementById("cantidadEnCarrito").appendChild(document.createTextNode(carrito.length));
            if(document.getElementById("cantidadEnCarrito").childNodes.length>1){
                document.getElementById("cantidadEnCarrito").firstChild.remove();
            }

            sumadoBorrado();
            sumaTotal.appendChild(document.createTextNode(suma));
 

            document.getElementById("sumaTotal").firstChild.remove();
            console.log("borrado");
        }

        function sumado() {     //suma el precio total al añadir productos al carrito
            suma=0;

            for (let k = 1; k < document.getElementById("carrito").getElementsByTagName("tr").length; k++) {
            

                suma += Number(document.getElementById("carrito").getElementsByTagName("tr")[k].getElementsByTagName("td")[3].textContent);
                
            }
            
            
        }

        function sumadoBorrado() { //suma el precio total al borrar productos del carrito
            suma=0;

            for (let k = 1; k < document.getElementById("carrito").getElementsByTagName("tr").length-1; k++) {
            

                suma += Number(document.getElementById("carrito").getElementsByTagName("tr")[k].getElementsByTagName("td")[3].textContent);

                
            }
            
            
        }

        function buscar(){ //muestra los productos con nombres que empiezan por los caracteres escritos

            console.log("buscar")
            const textoBuscador = document.getElementById("buscador").value.toUpperCase();


            for (let i = 0; i < respuestaArray.length; i++) {

                if (respuestaArray[i].nombre.toUpperCase().startsWith(textoBuscador)){
                    
                    document.getElementById("productos").getElementsByTagName("li")[i].style.display ="block";
                }
                else{
                    document.getElementById("productos").getElementsByTagName("li")[i].style.display ="none"; 
                }
                
            }
            

        }
        
        
       }
       
       
    }
};
xhttp.open("GET", "http://localhost:3000/productos", true);
xhttp.send();





