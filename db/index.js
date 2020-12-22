
var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('app.properties');

var _ = require('lodash');
//conexion a la base de datos Postgres
const {
    Pool,
    Client
} = require('pg');

const Router = require('express-promise-router')


const pool = new Pool({
    host: properties.get('db.host'),
    database: properties.get('db.database'),
    port: properties.get('db.port'),
    user: properties.get('db.username'),
    password: properties.get('db.password'),
});



const SQL_OBTENER_LISTA_MASCOTA_POR_ID="select * from mascota where id_mascota=$1";
const SQL_ELIMINAR_MASCOTA_POR_ID="delete from mascota where id_mascota=$1";
const SQL_OBTENER_MASCOTA_POR_CATEGORIA="select * from mascota where id_categoria=$1";

const SQL_INSERTAR_MASCOTA="insert into mascota(nombre,id_categoria) values($1,$2) RETURNING id_mascota";
const SQL_ACTUALIZAR_MASCOTA="update mascota set nombre=$1, id_categoria=$2 where id_mascota=$3";
const SQL_OBTENER_CATEGORIA_POR_ID="select * from categoria where id=$1";


const SQL_OBTENER_MASCOTAS_POR_CLIENTE_Y_TIPO="select cm.id, "+
"c.id_cliente ,  "+
"c.nombre,"+
"c.apellido,"+ 
"m.id_mascota,  "+
"m.nombre, "+
"c3.id ,"+
"c3.nombre "+
"from cliente_mascota cm "+ 
"left join cliente c on c.id_cliente = cm.id_cliente " +
"left join mascota m on m.id_mascota =cm.id_mascota "+
"left join categoria c3 on c3.id =m.id_categoria "+ 
"where 2=2  and c.nombre=$1 and c3.nombre=$2 and m.nombre=$3";


const SQL_OBTENER_LISTA_MASCOTAS="select cm.id, "+
"c.id_cliente ,  "+
"c.nombre as nombre_cliente,"+
"c.apellido as apellido_cliente,"+ 
"m.id_mascota,  "+
"m.nombre as nombre_mascota, "+
"c3.id ,"+
"c3.nombre as tipo "+
"from cliente_mascota cm "+ 
"left join cliente c on c.id_cliente = cm.id_cliente " +
"left join mascota m on m.id_mascota =cm.id_mascota "+
"left join categoria c3 on c3.id =m.id_categoria "+ 
"where 2=2 ";

const SQL_OBTENER_MASCOTAS="select * from mascota order by nombre desc";

//articulo
const SQL_INSERTAR_ARTICULO="insert into articulo(descripcion,precio_publico,precio_mayorista,activo) values($1,$2,$3,$4) RETURNING articulo_id";
const SQL_ACTUALIZAR_ARTICULO="update articulo set descripcion=$1, precio_publico=$2, precio_mayorista=$3, activo=$4 where articulo_id=$5";
const SQL_ELIMINAR_ARTICULO_POR_ID="delete from articulo where articulo_id=$1";
const SQL_OBTENER_LISTA_ARTICULOS="select * from articulo order by descripcion desc";

//venta
const SQL_INSERTAR_VENTA="insert into venta(fecha_venta,cliente_id,monto_total,nro_factura,activo) values($1,$2,$3,$4,$5) RETURNING venta_id";
const SQL_ACTUALIZAR_VENTA="update venta set cliente_id=$1, monto_total=$2, activo=$3 where venta_id=$4";
const SQL_ELIMINAR_VENTA_POR_ID="delete from venta where venta_id=$1";
const SQL_OBTENER_LISTA_VENTAS="select venta.*, cliente.nombre from venta INNER JOIN cliente ON venta.cliente_id=cliente.id_cliente order by fecha_venta desc";

