const pool = require('../config/db'); // Conexión a la base de datos
const path = require('path');

// Función para cargar un documento
const uploadDocument = async (req, res) => {
  try {
    // Verificar que se haya cargado un archivo
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha cargado ningún archivo' });
    }

    // Recibir los datos del archivo y los datos adicionales
    const { NombreDocumento, TipoDocumento, Beneficiario_idBeneficiario, Administrador_idAdministrador } = req.body;
    const fileUrl = path.join('uploads', req.file.filename); // Ruta del archivo guardado

    // Insertar en la base de datos
    const [result] = await pool.execute(
      'INSERT INTO documentos (NombreDocumento, TipoDocumento, Url, Beneficiario_idBeneficiario, Administrador_idAdministrador) VALUES (?, ?, ?, ?, ?)',
      [NombreDocumento, TipoDocumento, fileUrl, Beneficiario_idBeneficiario, Administrador_idAdministrador]
    );

    res.status(201).json({
      message: 'Documento cargado exitosamente',
      document: {
        id: result.insertId,
        NombreDocumento,
        TipoDocumento,
        Url: fileUrl,
        Beneficiario_idBeneficiario,
        Administrador_idAdministrador
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al cargar el documento', error: err.message });
  }
};


const getAllDocuments = async (req, res) => {
  try {
    // Consultar todos los documentos de la base de datos
    const [rows] = await pool.execute('SELECT * FROM documentos');

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No hay documentos registrados' });
    }

    res.status(200).json({
      message: 'Documentos encontrados',
      documents: rows
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los documentos', error: err.message });
  }
};

module.exports = { uploadDocument, getAllDocuments };