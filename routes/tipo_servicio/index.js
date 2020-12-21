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
    console.log("obtener tipo servicio por ID ", req.params.id);
  
    let result = await db.obtenerTipoPorID(req.params.id);
    console.log("tipo servicio", result[0]);
    res.send(result.rows);
  
  });

  router.get('/obtener-lista', cors(), async (req, res, next) => {
    console.log("obtener lista tipo servicios");
    console.log("request ",req)
    let result =await db.obtenerListaTipos();
    console.log("result ",result.rows);
    res.send(result.rows);
  
  });

  module.exports = router;