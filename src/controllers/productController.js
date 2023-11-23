const path = require('path')
const fs = require('fs')
const db = require('../database/models');
const { validationResult } = require('express-validator')


const controller ={
    list: async (req, res)=>{
        let productosListados =  await db.Producto.findAll()
        res.render('producto',{listaProductos: productosListados}) 
    },    
    detail:async (req, res) => {
        let productFound = await db.Product.findByPk(req.params.id,{include:[{association:"Categoria"}]});
        console.log("detalle de producto " + productFound.Categoria.categoria); 
        return res.render(path.join(__dirname, "../views/detail.ejs"), { product: productFound })
    },
    crear: async (req, res) => {
        let producto = await db.Producto.findAll();
        let categoria = await db.Categoria.findAll();
        return res.render('crearProducto'),{producto:producto,categoria:categoria}
    },
    crearProcess:(req,res) =>{  
        let errors = validationResult(req)
        if(errors.errors.length > 0){}
        console.log(req.body)
        let newProduct = db.Producto.create({
            "nombre": req.body.name.toLowerCase(),
            "descripcion": req.body.description.toLowerCase(),
            "precio": req.body.price,
            "img": req.file ? req.file.filename : 'logo.png',                    
        })
            /*             productsList.push(newProduct)
            
            fs.writeFileSync(path.join(__dirname,'../data/productData.json'),JSON.stringify(productsList,null,2),'utf-8')
            res.redirect('/') */
            
        },
        edit: async (req,res)=>{
            let producto = await db.Producto.findAll();
            let categoria = await db.Categoria.findAll();
            /* return res.render(path.join(__dirname,"../views/edit.ejs"),{producto:producto,categoria:categoria})  */

            if (req.session.userLogged) {
                if (req.session.userLogged.id_roles == 1) {
                    let productFound = await db.Product.findByPk(req.params.id, { paranoid: false });
                    return res.render('edit', {producto:productFound,categoria:categoria})
                } else {
                    let productFound = await db.Product.findByPk(req.params.id);
                    return res.render('edit', {producto:productFound,categoria:categoria})
                }
            } else {
                let productFound = await db.Product.findByPk(req.params.id);
                return res.render('edit', {producto:productFound,categoria:categoria})
    
            }
        },
        editProcess: async(req,res)=>{
            let producto = await db.Producto.findAll();
            let categoria = await db.Categoria.findAll();
            let errors = validationResult(req)  

            let productFound = await db.Product.findByPk(req.params.id);


            if (errors.isEmpty()) {db.Product.update({
                nombre: req.body.name.toLowerCase(),
                descripcion: req.body.description.toLowerCase(),
                precio: req.body.price,
                img: req.file ? req.file.filename : 'logo.png',  
                categoria_id: req.body.categoria,
    
            }, { where: { id: req.params.id } })
            return res.redirect('/' + req.params.id)}
            else {
                let productFound = await db.Product.findByPk(req.params.id);
                return res.render("edit", { errores:errors.array(),categoria:categoria, producto: productFound })
            } 

/* 
            fs.writeFileSync(path.join(__dirname,'../data/productData.json'),JSON.stringify(productsList,null,2),'utf-8')
            res.redirect('/') */

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