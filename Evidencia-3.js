
/**
console.log("Hola")

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
*/


const mongoose = require("mongoose");
const MenuDePanes = require("./menuDePanes"); // Importa tu modelo de datos
  
// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/Panadería_withHoney", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Conexión exitosa a MongoDB");

    // Insertar un solo documento (tipo de pan)
    const pan1 = await MenuDePanes.create({
      nombre: "Roles de miel",
      precio: 25,
      descripcion: "Roles esponjosos, masa tipo brioche con relleno de miel, capeados con azúcar glass y canela ",
      
    });
    console.log("Pan insertado Rol:", pan1);

    // Insertar varios documentos (tipos de panes)
    const panes = [
      { nombre: "Pan de fresa", precio: 20, descripcion: "Pan suave con sabor a fresa, relleno de mermelada de frutos rojos"},
      { nombre: "Pan de chocolate", precio: 25, descripcion: "Pan estilo brownie, con triple chispas de chocolate, con glaseado y fresas por encima."},
      { nombre: "Pan relleno de queso crema", precio: 30, descripcion: "Pan esponjoso con un centro suave y cremoso de queso crema"},
      { nombre: "Cupcake de red velvet", precio: 15, descripcion: "Esponjoso y húmedo, con sabor a cacao y vainilla. Se sirve con glaseado de queso crema."},
      { nombre: "Pan relleno de queso mozzarella", precio: 10, descripcion: "Masa con capas de queso mozzarella derretido en su interior, ofreciendo un pan suave"}
    ];
    const panesInsertados = await MenuDePanes.insertMany(panes);
    console.log("Panes insertados:", panesInsertados);

    // Desconectar de la base de datos al finalizar
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error en conexión:", error);
  });
