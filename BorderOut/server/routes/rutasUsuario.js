const express = require('express');
const router = express.Router();
const controller = require('../controller/controlerUsuario.js');
const pool = require('../data/database');


//Paginas publicas
router.get('/', controller.abreLogin);
router.get('/error', controller.abreError);
router.post('/agregar', controller.save);
router.post('/login', controller.login);


//Solo usuarios autenticados
router.get('/videos', controller.verificaToken, controller.abreVideos);
router.get('/ampliarVocabulario', controller.verificaToken, controller.abreAmpliarVocabulario);
router.get('/escogePalabras', controller.verificaToken, controller.abreTinder);
router.get('/categorias', controller.getCategorias);
module.exports = router;