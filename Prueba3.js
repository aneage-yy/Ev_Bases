const readlineSync = require("readline-sync");
const mongoose = require("mongoose");


const MenuDePanes = require("./menuDePanes"); 
mongoose.connect("mongodb://localhost:27017/Panadería_withHoney", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Conexión exitosa a MongoDB");

    async function iniciarMenu() {
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
            // Agregar código para buscar ventas por nombre de sucursal
              const sucursal_solicitada = readlineSync.question(`Dime la sucursal a buscar: `);
                try {
                  const cursor = await mongoose.connection.collection("ventasDePanes").find({ nombreSucursal: sucursal_solicitada });
                  const result = await cursor; // Convertir el cursor a un array de documentos
              
                  if (result.length > 0) {
                    // Iterar sobre cada documento encontrado en el resultado
                    console.log("dummy");
                    result.forEach((venta) => {
                      console.log("De la sucursal:", venta.nombreSucursal, );
                      console.log("Fecha de la venta:", venta.fechaVenta);
                      console.log("Los panes vendidos de esta sucursal son: :", venta.panesVendidos);
                      console.log("--------------");
                    });
                  } else {
                    console.log("No se encontró información para esa sucursal.");
                  }
                } catch (error) {
                  console.error("Error la venta panes por sucursal:", error);
                }
                
            
            break;
          case 'c':
            // Buscar información de la venta por nombre de pan




            break;
          case 'd':
            // Agregar código para actualizar el nombre de un pan


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
                console.log(paaan)
                console.log(result)
              
                if (result.length > 0) {
                  // Crear un array de ObjectIds a partir de los panes encontrados
                  const panId =  result._id;
                  console.log("AAAAAAAAAAAAAAAA")
                //   console.log(array_panes)
              
                  // Consulta para encontrar los documentos basados en los ObjectIds
                  const panesEncontrados = await mongoose.connection.collection("ventasDePanes").find({ _id: { $in: panId } }).toArray();
                  console.log("BBBBBBBBBBBBBBBB")
              
                  console.log("Panes encontrados:", panesEncontrados);
                } else {
                  console.log("No se encontraron datos válidos para el pan especificado.");
                }              

 /** 
            // Quitar un pan del menú
            const paaan = readlineSync.question(`Dime el pan a quitar: `);
            result = await mongoose.connection.collection("menuDePanes").find({ nombre: paaan }).toArray();

            // Creates an array of ingredients, based on its id
            let array_panes = []; // Declaración de un array vacío

            for (let panes_1 of result[0].array_panes) {
                array_panes.push(new ObjectId(panes_1._id.$oid));
            }
            result = awaitmongoose.connection.collection("menuDePanes").find({ _id: { $in: array_panes } }).toArray();

            // Changes the main collection to search all the ingredients
            //myCollection = myDatabase.collection(`Ingredientes`);

//hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee


            /** 
            result = await myCollection.find({ _id: { $in: array_panes } }).toArray();


            const nombrePan = readlineSync.question("Dime el nombre del pan a eliminar: ");
            try {
                const pan = await MenuDePanes.find({ nombre: nombrePan }).toArray();
                if (!pan) {
                console.log("No se encontró ningún pan con ese nombre en el menú.");
                return;
                }
                const panId = pan._id;

                // ventas again
                const updateResult = await VentasDePanes.updateMany(
                { panesVendidos: panId },
                { $pull: { panesVendidos: panId } }
                );

                console.log(`Referencias del pan '${nombrePan}' eliminadas de las ventas asociadas.`);
                
                // quitar el pan del menu
                const panEliminado = await MenuDePanes.findOneAndDelete({ _id: panId });
                if (panEliminado) {
                console.log("Pan eliminado del menú:", panEliminado);
                } else {
                console.log("No se pudo eliminar el pan del menú.");
                }

            } catch (error) {
                console.error("Error al quitar pan del menú:", error);
            }
*/
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
