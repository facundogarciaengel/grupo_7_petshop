const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multerMiddleware')
const validations = require('../middlewares/validationMiddleware')
const userController = require('../controllers/userController')

router.get('/login', userController.login)
router.get('/registro', userController.registro)
router.post('/registro', upload.single('foto_perfil'), validations,userController.registroPost)

module.exports = router