var botonPost = document.getElementById("btn-enviar");
botonPost.addEventListener("click", function () {
  //Ejemplo de como enviar datos con POST
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const direccion = document.getElementById("direccion");
  const telefono = document.getElementById("telefono");

  console.log("nombre ", nombre.value);
  console.log("apellido ", apellido.value);
  let params = {
    nombre: nombre.value,
    apellido: apellido.value,
    direccion: direccion.value,
    telefono: telefono.value
  };

  axios( {
    method:'POST',
    url:'/cliente/insertar',
    data: params,
    headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(function (res) {
      console.log("respuesta del servidor ", res);
      alert("El cliente se agrego correctamente");
    })
    .catch(function (err) {
      console.log("Error en la peticion POST");
      console.log(err);
      alert("Error no se pudo agregar el cliente");

    })
    .finally(function () {});
});