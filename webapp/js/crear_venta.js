var botonPost = document.getElementById("btn-enviar");
botonPost.addEventListener("click", function () {
  //Ejemplo de como enviar datos con POST
  const fecha_venta = document.getElementById("fecha_venta");
  const cliente_id = document.getElementById("selectClientes");
  const monto_total = document.getElementById("monto_total");
  const nro_factura = document.getElementById("nro_factura");
  const activo = document.getElementById("activo");

  console.log("fecha_venta ", fecha_venta.value);
  console.log("cliente_id ", cliente_id.value);
  let params = {
    fecha_venta: fecha_venta.value,
    cliente_id: cliente_id.value,
    monto_total: monto_total.value,
    nro_factura: nro_factura.value,
    activo: activo.value
  };

  axios( {
    method:'POST',
    url:'/venta/insertar',
    data: params,
    headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(function (res) {
      console.log("respuesta del servidor ", res);
      alert("La venta se agrego correctamente");
    })
    .catch(function (err) {
      console.log("Error en la peticion POST");
      console.log(err);
      alert("Error no se pudo agregar la venta");

    })
    .finally(function () {});
});