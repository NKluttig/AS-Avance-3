const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  rut: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 10
  },
  role: {
    type: String,
    required: true
  },
  tipoLente: {
    type: String,
    enum: ['Astigmatismo', 'Miopia', 'Ambos'],
    required: true
  },
  fecha: {
    type: Date,
    requeried:true
  },
  pdf: {
    type: String, // or Buffer if you want to store the file data directly
    required: false
  },
  idOperativo: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', ReactFormDataSchema);

module.exports = User;
