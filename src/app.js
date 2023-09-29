const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require('method-override');
const mainRouter = require('./routes/mainRouter')
const userRouter = require('./routes/usersRoutes')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.listen(3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000")
})

app.use('/producto', mainRouter)
app.use('/user', userRouter)








