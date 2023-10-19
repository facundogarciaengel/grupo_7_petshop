module.exports = function(sequelize, DataTypes) {
    let alias = 'Usuario';
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre:{
            type: DataTypes.STRING
        },
        apellido:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        img:{
            type: DataTypes.INTEGER
        },
        id_roles:{
            type: DataTypes.INTEGER
        },


    }
    let config = {
        tableName: 'usuarios',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let Usuario = sequelize.define(alias,cols,config)
    return Usuario
}