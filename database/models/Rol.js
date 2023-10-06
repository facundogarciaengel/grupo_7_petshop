module.exports = function(sequelize, DataTypes) {
    let alias = 'Rol';
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
        tableName: 'roles',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let Rol = sequelize.define(alias,cols,config)
    return Rol
}