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

  module.exports = router;