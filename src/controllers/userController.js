const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const controller = { 
  login:(req,res)=> {
    res.render('login',{data:req.body, errors: validationResult(req).errors})
  },
  loginProcess: (req, res) => {
    let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("login", { errors: errors.mapped(), old: req.body });
  }

  let userToLogin = User.findByField('email', req.body.email);
  console.log(userToLogin);

  if (userToLogin) {
    if (bcrypt.compareSync(req.body.contraseña, userToLogin.contraseña)) {
      req.session.user = userToLogin;
      return res.redirect('/');
    } else {
      return res.render('login', {
        errors: {
          contraseña: {
            msg: 'Contraseña incorrecta'
          }
        },
        old: req.body
      });
    }
  }

  return res.render('/login', {
    errors: {
      email: {
        msg: 'No se encuentra este email en nuestra base de datos'
      }
    },
    old: req.body
  });
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
            contrasena: bcrypt.hashSync(req.body.contrasena, 10),
            foto_perfil: req.file.filename
          }
          User.create(userToCreate)
          return res.redirect('/user/login');
        }
      },  
          
}

module.exports = controller