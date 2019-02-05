const express = require('express');
const router = express.Router();
const controller = require('../controller/controlerUsuario.js')
router.get('/', controller.abreLogin);
router.get('/error', controller.abreError);
router.post('/agregar', controller.save);
router.post('/login', controller.login);
router.get('/videos', controller.prueba);

module.exports = router;