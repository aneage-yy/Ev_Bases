
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema para la colección VentasDePanes
// const ventasDePanesSchema = new Schema({
//   nombreSucursal: String,
//   fechaVenta: { type: Date, default: Date.now },
//   panesVendidos: [{ type: Schema.Types.ObjectId, ref: 'MenuDePanes' }], // Referencia a la colección MenuDePanes
// });

// // Usa el esquema previamente creado
const VentasDePanes = mongoose.model("VentasDePanes", ventasDePanesSchema);

//module.exports = VentasDePanes;



// const Venta = require('./ventaDePanes');
const Pan = require('./menuDePanes');

// Supongamos que tienes IDs de panes existentes
const panesIds = ['66406fab549d3080597a8f6f', '66406fad549d3080597a8f71', '66406fad549d3080597a8f71']; // IDs de panes existentes

// Crea una nueva venta