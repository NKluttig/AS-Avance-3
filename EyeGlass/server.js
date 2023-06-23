const express = require('express');
const mongodb = require('mongodb');

// Configurar la conexión a la base de datos
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017'; // URL de conexión a tu base de datos MongoDB

// Crear una instancia de Express
const app = express();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Ruta de ejemplo para obtener todos los usuarios de la base de datos
app.get('/api/users', (req, res) => {
  MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
      return;
    }

    const db = client.db('nombre-de-la-base-de-datos'); // Reemplaza "nombre-de-la-base-de-datos" por el nombre de tu base de datos

    db.collection('usuarios')
      .find()
      .toArray((err, users) => {
        if (err) {
          console.error('Error al obtener los usuarios:', err);
          res.status(500).json({ error: 'Error al obtener los usuarios' });
          return;
        }

        res.json(users);
      });

    client.close();
  });
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
