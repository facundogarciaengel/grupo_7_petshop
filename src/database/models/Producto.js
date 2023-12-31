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
            type: DataTypes.INTEGER
        },
        stock:{
            type: DataTypes.INTEGER
        },
        created_at:{
            type: DataTypes.DATE
        },
        deleted_at:{
            type: DataTypes.DATE
        },
        updated_at:{
            type: DataTypes.DATE
        } 
/*         facturas_id:{
            type: DataTypes.INTEGER
        }, */

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
/*         Producto.belongsTo(models.Factura,{
            foreignKey: 'facturas_id',
            as: "factura"
        }) */
    }
    return Producto
}