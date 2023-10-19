module.exports = function(sequelize, DataTypes) {
    let alias = 'Factura_Producto';
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_factura:{
            type: DataTypes.INTEGER
        },
        id_producto: {
            type: DataTypes.INTEGER
        },
        cantidad:{
            type: DataTypes.STRING
        },
        precio:{
            type: DataTypes.DECIMAL
        },
       
    }
    let config = {
        tableName: 'factura-producto',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let Factura_Producto = sequelize.define(alias,cols,config)
    return Factura_Producto
}