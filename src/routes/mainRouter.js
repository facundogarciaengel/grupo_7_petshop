const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainControllers')

router.get('/', mainController.home)
router.get('/login', mainController.login)
router.get('/registro', mainController.registro)
router.get('/producto', mainController.producto)
router.get('/carrito', mainController.carrito)
router.get('/crear', mainController.crear)

module.exports = router