//servicio
const SQL_OBTENER_LISTA_SERVICIO_POR_IDCLIENTE_IDTIPO = "select s.id_cliente, c.nombre, c.apellido, s.fecha_servicio, s.estado FROM servicio s LEFT JOIN cliente c ON c.id_cliente = s.id_cliente LEFT JOIN tipo_servicio ts ON ts.id_tipo_servicio=s.id_tipo_servicio WHERE c.id_cliente=$1 AND ts.id_tipo_servicio=$2 order by s.id_cliente asc, s.fecha_servicio desc, s.estado desc";
const SQL_INSERTAR_SERVICIO="insert into servicio(fecha_servicio,id_cliente,estado,id_tipo_servicio,id_mascota) values($1,$2,$3,$4,$5) RETURNING id_servicio";
const SQL_ACTUALIZAR_SERVICIO="update servicio set id_cliente=$1, estado=$2, id_tipo_servicio=$3, id_mascota=$4 where id_servicio=$5";
const SQL_ELIMINAR_SERVICIO_POR_ID="delete from servicio where id_servicio=$1";
const SQL_OBTENER_LISTA_SERVICIOS="select s.id_servicio as id_servicio, s.fecha_servicio as fecha_servicio, " +
"c.nombre as cliente, " +
"s.estado as estado, " +
"ts.nombre_servicio as tipo, " +
"m.nombre as mascota " +
"from servicio s" +
" INNER JOIN cliente c ON s.id_cliente=c.id_cliente " +
" INNER JOIN tipo_servicio ts ON s.id_tipo_servicio=ts.id_tipo_servicio " +
" INNER JOIN mascota m ON s.id_mascota=m.id_mascota order by fecha_servicio desc";
console.log(SQL_OBTENER_LISTA_SERVICIOS);

//cliente
const SQL_OBTENER_LISTA_CLIENTE_POR_ID="select * from cliente where id_cliente=$1";
const SQL_OBTENER_LISTA_CLIENTES="select * from cliente order by nombre desc";
const SQL_INSERTAR_CLIENTE="insert into cliente(nombre,apellido,direccion,telefono) values($1,$2,$3,$4) RETURNING id_cliente";
const SQL_ACTUALIZAR_CLIENTE="update cliente set nombre=$1, apellido=$2, direccion=$3, telefono=$4 where id_cliente=$5";
const SQL_ELIMINAR_CLIENTE_POR_ID="delete from cliente where id_cliente=$1";

//tipo servicio
const SQL_OBTENER_LISTA_TIPO_POR_ID="select * from tipo_servicio where id_tipo_servicio=$1";
const SQL_OBTENER_LISTA_TIPOS="select * from tipo_servicio order by nombre_servicio desc";


