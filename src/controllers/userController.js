const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const controller = { 
    login:(req,res)=> {
        res.render('login.ejs')
    },
    registro:(req,res)=> {
        res.render('registro.ejs')
    },
    registroPost: (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.render("registro", {errors: errors.mapped(), old: req.body})
        } else {
  
          let userInDb = User.findByField('correo', req.body.correo)
          if(userInDb){
            return res.render('register', {
              errors : {
                correo: {
                  msg:'Este correo ya esta registrado'
                }
              }, 
              old: req.bodyj
            })
          }
          let userToCreate = {
            ...req.body,
            contrasena: bcrypt.hashSync(req.body.contrasena, 10),
            foto_perfil: req.file.filename
          }
          User.create(userToCreate)
          return res.send("Se guardo el usuario")
        }
      },  
  
}

module.exports = controller