const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')
const mainController = require('../controllers/mainControllers')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images"))
    },
    filename: (req, file, cb) => {
        console.log(file)   
        const newFileName = "producto-" + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }   
})


const upload = multer({storage})

router.get('/', mainController.home)
router.get('/carrito', mainController.carrito)
router.get('/create', mainController.create)
router.post('/create', upload.single('image'), mainController.store)
router.get('/detail/:id', mainController.detail)
router.get('/edit/:id', mainController.edit)
router.put('/edit/:id', upload.single('image'), mainController.update)
router.delete('/delete/:id', mainController.delete)


module.exports = router