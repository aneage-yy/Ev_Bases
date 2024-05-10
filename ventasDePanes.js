const mongoose = require("mongoose");

const ventasDePanesSchema = new mongoose.Schema({
  nombrePanes: { type: String, required: true },
  cantidad: { type: Number, required: true },
  total: { type: Number, required: true },
  fechaVenta: { type: Date, default: Date.now }
});

const VentasDePanes = mongoose.model("VentasDePanes", ventasDePanesSchema);

module.exports = VentasDePanes;
