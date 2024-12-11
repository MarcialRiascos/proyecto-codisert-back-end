const pool = require('../config/db'); // Conexión a la base de datos
const path = require('path');
const fs = require('fs').promises; 

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

const getDocumentsByBeneficiary = async (req, res) => {
  try {
    const { idBeneficiario } = req.params;

    // Consultar los documentos relacionados con el beneficiario específico
    const [rows] = await pool.execute(
      'SELECT * FROM documentos WHERE Beneficiario_idBeneficiario = ?',
      [idBeneficiario]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron documentos para este beneficiario' });
    }

    res.status(200).json({
      message: 'Documentos encontrados',
      documents: rows
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los documentos', error: err.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { idDocumentos } = req.params;

    // Verificar que idDocumentos no sea undefined o null
    if (!idDocumentos) {
      return res.status(400).json({ message: 'El parámetro idDocumentos es obligatorio' });
    }

    // Consultar el documento para obtener la URL del archivo
    const [rows] = await pool.execute('SELECT Url FROM documentos WHERE idDocumentos = ?', [idDocumentos]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    const filePath = rows[0].Url;

    // Verificar que filePath no sea undefined o null
    if (!filePath) {
      return res.status(400).json({ message: 'La URL del archivo no está disponible' });
    }

    // Intentar eliminar el archivo del sistema de archivos
    try {
      await fs.unlink(filePath); // Usamos fs.promises.unlink para eliminar el archivo
    } catch (err) {
      console.error(`Error al eliminar el archivo: ${filePath}`, err);
      // Si ocurre un error al eliminar el archivo, devolvemos un error, pero seguimos con la eliminación en la base de datos
    }

    // Eliminar el documento de la base de datos
    await pool.execute('DELETE FROM documentos WHERE idDocumentos = ?', [idDocumentos]);

    res.status(200).json({ message: 'Documento eliminado exitosamente' });
  } catch (err) {
    console.error('Error al eliminar el documento:', err); // Más detalles de error
    res.status(500).json({ message: 'Error al eliminar el documento', error: err.message });
  }
};
module.exports = { uploadDocument, getAllDocuments, getDocumentsByBeneficiary, deleteDocument };