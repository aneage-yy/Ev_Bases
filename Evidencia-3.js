

console.log("Hola, Bienvenido")

const mongoose = require("mongoose");
const MenuDePanes = require("./menuDePanes");
const VentasDePanes = require("./ventasDePanes");

mongoose.connect("mongodb://localhost:27017/Panadería_withHoney", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a MongoDB");

    // Crear colecciones si no existen
    return Promise.all([
      MenuDePanes.createCollection(),
      VentasDePanes.createCollection()
    ]);
  })
  .then(() => {
    console.log("Colecciones creadas con éxito");
  })
  .catch((error) => {
    console.error("Error en conexión o creación de colecciones:", error);
  });
  console.log("Hola parte 2")



