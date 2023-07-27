const express = require("express");
const app = express(); 
const path = require("path"); 
app.use(express.static(path.join(__dirname, "/public")))
app.listen(3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000")
})

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/home.html"))
})

app.get("/registro", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/registro.html"))
})

app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/login.html"))
})

app.get("/carrito", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/carrito.html"))
})

app.get("/producto", (req,res)=>{
    res.sendFile(path.join(__dirname, "/views/producto.html"))
})







