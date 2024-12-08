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

  async updateAdmin(req, res) {
    const { id } = req.params; // ID del administrador a modificar
    const {
      Nombre,
      Apellido,
      TipoDocumento_idTipoDocumento,
      NumeroDocumento,
      Telefono,
      Correo,
      Password,
      Estado_idEstado,
      Rol_idRol,
    } = req.body;

    const idAdministradorActivo = req.user.id; // ID del usuario con sesión activa

    try {
      // Verificar que el usuario tiene rol admin_super
      if (req.user.role !== 'admin_super') {
        return res.status(403).json({ message: 'No autorizado para realizar esta acción' });
      }

      // Encriptar la contraseña si es proporcionada
      let hashedPassword = null;
      if (Password) {
        hashedPassword = await bcrypt.hash(Password, 10);
      }

      // Generar la consulta de actualización dinámica
      const fields = [];
      const values = [];
      
      if (Nombre) { fields.push('Nombre = ?'); values.push(Nombre); }
      if (Apellido) { fields.push('Apellido = ?'); values.push(Apellido); }
      if (TipoDocumento_idTipoDocumento) { fields.push('TipoDocumento_idTipoDocumento = ?'); values.push(TipoDocumento_idTipoDocumento); }
      if (NumeroDocumento) { fields.push('NumeroDocumento = ?'); values.push(NumeroDocumento); }
      if (Telefono) { fields.push('Telefono = ?'); values.push(Telefono); }
      if (Correo) { fields.push('Correo = ?'); values.push(Correo); }
      if (hashedPassword) { fields.push('Password = ?'); values.push(hashedPassword); }
      if (Estado_idEstado) { fields.push('Estado_idEstado = ?'); values.push(Estado_idEstado); }
      if (Rol_idRol) { fields.push('Rol_idRol = ?'); values.push(Rol_idRol); }

      // Actualizamos el campo Administrador_idAdministrador con el ID del administrador activo
      fields.push('Administrador_idAdministrador = ?');
      values.push(idAdministradorActivo);

      // Añadir ID del administrador que se está modificando
      values.push(id);

      // Ejecutar la consulta
      const query = `UPDATE administrador SET ${fields.join(', ')} WHERE idAdministrador = ?`;
      const [result] = await db.execute(query, values);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Administrador no encontrado' });
      }

      res.status(200).json({ message: 'Administrador actualizado exitosamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al actualizar el administrador', error: err.message });
    }
  },

  async deleteAdmin(req, res) {
    const { id } = req.params; // ID del administrador a eliminar

    try {
      // Verificar que el usuario tiene rol admin_super
      if (req.user.role !== 'admin_super') {
        return res.status(403).json({ message: 'No autorizado para realizar esta acción' });
      }

      // Evitar que el admin_super se elimine a sí mismo
      if (req.user.id === parseInt(id, 10)) {
        return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta' });
      }

      // Verificar si el administrador a eliminar existe
      const [admin] = await db.execute('SELECT * FROM administrador WHERE idAdministrador = ?', [id]);
      if (admin.length === 0) {
        return res.status(404).json({ message: 'Administrador no encontrado' });
      }

      // Eliminar el administrador
      const [result] = await db.execute('DELETE FROM administrador WHERE idAdministrador = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'No se pudo eliminar el administrador, puede que no exista' });
      }

      res.status(200).json({ message: 'Administrador eliminado exitosamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al eliminar el administrador', error: err.message });
    }
  },
};

module.exports = registerAdminController;