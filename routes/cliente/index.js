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

router.get('/obtener-por-id/:id', cors(), async (req, res, next) => {
    console.log("obtener cliente por ID ", req.params.id);
  
    let result = await db.obtenerClientePorID(req.params.id);
    console.log("cliente", result[0]);
    res.send(result.rows);
  
  });

  router.get('/obtener-lista', cors(), async (req, res, next) => {
    console.log("obtener lista clientes");
    console.log("request ",req)
    let result =await db.obtenerListaClientes()
    console.log("result ",result.rows);
    res.send(result.rows);
  
  });

  router.post('/insertar',cors(),async(req,res,next)=>{
    console.log("insertar cliente")
    var result={};
    console.log("params", req.body);
  
    var cliente=req.body;
    result= await db.insertarCliente(cliente);
  
    if(result.rows){
        res.send(result.rows[0]);
    }else{
        res.send("No se pudo insertar");
    }
  
  });
  
  router.put('/actualizar',cors(),async(req,res,next)=>{
    console.log("actualizar cliente")
    var result={};
    console.log("params", req.body);
  
    var cliente=req.body;
    result= await db.actualizarCliente(cliente);
  
  
    res.send("Cliente actualizado");
    
  
  });
  
  
  router.delete('/eliminar/:id',cors(),async(req,res,next)=>{
    console.log("request desde el lado cliente",req)
    console.log("parametros ", req.params);
    console.log("eliminar cliente por ID ", req.params.id);
    var result={};
  
    result= await db.eliminarCliente(req.params.id);
  
    res.send("Cliente eliminado");
  
  
  });
  module.exports = router;