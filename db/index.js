
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
const SQL_OBTENER_LISTA_CLIENTE_POR_ID="select * from cliente where id_cliente=$1";
const SQL_OBTENER_LISTA_SERVICIO_POR_IDCLIENTE_IDTIPO = "select s.id_cliente, c.nombre, c.apellido, s.fecha_servicio, s.estado FROM servicio s LEFT JOIN cliente c ON c.id_cliente = s.id_cliente LEFT JOIN tipo_servicio ts ON ts.id_tipo_servicio=s.id_tipo_servicio WHERE c.id_cliente=$1 AND ts.id_tipo_servicio=$2 order by s.id_cliente asc, s.fecha_servicio desc, s.estado desc";

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

module.exports = {
    obtenerMascotaPorID: (id)=>pool.query(SQL_OBTENER_LISTA_MASCOTA_POR_ID,[id]),
    obtenerListaMascotas: ()=>pool.query(SQL_OBTENER_LISTA_MASCOTAS,[]),
    insertarMascota: insertarMascota,
    eliminarMascota: (id)=>pool.query(SQL_ELIMINAR_MASCOTA_POR_ID,[id]),
    obtenerMascotasPorCategoria: (id_categoria)=>pool.query(SQL_OBTENER_MASCOTA_POR_CATEGORIA,[id_categoria]),
    obtenerMascotasPorClienteTipo:obtenerMascotasPorClienteTipo ,
    actualizarMascota: actualizarMascota,
    obtenerCategoriaPorID: (id)=>pool.query(SQL_OBTENER_CATEGORIA_POR_ID,[id]),
    obtenerClientePorID: (id)=>pool.query(SQL_OBTENER_LISTA_CLIENTE_POR_ID,[id]),
    obtenerServicioPorIDClienteIDTipo: (id_cliente, id_tipo_servicio)=>pool.query(SQL_OBTENER_LISTA_SERVICIO_POR_IDCLIENTE_IDTIPO,[id_cliente,id_tipo_servicio]),

}
