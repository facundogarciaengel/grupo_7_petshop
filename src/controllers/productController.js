const path = require('path')
const fs = require('fs')
const db = require('../database/models');
const { validationResult } = require('express-validator')


const controller ={
    'list': async (req, res)=>{
        let productosListados =  await db.Producto.findAll()
        res.render('producto',{listaProductos: productosListados}) 
    },    
    'detail':async (req, res) => {
        let productFound = await db.Product.findByPk(req.params.id,{include:[{association:"Categoria"}]});
        console.log("detalle de producto " + productFound.Categoria.categoria); 
        return res.render(path.join(__dirname, "../views/detail.ejs"), { product: productFound })
    },
    'crear': async (req, res) => {
        let producto = await db.Producto.findAll();
        let categoria = await db.Categoria.findAll();
        return res.render(path.join(__dirname, "../views/crearProducto.ejs"),{producto:producto,categoria:categoria})
    },
    'crearProcess':(req,res) =>{  
        let errors = validationResult(req)
        if(errors.errors.length > 0){}
        let newProduct = db.Product.create({
            "id": productsList.length +1,
            "nombre": req.body.name.toLowerCase(),
            "descripcion": req.body.description.toLowerCase(),
            "precio": req.body.price,
            "img": req.file ? req.file.filename : 'logo.png',                    
        })
/*             productsList.push(newProduct)
            
            fs.writeFileSync(path.join(__dirname,'../data/productData.json'),JSON.stringify(productsList,null,2),'utf-8')
            res.redirect('/') */
            
        },
        edit:(req,res)=>{
            res.render(path.join(__dirname,"../views/productEdit.ejs"))
        },
        editProcess:(req,res)=>{

            fs.writeFileSync(path.join(__dirname,'../data/productData.json'),JSON.stringify(productsList,null,2),'utf-8')
            res.redirect('/')

        },
        add: function (req, res) {
            res.render('crearProducto')  
        },
        create: async function (req, res) {
           const productoCreado = await db.Petshop.create({
                ...req.body
           })
           console.log(productoCreado);
           res.redirect('/')
        },
        edit: async function(req, res) {
            const producto = await db.Petshop.findByPk(req.params.id)
            res.render('edit',{Petshop:producto})
        },
        update: async function (req,res) {
            const productoEditado = await db.Petshop.update({
                ...req.body
           }, {where:{
            id: req.params.id} })
            console.log(productoEditado);
            res.redirect('/')
        },
        delete: async function (req, res) {
            const producto = await db.Petshop.findByPk(req.params.id)
            res.render('productoBorrado',{Petshop:producto})
        },
        destroy: async function (req, res) {
            const productoBorrado=  await db.Petshop.destroy({where:{
            id: req.params.id} })
            console.log(productoBorrado);
            res.redirect('/')
        },
        restaurar: async function (req, res){
            const productoRestaurado=  await db.Petshop.restore({where:{
            id: req.params.id} })
            console.log(productoRestaurado);
            res.redirect('/')
        }
    
    }





module.exports = controller