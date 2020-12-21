function cargarTipoServicio() {
    axios
      .get("/tipo_servicio/obtener-lista", {
        params: {
        },
        responseType: "json"
      })
      .then(function (res) {
        //cuando obtenemos una respuesta satisfactoria del lado del servidor
        //la peticion se proceso correctamente
  
        console.log("lista de tipo servicios")
        console.log(res);
        console.log("cantidad: " + res.data.length);

        //Agregamos el resultado a nuestra tabla html
        res.data.forEach(function (value, index) {
          console.log("fila: ", value, " indice: " + index);
      
          var option = document.createElement("option");
          option.value= value.id_tipo_servicio
          option.text = value.nombre_servicio;
          selectTipo.add(option);

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
  
  var selectTipo = document.getElementById("selectTipos");
  
 
  
  cargarTipoServicio();
  