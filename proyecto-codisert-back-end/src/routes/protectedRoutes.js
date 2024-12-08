const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const UserController = require('../controllers/registerAdminController');


const router = express.Router();

router.get('/admin', authMiddleware('admin_super'), (req, res) => {
  res.status(200).json({ message: 'Acceso permitido para admin_super' });
});

router.get('/registrador', authMiddleware('admin_registrador'), (req, res) => {
  res.status(200).json({ message: 'Acceso permitido para admin_registrador' });
});

router.get('/lector', authMiddleware('admin_lector'), (req, res) => {
  res.status(200).json({ message: 'Acceso permitido para admin_lector' });
});

router.post('/register', authMiddleware('admin_super'), UserController.registerAdmin);

router.put('/admin/:id', authMiddleware('admin_super'), UserController.updateAdmin);


module.exports = router;