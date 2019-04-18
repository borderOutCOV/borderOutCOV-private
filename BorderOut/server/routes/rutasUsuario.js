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
router.get('/practica', controller.verificaToken, controller.abrePractica);
router.get('/ampliarVocabulario', controller.verificaToken, controller.abreAmpliarVocabulario);
router.get('/escogePalabras', controller.verificaToken, controller.abreTinder);
router.get('/categorias', controller.verificaToken, controller.getCategorias);
router.get('/setcategoria/:id', controller.verificaToken, controller.setcategoria);
router.get('/getPalabras', controller.verificaToken, controller.getPalabras);
router.get('/getMisPalabras', controller.verificaToken, controller.getMyWords);
router.post('/borrarPalabra', controller.verificaToken, controller.deletePalabra);
router.post('/postPalabras', controller.verificaToken, controller.postPalabras);
router.post('/addWord', controller.verificaToken, controller.addWord);
router.get('/getPalabrasPractica', controller.verificaToken, controller.getPalabrasPractica);
router.get('/getPalabrasPracticaUsuario', controller.verificaToken, controller.getPalabrasPracticaUsuario);
router.post('/setNuevoContador', controller.verificaToken, controller.setNuevoContador);
router.post('/setNuevoContadorPractica', controller.verificaToken, controller.setNuevoContadorPractica);
router.post('/editarPalabra', controller.editarPalabra);



router.get('/myWords', controller.verificaToken, controller.openMyWords);
router.get('/addPalabra', controller.verificaToken, controller.abreAddPalabra);
router.get('/findFriend', controller.verificaToken, controller.openfindFriend);
module.exports = router;