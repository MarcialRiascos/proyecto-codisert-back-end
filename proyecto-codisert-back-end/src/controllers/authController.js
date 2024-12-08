const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const authController = {
  async login(req, res) {
    const { NumeroDocumento, Password } = req.body;

    try {
      // Buscar usuario por documento
      const user = await User.findByDocument(NumeroDocumento);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

      // Verificar si el usuario está activo
      if (user.Estado_idEstado !== 1) {
        return res.status(403).json({ message: 'El usuario no está activo' });
      }

      // Validar contraseña
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

      // Obtener el rol del usuario
      const role = await User.getRoleById(user.Rol_idRol);

      // Generar token
      const token = jwt.sign(
        { id: user.idAdministrador, role: role.Rol },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Enviar respuesta al frontend
      res.status(200).json({ 
        message: 'Inicio de sesión exitoso', 
        token, 
        role: role.Rol,
        user: { id: user.idAdministrador, name: user.Nombre, email: user.Correo },
      });
    } catch (err) {
      res.status(500).json({ message: 'Error interno del servidor', error: err.message });
    }
  },
};

module.exports = authController;