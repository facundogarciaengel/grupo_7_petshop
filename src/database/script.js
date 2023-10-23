const ProductosData = require('./productData'); // Importa los datos que proporcioné
//traer la conexion de seuqelize 
const db = require('./models/index')

    // Inserta los datos en la tabla de productos
 db.Producto.bulkCreate(ProductosData)
      .then(() => {
        console.log('Registros insertados en la tabla de productos.');
      })
      .catch((error) => {
        console.error('Error al insertar registros en la tabla de productos:', error);
      });
  