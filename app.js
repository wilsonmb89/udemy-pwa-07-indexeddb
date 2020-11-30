// indexedDB: Reforzamiento

let req = window.indexedDB.open('db-udemy', 1);

// Se actualiza cuando se crea o se sube de version de la DB
req.onupgradeneeded = event => {
  console.log('Actualizacion de BD');

  let db = event.target.result;
  db.createObjectStore('heroes', {
    keyPath: 'id'
  });
};

// Manejo de errores
req.onerror = event => {
  console.error('DB Error:', event.target.error);
};

// Insertar datos
req.onsuccess = event => {
  let db = event.target.result;

  let heroesData = [
    { id: '1', heroe: 'Spiderman', mensaje: 'Aquí su vecino Spiderman' },
    { id: '2', heroe: 'Ironman', mensaje: 'Aquí en mi nuevo mark 50' }
  ];

  let heroesTransaction = db.transaction('heroes', 'readwrite');

  heroesTransaction.onerror = event => {
    console.error('Error guardando:', event.target.error);
  };

  //Informa sobre el exito de la transaccion
  heroesTransaction.oncomplete = event => {
    console.log('Transaccion realizada con exito', event);
  };

  let heroesStore = heroesTransaction.objectStore('heroes');
  
  heroesData.forEach(
    heroe => {
      heroesStore.add(heroe);
    }
  );

  heroesStore.onsuccess = event => {
    console.log('Nuevo heroe almacenado en la base de datos', event);
  };
};