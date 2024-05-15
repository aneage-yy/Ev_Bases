const readlineSync = require("readline-sync");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;
const MenuDePanes = require("./menuDePanes"); 
mongoose.connect("mongodb://localhost:27017/Panadería_withHoney", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Conexión exitosa a MongoDB");

    async function iniciarMenu() {
      while (true) {
        console.log("\n ☆⋆｡𖦹°‧★⋆ ˚｡⋆୨୧⋆ ˚｡⋆‧ Menú: ☆⋆｡𖦹°‧★⋆ ˚｡⋆୨୧⋆ ˚｡⋆‧");

        console.log("a) Buscar panes por nombre"); 
        console.log("b) Buscar ventas por nombre de la sucursal "); 
        
        console.log("c) Actualizar el nombre de un pan");
        console.log("d) Actualizar el nombre de una sucursal");

        console.log("e) Agregar un pan al menú");

        console.log("f) Quitar un pan del menú");
        console.log("g) Salir");
    
        const opcion = readlineSync.question("Seleccione una opcion: ");
  
        switch (opcion) {
          case 'a':
                const pan_solicitado = readlineSync.question("Dime el nombre del pan que deseas buscar: ");
                try {
                  const cursor = await mongoose.connection.collection("menudepanes").find({ nombre: pan_solicitado });
                  const result = await cursor.toArray(); // Convertir el cursor a un array de documentos
              
                  if (result.length > 0) {
                    // Iterar sobre cada documento encontrado en el resultado
                    result.forEach((pan) => {
                      console.log("Nombre del pan:", pan.nombre);
                      console.log("Precio:", pan.precio);
                      console.log("Descripción:", pan.descripcion);
                      console.log("--------------");
                    });
                  } else {
                    console.log("No se encontró información para el pan especificado.");
                  }
                } catch (error) {
                  console.error("Error al buscar panes por nombre:", error);
                }
            break;       

          case 'b':
            const sucursal_solicitada = readlineSync.question("Dime la sucursal a buscar: ");
            try {
              const cursor = await mongoose.connection.collection("ventasDePanes").find({ nombreSucursal: sucursal_solicitada });
              const ventas = await cursor.toArray();
          
              if (ventas.length > 0) {
                for (const venta of ventas) {
                  console.log("                                      ");
                  console.log("De la sucursal:", venta.nombreSucursal);
                  console.log("Fecha de la venta:", venta.fechaVenta);
                  console.log("Los panes vendidos de esta sucursal son:");
          
                  // Iterar sobre los IDs de los panes vendidos
                  for (const panIdObj of venta.panesVendidos) {
                    const panId = panIdObj._id.toString(); // Convertir el ID a string
                   // console.log("- ID del pan vendido:", panId);
          
                    // Buscar el detalle del pan en la colección menuDePanes usando el ID
                    const pan = await mongoose.connection.collection("menudepanes").findOne({ _id: new ObjectId(panId) });
                    if (pan) {
                      console.log("- Nombre del pan:", pan.nombre);
                      //console.log("- Precio:", pan.precio);
                      
                      console.log("--------------");
                    } else {
                      console.log("- Pan no encontrado para ID:", panId);
                    }
                  }
                }
              } else {
                console.log("No se encontró información para esa sucursal.");
              }
            } catch (error) {
              console.error("Error al buscar ventas por sucursal:", error);
            }
            break;
           
          case 'c':
            // Agregar código para actualizar el nombre de un pan
            const nombreActual = readlineSync.question("Ingrese el nombre actual del pan que desea actualizar: ");
            const nuevoNombre = readlineSync.question("Ingrese el nuevo nombre para el pan: ");
            
            try {
              // Buscar el pan por su nombre actual usando el modelo MenuDePanes
              const pan = await MenuDePanes.findOne({ nombre: nombreActual });
            
              if (pan) {
                // Actualizar el nombre del pan
                pan.nombre = nuevoNombre;
            
                // Guardar los cambios en la base de datos usando el método save() del documento Mongoose
                const resultado = await pan.save();
            
                console.log(`Nombre del pan actualizado correctamente. Nuevo nombre: ${resultado.nombre}`);
              } else {
                console.log(`No se encontró ningún pan con el nombre "${nombreActual}".`);
              }
            } catch (error) {
              console.error("Error al actualizar el nombre del pan:", error);
            }

            case 'd':
            // Agregar código para actualizar el nombre de un pan
            const nombreActualSucursal = readlineSync.question("Ingrese el nombre actual de la sucursal que desea actualizar: ");
            const nuevoNombreSucursal = readlineSync.question("Ingrese el nuevo nombre para la sucursal: "); 
            
            try {
              // Buscar el pan por su nombre actual usando el modelo MenuDePanes
              await mongoose.connection.collection("ventasDePanes").updateOne({nombreSucursal: nombreActualSucursal}, {$set: {nombreSucursal: nuevoNombreSucursal}});
            
              
            } catch (error) {
              console.error("Error al actualizar el nombre del pan:", error);
            }
            ////////////////////////////

            break;
          case 'e':
            // Agregar un pan al menú
            const nombre = readlineSync.question("Ingrese el nombre del nuevo pan: ");
            const precio = readlineSync.questionFloat("Ingrese el precio del nuevo pan: ");
            const descripcion = readlineSync.question("Ingrese la descripcion del nuevo pan: ");
            try {
              const nuevoPan = new MenuDePanes({ nombre: nombre, precio: precio, descripcion: descripcion});
              await nuevoPan.save();
              console.log("Nuevo pan agregado al menú:", nuevoPan);
            } catch (error) {
              console.error("Error al agregar nuevo pan al menú:", error);
            }

            break;
          case 'f':
                // Quitar un pan del menú
                const paaan = readlineSync.question(`Dime el pan a quitar: `);
                const result = await mongoose.connection.collection("menudepanes").find({nombre: paaan}).toArray();
                // console.log(paaan)
                // console.log(result)
              
                if (result.length > 0) {
                // Crear un array de ObjectIds a partir de los panes encontrados
                  const panId = (result[0]._id).toString();

                //  Consulta para encontrar los documentos basados en los ObjectIds
                  await mongoose.connection.collection("menudepanes").deleteOne({_id: new ObjectId(panId)});
                  await mongoose.connection.collection("ventasDePanes").updateMany({}, { $pull: { panesVendidos: { _id: new ObjectId(panId) } } });
                } else {
                  console.log("No se encontraron datos válidos para el pan especificado.");
                }              

            break;
          case 'g':
            console.log("Ha salido");
            return;
          default:
            console.log("Opción no válida. Intente de nuevo.");
        }
      }
    }
    iniciarMenu().then(() => mongoose.disconnect());
  })
  .catch((error) => {
    console.error("Error en la conexión a MongoDB:", error);
  });
