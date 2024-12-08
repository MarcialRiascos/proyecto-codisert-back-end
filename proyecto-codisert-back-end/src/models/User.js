const db = require('../config/db');

const User = {
  async findByDocument(NumeroDocumento) {
    const [rows] = await db.execute('SELECT * FROM administrador WHERE NumeroDocumento = ?', [NumeroDocumento]);
    return rows[0];
  },
  async getRoleById(idRol) {
    const [rows] = await db.execute('SELECT * FROM rol WHERE idRol = ?', [idRol]);
    return rows[0];
  },
};

module.exports = User;