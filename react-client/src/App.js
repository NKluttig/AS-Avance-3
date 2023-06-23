import './App.css';
import React, { useState } from 'react';
import Axios from 'axios';
import { saveAs } from 'file-saver'

function App() {
  const [nombre, setNombre] = useState('');
  const [role, setRole] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [rut, setRut] = useState('');
  const [tipoLente, setTipoLente] = useState('');
  const [fecha, setFecha] = useState('');
  const [pdfFile, setPdfFile] = useState(null); // Add state for the PDF file
  const [idOperativo, setIdOperativo] = useState(''); // Add state for idOperativo


  const [buscarOperativo, setBuscarOperativo] = useState("");
  const [operativosEncontrados, setOperativosEncontrados] = useState([]);


  const handleBuscarOperativo = () => {
    Axios.get(`http://localhost:4000/operativos/${buscarOperativo}`)
      .then((response) => {
        console.log(response.data);
        setOperativosEncontrados(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los operativos:', error);
      });
  };
  // Convert array of objects to CSV string
  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map((item) => Object.values(item).join(','));
    return `${header}\n${rows.join('\n')}`;
  };
  const handleExportCSV = () => {
    const csvData = convertToCSV(operativosEncontrados); // Convert operativos to CSV string

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'operativos.csv'); // Trigger file download

    // Alternatively, you can use the following code to open the CSV file in a new browser tab instead of downloading it
    // const url = URL.createObjectURL(blob);
    // window.open(url, '_blank');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    Axios.post('http://localhost:4000/insert', {
      Nombre: nombre,
      Apellido: apellido,
      companyRole: role,
      Edad: edad,
      Rut: rut,
      TipoLente: tipoLente,
      Fecha: fecha,
      idOperativo: idOperativo, // Add idOperativo to the request body
    })
      .then(() => {
        // Once the form data is submitted, upload the PDF file
        Axios.post('http://localhost:4000/upload', formData)
          .then(() => {
            console.log('PDF uploaded successfully');
          })
          .catch((error) => {
            console.error('Error uploading PDF:', error);
          });
      })
      .catch((error) => {
        console.error('Error submitting form data:', error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logIn-form">
        <img src="https://cdn.discordapp.com/attachments/1091165133948076107/1121669389066977350/image.png" alt="Imagen" />
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <p>Nombre</p>
            <input
              className="Name"
              type="text"
              name="nombre"
              placeholder="Nombre ..."
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
            <p>Apellido</p>
            <input
              className="Apellido"
              type="text"
              name="Apellido"
              placeholder="Apellido..."
              onChange={(e) => {
                setApellido(e.target.value);
              }}
            />
            <p> Edad</p>
            <input
              className="Edad"
              type="text"
              name="Edad"
              placeholder="Edad...."
              onChange={(e) => {
                setEdad(e.target.value);
              }}
            />
            <p> RUT</p>
            <input
              className="RUT"
              type="text"
              name="Rut"
              placeholder="12345678-9"
              onChange={(e) => {
                setRut(e.target.value);
              }}
            />
            <p> Company Role</p>
            <input
              className="Role"
              type="text"
              name="Role"
              placeholder="Role...."
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
            <p>Tipo de Lente</p> {/* Added Tipo de Lente field */}
            <select
              className="TipoLente"
              name="TipoLente"
              onChange={(e) => {
                setTipoLente(e.target.value);
              }}
            >
              <option value="">Seleccione una opción</option>
              <option value="Astigmatismo">Astigmatismo</option>
              <option value="Miopia">Miopia</option>
              <option value="Ambos">Ambos</option>
            </select>
            <p>Fecha</p>
            <input
              className="Fecha"
              type="date"
              name="Fecha"
              onChange={(e) => {
                setFecha(e.target.value);
              }}
            />
            <p>PDF</p>
            <input
              className="PDF"
              type="file"
              name="pdf"
              onChange={handleFileChange}
            />
            <p>ID Operativo</p> {/* Added ID Operativo field */}
            <input
              className="IdOperativo"
              type="text"
              name="idOperativo"
              placeholder="ID Operativo..."
              onChange={(e) => {
                setIdOperativo(e.target.value);
              }}
            />

            
            <button type="submit">Submit</button>

            <br></br>
            
            <p>Buscar Operativo</p>
            <input
              className="BuscarOperativo"
              type="text"
              name="BuscarOperativo"
              placeholder="Buscar Operativo..."
              onChange={(e) => {
                setBuscarOperativo(e.target.value);
              }}
            />
            <button type="button" onClick={handleBuscarOperativo}>Buscar Operativo</button>
            
          </form>
        </div>
        {operativosEncontrados.length > 0 && (
  <div>
    <img src="https://cdn.discordapp.com/attachments/1091165133948076107/1121669389066977350/image.png" alt="Imagen" />
    <h2>Operativos Encontrados:</h2>
    <table>
      <thead>
        <tr>
          <th>ID Operativo</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>RUT</th>
          <th>Tipo de Lente</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {operativosEncontrados.map((operativo) => (
          <tr key={operativo._id}>
            <td>{operativo.idOperativo}</td>
            <td>{operativo.nombre}</td>
            <td>{operativo.apellido}</td>
            <td>{operativo.edad}</td>
            <td>{operativo.rut}</td>
            <td>{operativo.tipoLente}</td>
            <td>{operativo.fecha}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button type="button" onClick={handleExportCSV}>Exportar CSV</button>
  </div>
)}

      </header>
    </div>
  );
}

export default App;
