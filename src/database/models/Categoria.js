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
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let Categoria = sequelize.define(alias,cols,config)
    return Categoria
}