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

router.get('/obtener-lista', cors(), async (req, res, next) => {
    console.log("obtener lista ventas");
    console.log("request ",req)
 
    let result =await db.obtenerListaVentas()
    console.log("result ",result.rows);
    res.send(result.rows);
  
  });
  
  router.post('/insertar',cors(),async(req,res,next)=>{
    console.log("insertar venta")
    var result={};
    console.log("params", req.body);
  
    var venta=req.body;
    result= await db.insertarVenta(venta);
  
    if(result.rows){
        res.send(result.rows[0]);
    }else{
        res.send("No se pudo insertar");
    }
  
  });
  
  router.put('/actualizar',cors(),async(req,res,next)=>{
    console.log("actualizar venta")
    var result={};
    console.log("params", req.body);
  
    var venta=req.body;
    result= await db.actualizarVenta(venta);
  
    res.send("Venta actualizada");
  
  });
  
  
  router.delete('/eliminar/:venta_id',cors(),async(req,res,next)=>{
    console.log("request desde el lado cliente",req)
    console.log("parametros ", req.params);
    console.log("eliminar venta por ID ", req.params.venta_id);
    var result={};
  
    result= await db.eliminarVenta(req.params.venta_id);
  
    res.send("Venta eliminada");
  });
  module.exports = router;