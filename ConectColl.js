console.log("Este apartado es para poder hacer las conexiones de manera manual de los panes con las ventas");

const nuevaVenta = new VentasDePanes({
    
    panesVendidos: [panId1, panId2, panId3], // Nombre panes
    //cantidad: 1,
    total: 20, // Suponiendo un total calculado
    fechaVenta: new Date()
  });
  
  await nuevaVenta.save();
  



  db.reservaciones.insertMany([
    {
      "nombre": "Tarta de Manzana",
      "categoria": "Postre",
      "dificultad": "Fácil",
      "ingredientes": [
        { "nombre": "Manzanas", "cantidad": "4 unidades" },
        { "nombre": "Harina", "cantidad": "200g" },
        { "nombre": "Azúcar", "cantidad": "150g" },
        { "nombre": "Mantequilla", "cantidad": "100g" },
        { "nombre": "Huevos", "cantidad": "2 unidades" }
      ],
      "pasos": ["Preparar la masa.", "Pelar y cortar las manzanas.", "Hornear a 180°C por 45 minutos."],
      "calificacion": 4.5
    }
])

