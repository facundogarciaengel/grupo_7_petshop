module.exports = function(sequelize, DataTypes) {
    let alias = 'Factura';
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nombre:{
            type: DataTypes.STRING
        },
        fecha_factura: {
            type: DataTypes.DATE
        },
        id_cliente:{
            type: DataTypes.INTEGER
        },
        total:{
            type: DataTypes.DECIMAL
        },
        direccion_de_facturacion:{
            type: DataTypes.STRING
        },
        productos_id:{
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
    }
    let config = {
        tableName: 'facturas',
        timestamps: true,
        paranoid: true,
        deletedAt: "deleted_at",
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
    let Factura = sequelize.define(alias,cols,config)

    Factura.associate = function(models) {
/*         Factura.hasMany(models.Producto,{
            foreignKey: "productos_id",
            as: "producto"
        }) */
    }

    return Factura
}