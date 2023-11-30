const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadFile = require('../middlewares/multer')

router.get('/producto', productController.list);
/* router.get('/crearProducto', productController.new); */


//Rutas exigidas para la creación del CRUD
router.get('/producto/add', productController.add);
router.post('/producto/create' , uploadFile.single('img') ,productController.crearProcess);
router.get('/producto/detail/:id', productController.detail);
router.get('/producto/edit', productController.edit);
router.put('/producto/edit/:id', productController.editProcess);
router.post('/producto/update/:id', productController.update);
router.get('/producto/delete/:id', productController.delete);
router.post('/producto/delete/:id', productController.destroy);
router.get('/producto/restore/:id',  productController.restaurar)

module.exports = router;