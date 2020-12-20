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
    console.log("obtener lista articulos");
    console.log("request ",req)
 
    let result =await db.obtenerListaArticulos()
    console.log("result ",result.rows);
    res.send(result.rows);
  
  });
  
  router.post('/insertar',cors(),async(req,res,next)=>{
    console.log("insertar articulo")
    var result={};
    console.log("params", req.body);
  
    var articulo=req.body;
    result= await db.insertarArticulo(articulo);
  
    if(result.rows){
        res.send(result.rows[0]);
    }else{
        res.send("No se pudo insertar");
    }
  
  });
  
  router.put('/actualizar',cors(),async(req,res,next)=>{
    console.log("actualizar articulo")
    var result={};
    console.log("params", req.body);
  
    var articulo=req.body;
    result= await db.actualizarArticulo(articulo);
  
    res.send("Articulo actualizado");
  
  });
  
  
  router.delete('/eliminar/:id',cors(),async(req,res,next)=>{
    console.log("request desde el lado cliente",req)
    console.log("parametros ", req.params);
    console.log("eliminar articulo por ID ", req.params.id);
    var result={};
  
    result= await db.eliminarArticulo(req.params.id);
  
    res.send("Articulo eliminado");
  
  
  });