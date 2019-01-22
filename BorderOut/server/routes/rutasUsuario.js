const express = require('express');
const router = express.Router();
const controller = require('../controller/controlerUsuario.js')
router.get('/', controller.abreLogin);
router.post('/agregar', controller.save);
router.get('/videos', controller.prueba);

module.exports = router;