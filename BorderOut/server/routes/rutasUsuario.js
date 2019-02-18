const express = require('express');
const router = express.Router();
const controller = require('../controller/controlerUsuario.js')

//Paginas publicas
router.get('/', controller.abreLogin);
router.get('/error', controller.abreError);
router.post('/agregar', controller.save);
router.post('/login', controller.login);


//Solo usuarios autenticados
router.get('/videos', controller.verificaToken, controller.abreVideos);
router.get('/ampliarVocabulario', controller.verificaToken, controller.abreAmpliarVocabulario);
//router.post('/videos', controller.verificaToken, controller.prueba);

module.exports = router;