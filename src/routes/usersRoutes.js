const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multerMiddleware')
const validations = require('../middlewares/validationMiddleware')
const userController = require('../controllers/userController')
const {check} = require("express-validator");

router.get('/login', userController.login)
router.post('/login', [
    check('usuario').notEmpty().withMessage('El campo usuario es obligatorio.'),
    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio.')
], userController.login);


router.get('/registro', userController.registro)
router.post('/registro', upload.single('foto_perfil'), validations,userController.registroPost)

module.exports = router