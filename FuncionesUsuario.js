const readlineSync = require("readline-sync");
const MenuDePanes = require("./MenuDePanes");
const VentasDePanes = require("./ventasDePanes");


async function buscarInfoVentaPorNombrePan() {
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

async function actualizarNombrePan() {
  const id = readlineSync.question("Ingrese el ID del pan que desea actualizar: ");
  const nuevoNombre = readlineSync.question("Ingrese el nuevo nombre del pan: ");
  try {
    const pan = await MenuDePanes.findByIdAndUpdate(id, { nombre: nuevoNombre }, { new: true });
    if (!pan) {
      console.log("No se encontró ningún pan con ese ID.");
    } else {
      console.log("Nombre del pan actualizado:", pan);
      // También se actualiza el nombre en la colección de ventas
      await VentasDePanes.updateMany({ "panesVendidos._id": id }, { $set: { "panesVendidos.$.nombre": nuevoNombre } });
      console.log("Nombre del pan actualizado en la colección de ventas.");
    }
  } catch (error) {
    console.error("Error al actualizar el nombre del pan:", error);
  }
}

async function agregarPan() {
  const nombre = readlineSync.question("Ingrese el nombre del nuevo pan: ");
  const precio = readlineSync.questionFloat("Ingrese el precio del nuevo pan: ");
  const stock = readlineSync.questionInt("Ingrese el stock inicial del nuevo pan: ");
  try {
    const nuevoPan = new MenuDePanes({ nombre, precio, stock });
    await nuevoPan.save();
    console.log("Nuevo pan agregado:", nuevoPan);
  } catch (error) {
    console.error("Error al agregar el nuevo pan:", error);
  }
}

async function quitarPan() {
  const id = readlineSync.question("Ingrese el ID del pan que desea quitar: ");
  try {
    const pan = await MenuDePanes.findById(id);
    if (!pan) {
      console.log("No se encontró ningún pan con ese ID.");
      return;
    }
    await MenuDePanes.findByIdAndDelete(id);
    console.log("Pan eliminado:", pan);
    // También se elimina el pan de la colección de ventas
    await VentasDePanes.updateMany({}, { $pull: { panesVendidos: id } });
    console.log("Pan eliminado de la colección de ventas.");
  } catch (error) {
    console.error("Error al quitar el pan:", error);
  }
}

async function mostrarMenu() {
  while (true) {
    console.log("\nMenú:");
    console.log("a) Buscar panes por ID");
    console.log("b) Buscar ventas por ID");
    console.log("c) Buscar información de la venta por nombre de pan");
    console.log("d) Actualizar el nombre de un pan");
    console.log("e) Agregar un pan al menú");
    console.log("f) Quitar un pan del menú");
    console.log("g) Salir");

    const opcion = readlineSync.question("Seleccione una opción: ");

    switch (opcion.toLowerCase()) {
      case "a":
        await buscarPanesPorId();
        break;
      case "b":
        await buscarVentasPorId();
        break;
      case "c":
        await buscarInfoVentaPorNombrePan();
        break;
      case "d":
        await actualizarNombrePan();
        break;
      case "e":
        await agregarPan();
        break;
      case "f":
        }
    }
}  