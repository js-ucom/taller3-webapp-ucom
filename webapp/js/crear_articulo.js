var botonPost = document.getElementById("btn-enviar");
botonPost.addEventListener("click", function () {
  //Ejemplo de como enviar datos con POST
  const descripcion = document.getElementById("descripcion");
  const precio_publico = document.getElementById("precio_publico");
  const precio_mayorista = document.getElementById("precio_mayorista");
  const activo = document.getElementById("activo");

  console.log("descripcion ", descripcion.value);
  console.log("precio_publico ", precio_publico.value);
  let params = {
    descripcion: descripcion.value,
    precio_publico: precio_publico.value,
    precio_mayorista: precio_mayorista.value,
    activo: activo.value
  };

  axios( {
    method:'POST',
    url:'/articulo/insertar',
    data: params,
    headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(function (res) {
      console.log("respuesta del servidor ", res);
      alert("El articulo se agrego correctamente");
    })
    .catch(function (err) {
      console.log("Error en la peticion POST");
      console.log(err);
      alert("Error no se pudo agregar el articulo");

    })
    .finally(function () {});
});