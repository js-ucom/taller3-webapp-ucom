function listaArticulos() {
    axios
      .get("/articulo/obtener-lista", {
        params: {
        },
        responseType: "json"
      })
      .then(function (res) {
        //cuando obtenemos una respuesta satisfactoria del lado del servidor
        //la peticion se proceso correctamente
  
        console.log("lista de articulos")
        console.log(res);
        console.log("cantidad: " + res.data.length);

        //Agregamos el resultado a nuestra tabla html
        res.data.forEach(function (value, index) {
            console.log("fila: ", value, " indice: " + index);
      
            // Agregamos las filas
            var row = tabla.insertRow();
          
            //Agregamos las columnas de la fila
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            // Agregamos a la celda los valores que obtenemos de la lista 
            cell1.innerHTML = "" + value.articulo_id;
            cell2.innerHTML = "" + value.descripcion;
            cell3.innerHTML = "" + value.precio_publico;
            cell4.innerHTML = "" + value.precio_mayorista;
            cell5.innerHTML = "" + value.activo
          });

      })
      .catch(function (err) {
        //cuando hubo un error al procesar la peticion en el servidor
        console.log("Error en la peticion GET");
        console.log(err);
      })
      .finally(function () {
        //esta peticion siempre se ejecuta al finalizar el procesamiento del lado del servidor
        console.log("ejecutamos la funcion finally");
      });
  }
  
  var tabla = document.getElementById("tblListaArticulos");
  
 
  function addHeader() {
    var table = document.getElementById("tblListaMascotas");
    var head = document.createElement("THEAD");
    var column = document.createElement("TH");
  
    column.innerHTML = "ID";
    head.appendChild(column);
    table.appendChild(head);
  
    column = document.createElement("TH");
    column.innerHTML = "NOMBRE";
    head.appendChild(column);
    table.appendChild(head);
  
    column = document.createElement("TH");
  
    column.innerHTML = "TIPO";
    head.appendChild(column);
    table.appendChild(head);
  
    column = document.createElement("TH");
  
    column.innerHTML = "CLIENTE";
    head.appendChild(column);
    table.appendChild(head);
  

  }
  listaArticulos();
  