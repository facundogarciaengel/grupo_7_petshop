module.exports = function(sequelize, DataTypes) {
    let alias = 'Categoria';
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre:{
            type: DataTypes.STRING
        },

        
    }
    let config = {
        tableName: 'categoria',
        timestamps: false,
        paranoid: true,
    }
    let Categoria = sequelize.define(alias,cols,config)
    return Categoria
}