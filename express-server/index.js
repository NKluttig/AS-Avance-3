const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // Added multer for file upload
//const upload = multer({ dest: 'upload/' }); // Create multer instance
const app = express();
const User = require('./models/ReactDataSchema');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://kluttio:123@cluster0.c15wod3.mongodb.net/', { useNewUrlParser: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Directorio de destino donde se guardarán los archivos adjuntos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre de archivo original
  }
});

const upload = multer({ storage: storage });


  // Después de obtener los operativos encontrados
    

app.post('/insert', upload.single("pdf"), async (req, res) => {
  const Nombre = req.body.Nombre;
  const CompanyRole = req.body.companyRole;
  const Apellido = req.body.Apellido;
  const Edad = req.body.Edad;
  const Rut = req.body.Rut;
  const TipoLente = req.body.TipoLente;
  const Fecha = req.body.Fecha;
  const idOperativo = req.body.idOperativo; // Agregar idOperativo

  console.log(Nombre, CompanyRole, Apellido, Edad, Rut, TipoLente,idOperativo);

  const formData = new User({
    nombre: Nombre,
    role: CompanyRole,
    apellido: Apellido,
    edad: Edad,
    rut: Rut,
    tipoLente: TipoLente,
    fecha: Fecha,
    //pdf: req.file.buffer.toString('base64'), // Store file data as base64 string
    idOperativo: idOperativo, 
  });

  try {
    await formData.save();
    res.send('inserted data..');
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

function exportToCsv(operativos) {
    const csvWriter = createCsvWriter({
      path: 'operativos.csv',
      header: [
        { id: 'idOperativo', title: 'ID Operativo' },
        { id: 'nombre', title: 'Nombre' },
        { id: 'apellido', title: 'Apellido' },
        { id: 'edad', title: 'Edad' },
        { id: 'rut', title: 'RUT' },
        { id: 'role', title: 'Company Role' },
        { id: 'tipoLente', title: 'Tipo de Lente' },
        { id: 'fecha', title: 'Fecha' },
      ],
    });
  
    const records = operativos.map((operativo) => {
      return {
        idOperativo: operativo.idOperativo,
        nombre: operativo.nombre,
        apellido: operativo.apellido,
        edad: operativo.edad,
        rut: operativo.rut,
        role: operativo.role,
        tipoLente: operativo.tipoLente,
        fecha: operativo.fecha ? operativo.fecha.toString() : '', // Asegúrate de convertir la fecha a una cadena de texto
      };
    });
  
    csvWriter
      .writeRecords(records)
      .then(() => console.log('Datos exportados a operativos.csv'))
      .catch((error) => console.error('Error al exportar datos:', error));
  }
  

app.get('/operativos/:id', async (req, res) => {
    const idOperativo = req.params.id;
    try {
      const operativos = await User.find({ idOperativo: idOperativo });
      res.json(operativos);
      exportToCsv(operativos);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error al obtener los operativos' });
    }
  });
  



