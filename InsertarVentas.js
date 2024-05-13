const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const MenuDePanes = require("./menuDePanes"); 
  
// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/Panadería_withHoney", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {

    // aqui metes un insertMany
    let result = await mongoose.connection.collection("ventasDePanes").insertMany([
        {
            nombreSucursal: "Panadería_withHoney Contry Sol",
            fechaVenta: "15/05/24",
            panesVendidos:  [
                {_id: new ObjectId("66406fab549d3080597a8f6f")}, //roles de miel
                {_id: new ObjectId("66406fad549d3080597a8f72")}, //de chocolate
                {_id: new ObjectId("66406fad549d3080597a8f74")}// cupcake de red velvet

            ]
        },
        {
            nombreSucursal: "Panadería_withHoney Las Brisas",
            fechaVenta: "15/05/24",
            panesVendidos:  [
                
                {_id: new ObjectId("66406fad549d3080597a8f72")}, //de chocolate
                {_id: new ObjectId("66406fad549d3080597a8f73")} //queso crema

            ]
        },
        {
            nombreSucursal: "Panadería_withHoney La Luz",
            fechaVenta: "20/06/24",

            panesVendidos:  [
                {_id: new ObjectId("66406fab549d3080597a8f6f")}, //roles de miel 
                {_id: new ObjectId("66406fad549d3080597a8f71")}, //de fresa
                {_id: new ObjectId("66406fad549d3080597a8f72")}, //de chocolate
                {_id: new ObjectId("66406fad549d3080597a8f73")}, //queso crema
                {_id: new ObjectId("66406fad549d3080597a8f74")}, //cupcake de red velvet
                {_id: new ObjectId("66406fad549d3080597a8f75")} //queso mozarella
            ]
        },
        {
            nombreSucursal: "Panadería_withHoney Las Brisas",
            fechaVenta: "01/07/24",
            panesVendidos:  [
                {_id: new ObjectId("66406fad549d3080597a8f73")}, //Pan relleno de queso crema
                {_id: new ObjectId("66406fad549d3080597a8f75")}, //queso mozarella
                {_id: new ObjectId("66406fad549d3080597a8f71")} //de fresa
                
            ]
        }
    ]);
    console.log(result);


    // // Insertar un solo documento (tipo de pan)
    // const pan1 = await MenuDePanes.create({
    //   nombre: "Roles de miel",
    //   descripcion: "Roles esponjosos, masa tipo brioche con relleno de miel, capeados con azúcar glass y canela ",
      
    // });

  })
