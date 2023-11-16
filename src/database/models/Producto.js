module.exports = function(sequelize,DataTypes){
    let alias = 'Producto'
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre:{
            type: DataTypes.STRING
        },
        descripcion:{
            type: DataTypes.STRING
        },
        precio:{
            type: DataTypes.DECIMAL
        },
        img:{
            type: DataTypes.STRING
        },
        stock:{
            type: DataTypes.INTEGER
        },

    }
    let config = {
        tableName: 'productos',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let Producto = sequelize.define(alias,cols,config)

    Producto.associate = function(models) {
        Producto.belongsTo(models.Factura,{
            foreingKey: "factura_id",
            as: "factura"
        })
    }
    return Producto
}