
function listaServicios() {
    axios
      .get("/servicio/obtener-lista", {
        params: {
        },
        responseType: "json"
      })
      .then(function (res) {
        //cuando obtenemos una respuesta satisfactoria del lado del servidor
        //la peticion se proceso correctamente
  
        console.log("lista de servicios")
        console.log(res);
               
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
            var cell6 = row.insertCell(5);

            // Agregamos a la celda los valores que obtenemos de la lista 
            cell1.innerHTML = "" + value.id_servicio;
            cell2.innerHTML = "" + new Date(value.fecha_servicio).toDateString();
            cell3.innerHTML = "" + value.cliente;
            cell4.innerHTML = "" + value.estado;
            cell5.innerHTML = "" + value.tipo;
            cell6.innerHTML = "" + value.mascota
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
  
  var tabla = document.getElementById("tblListaServicios");
  
  listaServicios();
  