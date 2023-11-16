const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

router.get('/producto', productController.list);
router.get('/crearProducto', productController.new);


//Rutas exigidas para la creación del CRUD
router.get('/producto/add', productController.add);
router.post('/producto/create', productController.create);
router.get('/producto/edit/:id', productController.edit);
router.post('/producto/update/:id', productController.update);
router.get('/producto/delete/:id', productController.delete);
router.post('/producto/delete/:id', productController.destroy);
router.get('/producto/restore/:id',  productController.restaurar)

module.exports = router;