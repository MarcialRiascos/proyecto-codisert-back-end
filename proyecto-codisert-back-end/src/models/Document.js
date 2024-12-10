const pool = require('../config/db');

// Función para obtener todos los documentos
const getAllDocuments = async () => {
  const [rows] = await pool.execute('SELECT * FROM documentos');
  return rows;
};

// Función para obtener un documento por ID
const getDocumentById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM documentos WHERE idDocumentos = ?', [id]);
  return rows[0];
};

module.exports = { getAllDocuments, getDocumentById };