var botonPost = document.getElementById("btn-enviar");
botonPost.addEventListener("click", function () {
  //Ejemplo de como enviar datos con POST
  const fecha_servicio = document.getElementById("fecha_servicio");
  const id_cliente = document.getElementById("selectClientes");
  const id_tipo_servicio = document.getElementById("selectTipos");
  const id_mascota = document.getElementById("selectMascotas");
  const estado = document.getElementById("selectEstados");

  console.log("id_cliente ", id_cliente.value);
  console.log("id_mascota ", id_mascota.value);
  console.log("id_tipo_servicio ", id_tipo_servicio.value);
  console.log("estado ", estado.value);
  let params = {
    fecha_servicio: fecha_servicio.value,
    id_cliente: id_cliente.value,
    id_tipo_servicio: id_tipo_servicio.value,
    id_mascota: id_mascota.value,
    estado: estado.value

  };

  axios( {
    method:'POST',
    // url:'http://localhost:3005/servicio/insertar'
    url:'/servicio/insertar',
    data: params,
    headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(function (res) {
      console.log("respuesta del servidor ", res);
      alert("El servicio se agrego correctamente");
    })
    .catch(function (err) {
      console.log("Error en la peticion POST");
      console.log(err);
      alert("Error no se pudo agregar la mascota");

    })
    .finally(function () {});
});