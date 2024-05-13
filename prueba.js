const mongoose = require("mongoose");
const Venta = require('./VentaDePanes');
const Pan = require('./MenuDePanes');

// Supongamos que tienes IDs de panes existentes
const panesIds = ['66406fab549d3080597a8f6f', '66406fad549d3080597a8f71', '66406fad549d3080597a8f71']; // IDs de panes existentes

// Crea una nueva venta
const nuevaVenta = new Venta({
  nombreSucursal: "Panadería_WithHoney La Pastora",
    panesVendidos: panesIds // Asigna los IDs de panes existentes

});

// Guarda la venta en la base de datos
nuevaVenta.save()
  .then(venta => {
    console.log('Venta creada con éxito:', venta);
  })
  .catch(error => {
    console.error('Error al crear la venta:', error);
  });