function insertarMascota(datos){
    console.log("db => insertarMascota ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_MASCOTA,[datos.nombre,datos.id_categoria]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function actualizarMascota(datos){
    console.log("db => actualizarMascota ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_ACTUALIZAR_MASCOTA,[datos.nombre,datos.id_categoria,datos.id_mascota]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

async function obtenerMascotasPorClienteTipo(parametros){
    console.log("parametros ", parametros)
    console.log("SQL ",SQL_OBTENER_MASCOTAS_POR_CLIENTE_Y_TIPO)
    const client = await pool.connect()
    try {
        const res = await client.query(SQL_OBTENER_MASCOTAS_POR_CLIENTE_Y_TIPO, [parametros.nombre_cliente,parametros.tipo_mascota,parametros.nombre_mascota])
        console.log(res.rows[0])
        return res.rows;
    } finally {
        client.release()
    }
}

function insertarArticulo(datos){
    console.log("db => insertarArticulos ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_ARTICULO,[datos.descripcion,datos.precio_publico,datos.precio_mayorista,datos.activo]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function actualizarArticulo(datos){
    console.log("db => actualizarArticulo ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_ACTUALIZAR_ARTICULO,[datos.descripcion,datos.precio_publico,datos.precio_mayorista,datos.activo,datos.articulo_id]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function insertarVenta(datos){
    console.log("db => insertarVentas ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_VENTA,[datos.fecha_venta,datos.cliente_id,datos.monto_total,datos.nro_factura,datos.activo]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function actualizarVenta(datos){
    console.log("db => actualizarVenta ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_ACTUALIZAR_VENTA,[datos.cliente_id,datos.monto_total,datos.activo,datos.venta_id]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function insertarServicio(datos){
    console.log("db => insertarServicios ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_SERVICIO,[datos.fecha_servicio,datos.id_cliente,datos.estado,datos.id_tipo_servicio,datos.id_mascota]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function actualizarServicio(datos){
    console.log("db => actualizarServicio ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_ACTUALIZAR_SERVICIO,[datos.id_cliente,datos.estado,datos.id_tipo_servicio,datos.id_mascota,datos.id_tipo_servicio]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function insertarCliente(datos){
    console.log("db => insertarClientes ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_CLIENTE,[datos.nombre,datos.apellido,datos.direccion,datos.telefono]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function actualizarCliente(datos){
    console.log("db => actualizarCliente ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_ACTUALIZAR_CLIENTE,[datos.nombre,datos.apellido,datos.direccion,datos.telefono,datos.id_cliente]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}    
module.exports = {
    obtenerMascotaPorID: (id)=>pool.query(SQL_OBTENER_LISTA_MASCOTA_POR_ID,[id]),
    obtenerListaMascotas: ()=>pool.query(SQL_OBTENER_LISTA_MASCOTAS,[]),
    obtenerMascotas: ()=>pool.query(SQL_OBTENER_MASCOTAS,[]),
    insertarMascota: insertarMascota,
    eliminarMascota: (id)=>pool.query(SQL_ELIMINAR_MASCOTA_POR_ID,[id]),
    obtenerMascotasPorCategoria: (id_categoria)=>pool.query(SQL_OBTENER_MASCOTA_POR_CATEGORIA,[id_categoria]),
    obtenerMascotasPorClienteTipo:obtenerMascotasPorClienteTipo ,
    actualizarMascota: actualizarMascota,
    obtenerCategoriaPorID: (id)=>pool.query(SQL_OBTENER_CATEGORIA_POR_ID,[id]),
    obtenerClientePorID: (id)=>pool.query(SQL_OBTENER_LISTA_CLIENTE_POR_ID,[id]),
    obtenerListaClientes: ()=>pool.query(SQL_OBTENER_LISTA_CLIENTES,[]),
    insertarCliente: insertarCliente,
    actualizarCliente: actualizarCliente,
    eliminarCliente: (id)=>pool.query(SQL_ELIMINAR_CLIENTE_POR_ID,[id]),
    obtenerTipoPorID: (id)=>pool.query(SQL_OBTENER_LISTA_TIPO_POR_ID,[id]),
    obtenerListaTipos: ()=>pool.query(SQL_OBTENER_LISTA_TIPOS,[]),
    insertarServicio: insertarServicio,
    actualizarServicio: actualizarServicio,
    obtenerListaServicios: ()=>pool.query(SQL_OBTENER_LISTA_SERVICIOS,[]),
    eliminarServicio: (id)=>pool.query(SQL_ELIMINAR_SERVICIO_POR_ID,[id]),
    obtenerServicioPorIDClienteIDTipo: (id_cliente, id_tipo_servicio)=>pool.query(SQL_OBTENER_LISTA_SERVICIO_POR_IDCLIENTE_IDTIPO,[id_cliente,id_tipo_servicio]),
    insertarArticulo: insertarArticulo,
    actualizarArticulo: actualizarArticulo,
    obtenerListaArticulos: ()=>pool.query(SQL_OBTENER_LISTA_ARTICULOS,[]),
    eliminarArticulo: (id)=>pool.query(SQL_ELIMINAR_ARTICULO_POR_ID,[id]),
    insertarVenta: insertarVenta,
    actualizarVenta: actualizarVenta,
    obtenerListaVentas: ()=>pool.query(SQL_OBTENER_LISTA_VENTAS,[]),
    eliminarVenta: (id)=>pool.query(SQL_ELIMINAR_VENTA_POR_ID,[id]),

}
