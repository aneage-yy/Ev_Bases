const mongoose = require("mongoose");
const MenuDePanes = require("./menuDePanes");
const Venta = require("./ventaDePanes"); // Importa el modelo de VentaDePanes

mongoose.connect("mongodb://localhost:27017/Panadería_withHoney", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Conexión exitosa a MongoDB");

    try {
      // Realiza una consulta para obtener todos los documentos de la colección VentaDePanes
      const todasLasVentas = await Venta.find({});
      console.log("Todas las ventas en la base de datos:", todasLasVentas);
    } catch (error) {
      console.error("Error al consultar la base de datos:", error);
    } finally {
      mongoose.disconnect(); // Cierra la conexión una vez finalizada la consulta
    }
  })
  .catch((error) => {
    console.error("Error en conexión a la base de datos:", error);
  });
