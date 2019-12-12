const express = require('express');
const router = express.Router();
const controller = require('../controller/controlerUsuario.js');
const pool = require('../data/database');

//Paginas publicas
router.get('/', controller.abreLogin);
router.get('/inicio', controller.abreLogin);
router.get('/error', controller.abreError);
router.post('/agregar', controller.save);
router.post('/login', controller.login);
//Solo usuarios autenticados
router.get('/videos', controller.verificaToken, controller.abreVideos);
router.get('/practica', controller.verificaToken, controller.abrePractica);
router.get('/ampliarVocabulario', controller.verificaToken, controller.abreAmpliarVocabulario);
router.get('/configurar', controller.verificaToken, controller.abreConfigurar);
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
router.post('/setMonedas', controller.verificaToken, controller.setMonedas);
router.post('/editarPalabra', controller.verificaToken, controller.editarPalabra);
router.get('/getPalabrasAprendidas', controller.verificaToken, controller.getPalabrasAprendidas);
router.post('/repasaPalabra', controller.verificaToken, controller.repasaPalabra);
router.get('/getPalabrasActuales', controller.verificaToken, controller.getPalabrasActuales);
router.post('/agregarQueja', controller.verificaToken, controller.agregarQueja);
router.get('/myWords', controller.verificaToken, controller.openMyWords);
router.get('/quejas', controller.verificaToken, controller.openQuejas);
router.get('/myRequests', controller.verificaToken, controller.myRequests);
router.get('/getMyFriends', controller.verificaToken, controller.getMyFriends);
router.get('/getFriends/:myself', controller.verificaToken, controller.getFriends);
router.get('/deleteFriend/:friend', controller.verificaToken, controller.deleteFriend);
router.get('/user', controller.verificaToken, controller.getActualUser);
router.get("/acceptFriend", controller.verificaToken, controller.openAcceptFriend);
router.get("/acceptRequest/:friend", controller.verificaToken, controller.acceptRequest);
router.get("/myFriends", controller.verificaToken, controller.openMyFriends);
router.get('/addPalabra', controller.verificaToken, controller.abreAddPalabra);
router.get('/findFriend', controller.verificaToken, controller.openfindFriend);
router.get('/searchFriend/:friendToFind', controller.verificaToken, controller.searchFriend);
router.get('/getFriendData/:friendToFind', controller.verificaToken, controller.getFriendData);
router.get('/sendFriendRequest/:friend', controller.verificaToken, controller.sendFriendRequest);
router.get('/getUserData', controller.verificaToken, controller.getUserData);
router.post('/changeUserData', controller.verificaToken, controller.changeUserData);
router.get('/palabras_aprendidas', controller.verificaToken, controller.abrePalabrasAprendidas);
router.get('/palabras_actuales', controller.verificaToken, controller.abrePalabrasActuales);
router.get('/getUserConected', controller.verificaToken, controller.getUserConected);
router.get('/room', controller.verificaToken, controller.abreRoom);
router.get('/dameCategorias', controller.verificaToken, controller.dameCategorias);
router.get('/dameIdCategoria/:categoria', controller.verificaToken, controller.dameIdCategoria);

//Solo administradores
router.get('/admin', [controller.verificaToken, controller.verificaAdmin], controller.abreAdminConsole);

module.exports = router;
