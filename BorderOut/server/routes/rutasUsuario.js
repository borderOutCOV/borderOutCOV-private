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
router.get('/setcategoria/:id', controller.setcategoria);
router.get('/getPalabras', controller.getPalabras);
router.post('/postPalabras', controller.postPalabras);
router.post('/addWord', controller.addWord);

router.get('/myWords', controller.verificaToken, controller.openMyWords);
router.get('/addPalabra', controller.verificaToken, controller.abreAddPalabra);
module.exports = router;