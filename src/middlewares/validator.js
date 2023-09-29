const {check} = require('express-validator')
const fs = require('fs')

const validator = [
    check('image').custom((value, {req})=>{
        let file = req.file;
        if(req.fileError){
            throw new Error ('Adjunte un archivo de imágen válido')
        }
        else if (file.size > 1024*1024*10){
            fs.unlinkSync(file.path)
            throw new Error ('La imágen debe tener un tamaño menor a 10mb')
        }
        return true
    })
]

module.exports = validator