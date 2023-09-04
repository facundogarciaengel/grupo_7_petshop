const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainControllers')

router.get('/', mainController.home)
router.get('/login', mainController.login)
router.get('/registro', mainController.registro)
router.get('/carrito', mainController.carrito)
router.get('/create', mainController.create)
router.post('/create', mainController.store)
router.get('/:id', mainController.detail)
router.get('/edit/:id', mainController.edit)
router.put('/edit/:id', mainController.update)
router.delete('/delete/:id', mainController.delete)

module.exports = router