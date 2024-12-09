const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const beneficiaryMiddleware = require('../middleware/beneficiarMiddleware');
const genericMiddleware = require('../middleware/genericMiddleware');
const UserController = require('../controllers/registerAdminController');
const UsarController = require('../controllers/registerBeneficiaryController');
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
router.get('/admins', authMiddleware('admin_super'), UserController.getAllAdmins);
router.put('/admin/:id', authMiddleware('admin_super'), UserController.updateAdmin);
router.delete('/manage/:id', authMiddleware('admin_super'), UserController.deleteAdmin);

router.post('/beneficiary/register', beneficiaryMiddleware(['admin_registrador', 'admin_super']), UsarController.registerBeneficiary);
router.get('/beneficiary/all', genericMiddleware(), UsarController.getAllBeneficiaries);
router.put('/beneficiary/:id', beneficiaryMiddleware(['admin_registrador', 'admin_super']), UsarController.updateBeneficiary);
router.delete('/manage/beneficiary/:id', authMiddleware(), UsarController.deleteBeneficiary);




module.exports = router;