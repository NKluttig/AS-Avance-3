const sqlite3 = require('sqlite3').verbose();

// Crear una nueva instancia de la base de datos en memoria
const db = new sqlite3.Database(':memory:');

// Crear la tabla de usuarios
db.serialize(() => {
  db.run(`
    CREATE TABLE usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_usuario TEXT NOT NULL,
      contrasena TEXT NOT NULL
    )
  `);

  // Insertar usuarios de ejemplo
  db.run(`
    INSERT INTO usuarios (nombre_usuario, contrasena)
    VALUES
      ('doctor', '1'),
      ('paciente', '2')
  `);
});

// Cerrar la conexión a la base de datos cuando ya no se necesite
db.close();
