var express = require('express');
var cors = require('cors');
var router = express.Router();
const axios = require('axios');

const jwt = require('express-jwt')

var PropertiesReader = require('properties-reader');

const db = require('../../db');

var _ = require('lodash');

const Router = require('express-promise-router')
const {
  Pool,
  Client
} = require('pg');
const { request } = require('express');

router.get('/obtener-por-idcliente-idtipo/:id_cliente/:id_tipo_servicio', cors(), async (req, res, next) => {
    console.log("obtener servicio por ID ciente y ID tipo ", req.params.id_cliente, req.params.id_tipo_servicio);
  
    let result = await db.obtenerServicioPorIDClienteIDTipo(req.params.id_cliente, req.params.id_tipo_servicio);
    console.log("servicio", result[0]);
    res.send(result.rows);
  
  });

  router.get('/obtener-lista', cors(), async (req, res, next) => {
    console.log("obtener lista servicios");
    console.log("request ",req)
  
  
  
    let result =await db.obtenerListaServicios()
    console.log("result ",result.rows);
    res.send(result.rows);
  
  });

  router.post('/insertar',cors(),async(req,res,next)=>{
    console.log("insertar servicio")
    var result={};
    console.log("params", req.body);
  
    var servicio=req.body;
    result= await db.insertarServicio(servicio);
  
    if(result.rows){
        res.send(result.rows[0]);
    }else{
        res.send("No se pudo insertar");
    }
  
  });

  router.put('/actualizar',cors(),async(req,res,next)=>{
    console.log("actualizar servicio")
    var result={};
    console.log("params", req.body);
  
    var servicio=req.body;
    result= await db.actualizarServicio(servicio);
  
  
    res.send("Servicio actualizado");
    
  
  });
  
  
  router.delete('/eliminar/:id',cors(),async(req,res,next)=>{
    console.log("request desde el lado cliente",req)
    console.log("parametros ", req.params);
    console.log("elimina servicio por ID ", req.params.id);
    var result={};
  
    result= await db.eliminarServicio(req.params.id);
  
    res.send("Servicio eliminado");
  
  
  });
  

  module.exports = router;