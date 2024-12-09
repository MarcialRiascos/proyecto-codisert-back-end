const db = require('../config/db');

const beneficiaryController = {
  async registerBeneficiary(req, res) {
    const {
      Nombre,
      Apellido,
      TipoDocumento_idTipoDocumento,
      NumeroDocumento,
      Telefono,
      Celular,
      Correo,
      Estrato,
      FechaInicio,
      FechaFin,
      CodigoDaneDpmto,
      CodigoDaneMunicipio,
      Departamento,
      Municipio,
      Direccion,
      Barrio,
      Anexo,
      Estado_idEstado,
      Estrato_idEstrato,
    } = req.body;
  
    const idAdministrador = req.user.id; // ID del administrador activo (extraído del middleware de autenticación)
  
    // Validar campos obligatorios
    if (
      !Nombre || !Apellido || !TipoDocumento_idTipoDocumento || !NumeroDocumento ||
      !Correo || !Estrato || !FechaInicio || !CodigoDaneDpmto || !CodigoDaneMunicipio ||
      !Direccion || !Estado_idEstado || !Estrato_idEstrato
    ) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados' });
    }
  
    try {
      // Verificar si el NumeroDocumento ya está registrado con estado_idEstado = 1 (activo)
      const [existingBeneficiary] = await db.execute(
        `SELECT * FROM beneficiario WHERE NumeroDocumento = ? AND Estado_idEstado = 1`,
        [NumeroDocumento]
      );
  
      if (existingBeneficiary.length > 0) {
        return res.status(400).json({
          message: 'El Número de Documento ya está registrado con un beneficiario activo.',
        });
      }
  
      // Insertar el beneficiario en la base de datos, incluyendo los nuevos campos
      const [result] = await db.execute(
        `INSERT INTO beneficiario 
        (Nombre, Apellido, TipoDocumento_idTipoDocumento, NumeroDocumento, Telefono, Celular, Correo, Estrato, 
        FechaInicio, FechaFin, CodigoDaneDpmto, CodigoDaneMunicipio, Departamento, Municipio, Direccion, Barrio, Anexo, 
        Estado_idEstado, Estrato_idEstrato, Administrador_idAdministrador)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          Nombre,
          Apellido,
          TipoDocumento_idTipoDocumento,
          NumeroDocumento,
          Telefono || null,  // Campo opcional
          Celular || null,   // Campo opcional
          Correo,
          Estrato,
          FechaInicio,
          FechaFin || null,  // Campo opcional
          CodigoDaneDpmto,
          CodigoDaneMunicipio,
          Departamento || null,  // Campo opcional
          Municipio || null,     // Campo opcional
          Direccion,
          Barrio || null,        // Campo opcional
          Anexo || null,         // Campo opcional
          Estado_idEstado,
          Estrato_idEstrato,
          idAdministrador,       // Administrador que está creando el beneficiario
        ]
      );
  
      res.status(201).json({
        message: 'Beneficiario registrado exitosamente',
        newBeneficiaryId: result.insertId,  // ID del beneficiario recién registrado
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Error al registrar el beneficiario',
        error: err.message,
      });
    }
  },

  async getAllBeneficiaries(req, res) {
    try {
      // Consulta todos los beneficiarios desde la base de datos
      const [beneficiaries] = await db.execute(
        `SELECT 
          idBeneficiario, Nombre, Apellido, TipoDocumento_idTipoDocumento, NumeroDocumento, Telefono, 
          Celular, Correo, Estrato, FechaInicio, FechaFin, CodigoDaneDpmto, CodigoDaneMunicipio, Departamento, 
          Municipio, Direccion, Barrio, Anexo, Estado_idEstado, Estrato_idEstrato, Administrador_idAdministrador 
         FROM beneficiario`
      );
  
      // Respuesta con la lista de beneficiarios
      res.status(200).json({
        message: 'Lista de beneficiarios obtenida exitosamente',
        data: beneficiaries,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Error al obtener la lista de beneficiarios',
        error: err.message,
      });
    }
  },

  async updateBeneficiary(req, res) {
    const {
      Nombre,
      Apellido,
      TipoDocumento_idTipoDocumento,
      NumeroDocumento,
      Telefono,
      Celular,
      Correo,
      Estrato,
      FechaInicio,
      FechaFin,
      CodigoDaneDpmto,
      CodigoDaneMunicipio,
      Departamento,
      Municipio,
      Direccion,
      Barrio,
      Anexo,
      Estado_idEstado,
      Estrato_idEstrato,
    } = req.body;
  
    const { id } = req.params; // ID del beneficiario a actualizar
  
    try {
      // Verificar si el beneficiario existe
      const [existingBeneficiary] = await db.execute(
        `SELECT * FROM beneficiario WHERE idBeneficiario = ?`,
        [id]
      );
  
      if (existingBeneficiary.length === 0) {
        return res.status(404).json({ message: 'Beneficiario no encontrado' });
      }
  
      // Verificar si el NumeroDocumento ya está registrado con Estado_idEstado = 1 en otro beneficiario
      const [conflictingBeneficiary] = await db.execute(
        `SELECT * FROM beneficiario 
         WHERE NumeroDocumento = ? AND Estado_idEstado = 1 AND idBeneficiario != ?`,
        [NumeroDocumento, id]
      );
  
      if (conflictingBeneficiary.length > 0) {
        return res.status(400).json({
          message: 'El Número de Documento ya está registrado con un beneficiario activo.',
        });
      }
  
      // Actualizar los datos del beneficiario
      await db.execute(
        `UPDATE beneficiario
         SET Nombre = ?, Apellido = ?, TipoDocumento_idTipoDocumento = ?, NumeroDocumento = ?, Telefono = ?, Celular = ?, Correo = ?, Estrato = ?, 
             FechaInicio = ?, FechaFin = ?, CodigoDaneDpmto = ?, CodigoDaneMunicipio = ?, Departamento = ?, Municipio = ?, Direccion = ?, 
             Barrio = ?, Anexo = ?, Estado_idEstado = ?, Estrato_idEstrato = ?
         WHERE idBeneficiario = ?`,
        [
          Nombre,
          Apellido,
          TipoDocumento_idTipoDocumento,
          NumeroDocumento,
          Telefono || null, // Campo opcional
          Celular || null,  // Campo opcional
          Correo,
          Estrato,
          FechaInicio,
          FechaFin || null, // Campo opcional
          CodigoDaneDpmto,
          CodigoDaneMunicipio,
          Departamento || null, // Campo opcional
          Municipio || null,    // Campo opcional
          Direccion,
          Barrio || null,       // Campo opcional
          Anexo || null,        // Campo opcional
          Estado_idEstado,
          Estrato_idEstrato,
          id,
        ]
      );
  
      res.status(200).json({ message: 'Beneficiario actualizado exitosamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Error al actualizar el beneficiario',
        error: err.message,
      });
    }
  },
};

module.exports = beneficiaryController;