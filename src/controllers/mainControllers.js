const fs = require('fs');
const path = require('path');
//traigo la lista de productos
const listaProductos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productos.json'), 'utf-8'));

const controller = {
    home:(req,res)=> {
        //filtro los productos que no estan borrados
let productosSinBorrar = listaProductos.filter((producto) => producto.borrado == false)
        res.render('home.ejs', {productos: productosSinBorrar})
    },
    login:(req,res)=> {
        res.render('login.ejs')
    },
    detail:(req,res)=> {
        let idProducto = req.params.id
        //busco el producto que coincida con el id que me llega por parametro
        let producto = listaProductos.find((producto) => producto.id == idProducto)
        res.render('detail', {producto: producto})
    },
    registro:(req,res)=> {
        res.render('registro.ejs')
    },
    carrito:(req,res)=> {
        res.render('carrito.ejs')
    },
    create:(req,res)=> {
        res.render('create.ejs')
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
                "imge": req.file.filename,
                "borrado": false
            }
            //agrego el nuevo producto a la lista de productos
            listaProductos.push(nuevoProducto)
            //escribo la lista de productos en el archivo productos.json
            fs.writeFileSync(path.join(__dirname, "../data/productos.json"), JSON.stringify(listaProductos, null, 2), "utf-8")
           
            res.redirect("/")
        }else{
            res.render('create.ejs')
        }
        
}, 
    edit:(req,res)=> {
        let idProducto = req.params.id
        let producto = listaProductos.find(producto => producto.id == idProducto)
        res.render('edit', {producto})
    },
    update:(req,res)=> {
        //modifico el producto que coincida con el id que me llega por parametro
        let productoEncontrado = listaProductos.find((producto)=> producto.id == req.params.id)
        console.log(productoEncontrado)
        productoEncontrado.id = productoEncontrado.id,
        productoEncontrado.name = req.body.name,
        productoEncontrado.description = req.body.description,
        productoEncontrado.category = req.body.category,
        productoEncontrado.price = req.body.price,
        productoEncontrado.image= req.file.filename,
        productoEncontrado.color = req.body.color
    
    fs.writeFileSync(path.join(__dirname, "../data/productos.json"), JSON.stringify(listaProductos, null, 2), "utf-8")
   
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