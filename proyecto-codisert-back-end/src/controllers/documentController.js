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

module.exports = { uploadDocument };