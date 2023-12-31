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
    
    detail:async (req, res) => {
        let productFound = await db.Producto.findByPk(req.params.id)
        return res.render('detail', { producto: productFound })
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
        let productId = req.params.id
        let product = await db.Producto.findAll();
        res.render("/editar", { producto: product })
    },
    update:async (req,res)=> {
        //modifico el producto que coincida con el id que me llega por parametro
        let producto = await db.Producto.findAll();
        producto.id = productId.id,
        producto.name = req.body.name,
        producto.description = req.body.description,
        producto.category = req.body.category,
        producto.color = req.body.color,
        producto.price = req.body.price,
        producto.image = req.file ? req.file.filename : productoEncontrado.image;
    
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