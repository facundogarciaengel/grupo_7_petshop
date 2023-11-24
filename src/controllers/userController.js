const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const db = require("../database/models");
const Usuario = require('../database/models/Usuario');

const controller = { 
  login:(req,res)=> {
    res.render('login',{data:req.body, errors: validationResult(req).errors})
  },
  loginProcess: async(req, res) => {
  
    console.log(req.body);
    let userToLogin = await db.Usuario.findOne({where:{ "email": req.body.email}})
    console.log(userToLogin);
    if(userToLogin){
      let isOkThePassword = bcrypt.compareSync(req.body.contraseña, userToLogin.contrasenia)
      if(isOkThePassword){
        return res.redirect('/')
      }
       res.render('login', {errors: {
        usuario: {
          msg: 'Las credenciales son invalidas'
        }
      }})
    }
      res.render('login', {errors: {
      usuario: {
        msg: 'No se encuentra este email en nuestra base de datos'
      }
    }})
  },
    registro:(req,res)=> {
        res.render('registro.ejs')
    },
    registroPost: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.render("registro", {errors: errors.mapped(), old: req.body})
        } else {
  
          let userInDb = await db.Usuario.findOne({where:{'email': req.body.correo}})
          if(userInDb){
            return res.render('registro', {
              errors : {
                correo: {
                  msg:'Este correo ya esta registrado'
                }
              }, 
              old: req.body
            })
          }
          let userToCreate = {
            ...req.body,
            email: req.body.correo,
            contrasenia: bcrypt.hashSync(req.body.contrasena, 10),
            imagen: req.file.filename

          }
          db.Usuario.create(userToCreate)
          return res.redirect('/user/login');
        }
      },  
          
}

module.exports = controller