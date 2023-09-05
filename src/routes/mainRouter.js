const express = require('express')
const router = express.Router()
const multer = require('multer')
const mainController = require('../controllers/mainControllers')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images"))
    },
    filename: (req, file, cb) => {
        console.log(file)   
        const newFileName = "plato-" + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }   
})

const upload = multer({storage})

router.get('/', mainController.home)
router.get('/login', mainController.login)
router.get('/registro', mainController.registro)
router.get('/carrito', mainController.carrito)
router.get('/create', mainController.create)
router.post('/create', upload.single('image'), mainController.store)
router.get('/:id', mainController.detail)
router.get('/edit/:id', mainController.edit)
router.put('/edit/:id', upload.single('image'), mainController.update)
router.delete('/delete/:id', mainController.delete)

module.exports = router