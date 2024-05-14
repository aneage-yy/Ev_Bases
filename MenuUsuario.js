
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const MenuDePanes = require("./menuDePanes"); 
const VentasDePanes = require("./Ventas");


async function busqueda_info_venta() {
    const nombrePan = readlineSync.question("Ingrese el nombre del pan para buscar información de la venta: ");
    try {
      const venta = await VentasDePanes.findOne({ panesVendidos: nombrePan }).populate("panesVendidos");
      if (!venta) {
        console.log("No se encontró ninguna venta con ese nombre de pan.");
      } else {
        console.log("Información de la venta:", venta);
      }
    } catch (error) {
      console.error("Error al buscar la información de la venta por nombre de pan:", error);
    }
  }
  

async function mostrarMenu() {
    while (true) {
      console.log("\nMenú:");
      console.log("a) Buscar panes por nombre"); 
      console.log("b) Busca ventas por nombre de la sucursal "); 
      console.log("c) Buscar información de la venta por nombre de pan");
      console.log("d) Actualizar el nombre de un pan");
      console.log("e) Agregar un pan al menú");
      console.log("f) Quitar un pan del menú");
      console.log("g) Salir");
  
      const opcion = readlineSync.question("Seleccione una opción: ");
  
      switch (opcion.toLowerCase()) {
        case "a":
          await busqueda_panes_nombre();
          break;
        case "b":
          await busqueda_ventas_nombre();
          break;
        case "c":
          await busqueda_info_venta();
          break;
        case "d":
          await actualizar_pan();
          break;
        case "e":
          await agregar_pan();
          break;
        case "f":
          }
      }
  }  