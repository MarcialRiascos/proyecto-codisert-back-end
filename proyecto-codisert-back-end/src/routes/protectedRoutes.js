const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/admin', authMiddleware('admin_super'), (req, res) => {
  res.status(200).json({ message: 'Acceso permitido para admin_super' });
});

router.get('/registrador', authMiddleware('admin_registrador'), (req, res) => {
  res.status(200).json({ message: 'Acceso permitido para admin_registrador' });
});

module.exports = router;