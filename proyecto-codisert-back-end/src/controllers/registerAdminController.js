const bcrypt = require('bcrypt');
const db = require('../config/db');

const registerAdminController = {
  async registerAdmin(req, res) {
    const { Nombre, Apellido, TipoDocumento_idTipoDocumento, NumeroDocumento, Telefono, Correo, Password, Estado_idEstado, Rol_idRol } = req.body;
    const idAdministrador = req.user.id; // ID del usuario que está haciendo el registro (usuario con sesión activa)
  
    // Validar datos de entrada
    if (!Nombre || !Apellido || !TipoDocumento_idTipoDocumento || !NumeroDocumento || !Correo || !Password || !Estado_idEstado || !Rol_idRol) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
  
    try {
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(Password, 10);

      // Insertar el nuevo administrador en la base de datos
      const [result] = await db.execute(
        `INSERT INTO administrador (Nombre, Apellido, TipoDocumento_idTipoDocumento, NumeroDocumento, Telefono, Correo, Password, Estado_idEstado, Rol_idRol, Administrador_idAdministrador)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [Nombre, Apellido, TipoDocumento_idTipoDocumento, NumeroDocumento, Telefono, Correo, hashedPassword, Estado_idEstado, Rol_idRol, idAdministrador]
      );
  
      res.status(201).json({
        message: 'Administrador registrado exitosamente',
        newAdminId: result.insertId, // ID del nuevo administrador insertado
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al registrar el administrador', error: err.message });
    }
  },
};

module.exports = registerAdminController;