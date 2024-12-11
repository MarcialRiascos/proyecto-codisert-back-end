const express = require('express');
const { uploadDocument } = require('../controllers/documentController');
const  UsarController  = require('../controllers/documentController');
const upload = require('../middleware/uploadMiddleware'); // Middleware para cargar archivos
const authMiddleware = require('../middleware/beneficiarMiddleware'); // Middleware para cargar archivos

const router = express.Router();

// Ruta para cargar documentos (usamos el middleware de multer)
router.post('/upload',  authMiddleware(['admin_super', 'admin_registrador']), upload.single('document'), uploadDocument);
router.get('/all', authMiddleware(['admin_super', 'admin_registrador']), UsarController.getAllDocuments);

module.exports = router;