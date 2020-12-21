function cargarClientes() {
    axios
      .get("/cliente/obtener-lista", {
        params: {
        },
        responseType: "json"
      })
      .then(function (res) {
        //cuando obtenemos una respuesta satisfactoria del lado del servidor
        //la peticion se proceso correctamente
  
        console.log("lista de clientes")
        console.log(res);
        console.log("cantidad: " + res.data.length);

        //Agregamos el resultado a nuestra tabla html
        res.data.forEach(function (value, index) {
          console.log("fila: ", value, " indice: " + index);
      
          var option = document.createElement("option");
          option.value= value.id_cliente
          option.text = value.nombre + " " + value.apellido;
          select.add(option);

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
  
  var select = document.getElementById("selectClientes");
  
 
  
  cargarClientes();
  