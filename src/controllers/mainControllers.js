const fs = require('fs');
const path = require('path');
const db = require('../database/models');
//traigo la lista de productos
const listaProductos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf-8'));

const controller = {
    home: async (req,res)=> {
        //filtro los productos que no estan borrados
        let productosListados =  await db.Producto.findAll()
        res.render('home', {productos: productosListados})
        
    },
    
    detail: async(req,res)=> {
        //busco el producto que coincida con el id que me llega por parametro
        let producto = listaProductos.find((producto) => producto.id == req.params.id)
        res.render('detail', {producto: producto})
    },
   
    carrito:(req,res)=> {
        res.render('carrito')
    },
    create:(req,res)=> {
       
            let nuevoProducto = {
              "id": listaProductos[listaProductos.length - 1].id + 1,
              "name": req.body.name,
              "description": req.body.description,
              "category": req.body.category,
              "price": req.body.price,
              "color": req.body.color,
              "img": req.file ? req.file.filename : '',
              "borrado": false
            }
          
            // Añado el nuevo producto a la lista de productos
            listaProductos.push(nuevoProducto);
            fs.writeFileSync(path.join(__dirname, "../data/productos.json"), JSON.stringify(listaProductos, null, 2), "utf-8")
            // Redirijo al usuario a la página de inicio
        res.redirect('/');
    },
    store:(req,res)=> {
        //creo un nuevo producto con los datos que me llegan por body
        if(req.file){
            let nuevoProducto = {
                "id": listaProductos[listaProductos.length - 1].id + 1,
                "name": req.body.name,
                "desription": req.body.description,
                "category": req.body.category,
                "price": req.body.price,
                "color": req.body.color,
                "img": req.file.filename,
                "borrado": false
            }
            console.log('Entro por post', nuevoProducto)
            //agrego el nuevo producto a la lista de productos
            listaProductos.push(nuevoProducto)
            //escribo la lista de productos en el archivo productos.json
            fs.writeFileSync(path.join(__dirname, "../data/productos.json"), JSON.stringify(listaProductos, null, 2), "utf-8")
           
            res.redirect("/producto")
        }else{
            console.error("No se subio ninguna imagen");
            res.render('create')
        }
        
}, 
    edit:async(req,res)=> {
        let idProducto = req.params.id
        let producto = await db.Producto.findAll();
        res.render("/editar")
    },
    update:async (req,res)=> {
        //modifico el producto que coincida con el id que me llega por parametro
        let productoEncontrado = await db.Producto.findAll();
        productoEncontrado.id = productoEncontrado.id,
        productoEncontrado.name = req.body.name,
        productoEncontrado.description = req.body.description,
        productoEncontrado.category = req.body.category,
        productoEncontrado.price = req.body.price,
        productoEncontrado.image = req.file ? req.file.filename : productoEncontrado.image;
    
/*     fs.writeFileSync(path.join(__dirname, "../data/productos.json"), JSON.stringify(listaProductos, null, 2), "utf-8") */
   
    res.redirect("/")
},
    delete:(req,res)=> {
        //borrado logico del producto que coincida con el id que me llega por parametro
        let productoEncontrado = listaProductos.find((producto)=> producto.id == req.params.id)
       productoEncontrado.borrado = true
    
    fs.writeFileSync(path.join(__dirname, "../data/productos.json"), JSON.stringify(listaProductos, null, 2), "utf-8")
   
    res.redirect("/")
    }
}

module.exports = controller