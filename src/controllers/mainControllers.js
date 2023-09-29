const controller = {
    home:(req,res)=> {
        res.render('home.ejs')
    },
    login:(req,res)=> {
        res.render('login.ejs')
    },
    producto:(req,res)=> {
        res.render('producto.ejs')
    },
    registro:(req,res)=> {
        res.render('registro.ejs')
    },
    carrito:(req,res)=> {
        res.render('carrito.ejs')
    },
    crear:(req,res)=> {
        res.render('crearProducto.ejs')
    },
}

module.exports = controller