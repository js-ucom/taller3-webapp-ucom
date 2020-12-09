
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
const SQL_INSERTAR_MASCOTA="insert into mascota(nombre,id_categoria) values($1,$2) RETURNING id_mascota";
const SQL_OBTENER_CATEGORIA_POR_ID="select * from categoria where id=$1";
const SQL_OBTENER_LISTA_CLIENTE_POR_ID="select * from cliente where id_cliente=$1";
const SQL_OBTENER_LISTA_SERVICIO_POR_IDCLIENTE_IDTIPO = "select s.id_cliente, c.nombre, c.apellido, s.fecha_servicio, s.estado FROM servicio s LEFT JOIN cliente c ON c.id_cliente = s.id_cliente LEFT JOIN tipo_servicio ts ON ts.id_tipo_servicio=s.id_tipo_servicio WHERE c.id_cliente=$1 AND ts.id_tipo_servicio=$2 order by s.id_cliente asc, s.fecha_servicio desc, s.estado desc";

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

module.exports = {
    obtenerMascotaPorID: (id)=>pool.query(SQL_OBTENER_LISTA_MASCOTA_POR_ID,[id]),
    insertarMascota: insertarMascota,
    obtenerCategoriaPorID: (id)=>pool.query(SQL_OBTENER_CATEGORIA_POR_ID,[id]),
    obtenerClientePorID: (id)=>pool.query(SQL_OBTENER_LISTA_CLIENTE_POR_ID,[id]),
    obtenerServicioPorIDClienteIDTipo: (id_cliente, id_tipo_servicio)=>pool.query(SQL_OBTENER_LISTA_SERVICIO_POR_IDCLIENTE_IDTIPO,[id_cliente,id_tipo_servicio]),

}
