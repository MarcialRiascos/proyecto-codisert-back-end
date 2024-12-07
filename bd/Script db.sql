CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Estado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Estado` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Estado` (
  `idEstado` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEstado`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Estrato`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Estrato` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Estrato` (
  `idEstrato` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Estrato` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEstrato`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Rol` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Rol` (
  `idRol` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TipoDocumento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`TipoDocumento` ;

CREATE TABLE IF NOT EXISTS `mydb`.`TipoDocumento` (
  `idTipoDocumento` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `TipoDocumento` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipoDocumento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Administrador`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Administrador` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Administrador` (
  `idAdministrador` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `TipoDocumento_idTipoDocumento` INT UNSIGNED NOT NULL,
  `NumeroDocumento` VARCHAR(45) NOT NULL,
  `Telefono` VARCHAR(45) NULL,
  `Correo` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Estado_idEstado` INT UNSIGNED NOT NULL,
  `Rol_idRol` INT UNSIGNED NOT NULL,
  `Administrador_idAdministrador` INT NULL,
  PRIMARY KEY (`idAdministrador`),
  INDEX `fk_Persona_Estado1_idx` (`Estado_idEstado` ASC) VISIBLE,
  INDEX `fk_Administrador_Rol1_idx` (`Rol_idRol` ASC) VISIBLE,
  INDEX `fk_Administrador_TipoDocumento1_idx` (`TipoDocumento_idTipoDocumento` ASC) VISIBLE,
  CONSTRAINT `fk_Persona_Estado10`
    FOREIGN KEY (`Estado_idEstado`)
    REFERENCES `mydb`.`Estado` (`idEstado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Administrador_Rol1`
    FOREIGN KEY (`Rol_idRol`)
    REFERENCES `mydb`.`Rol` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Administrador_TipoDocumento1`
    FOREIGN KEY (`TipoDocumento_idTipoDocumento`)
    REFERENCES `mydb`.`TipoDocumento` (`idTipoDocumento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Beneficiario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Beneficiario` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Beneficiario` (
  `idBeneficiario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellido` VARCHAR(45) NOT NULL,
  `TipoDocumento_idTipoDocumento` INT UNSIGNED NOT NULL,
  `NumeroDocumento` VARCHAR(45) NOT NULL,
  `Telefono` VARCHAR(45) NULL,
  `Celular` VARCHAR(45) NULL,
  `Correo` VARCHAR(45) NOT NULL,
  `Estrato` VARCHAR(45) NOT NULL,
  `FechaInicio` VARCHAR(45) NOT NULL,
  `FechaFin` VARCHAR(45) NULL,
  `CodigoDaneDpmto` VARCHAR(45) NOT NULL,
  `CodigoDaneMunicipio` VARCHAR(45) NOT NULL,
  `Direccion` VARCHAR(45) NOT NULL,
  `Barrio` VARCHAR(45) NULL,
  `Estado_idEstado` INT UNSIGNED NOT NULL,
  `Estrato_idEstrato` INT UNSIGNED NOT NULL,
  `Administrador_idAdministrador` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idBeneficiario`),
  INDEX `fk_Persona_Estado1_idx` (`Estado_idEstado` ASC) VISIBLE,
  INDEX `fk_Persona_Estrato1_idx` (`Estrato_idEstrato` ASC) VISIBLE,
  INDEX `fk_Beneficiario_Administrador1_idx` (`Administrador_idAdministrador` ASC) VISIBLE,
  INDEX `fk_Beneficiario_TipoDocumento1_idx` (`TipoDocumento_idTipoDocumento` ASC) VISIBLE,
  CONSTRAINT `fk_Persona_Estado1`
    FOREIGN KEY (`Estado_idEstado`)
    REFERENCES `mydb`.`Estado` (`idEstado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Persona_Estrato1`
    FOREIGN KEY (`Estrato_idEstrato`)
    REFERENCES `mydb`.`Estrato` (`idEstrato`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Beneficiario_Administrador1`
    FOREIGN KEY (`Administrador_idAdministrador`)
    REFERENCES `mydb`.`Administrador` (`idAdministrador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Beneficiario_TipoDocumento1`
    FOREIGN KEY (`TipoDocumento_idTipoDocumento`)
    REFERENCES `mydb`.`TipoDocumento` (`idTipoDocumento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Dcumentos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Dcumentos` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Dcumentos` (
  `idDocumentos` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `NombreDocumento` VARCHAR(45) NOT NULL,
  `TipoDocumento` VARCHAR(45) NOT NULL,
  `Url` VARCHAR(45) NOT NULL,
  `Persona_idPersona` INT UNSIGNED NOT NULL,
  `Administrador_idAdministrador` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idDocumentos`),
  INDEX `fk_Detalle_Persona1_idx` (`Persona_idPersona` ASC) VISIBLE,
  INDEX `fk_Dcumentos_Administrador1_idx` (`Administrador_idAdministrador` ASC) VISIBLE,
  CONSTRAINT `fk_Detalle_Persona1`
    FOREIGN KEY (`Persona_idPersona`)
    REFERENCES `mydb`.`Beneficiario` (`idBeneficiario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Dcumentos_Administrador1`
    FOREIGN KEY (`Administrador_idAdministrador`)
    REFERENCES `mydb`.`Administrador` (`idAdministrador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`HistorialCambios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`HistorialCambios` ;

CREATE TABLE IF NOT EXISTS `mydb`.`HistorialCambios` (
  `idHistorialCambios` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Accion` VARCHAR(45) NOT NULL,
  `ValorAnterior` VARCHAR(45) NOT NULL,
  `ValorNuevo` VARCHAR(45) NULL,
  `Administrador_idAdministrador` INT UNSIGNED NULL,
  `Beneficiario_idBeneficiario` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idHistorialCambios`),
  INDEX `fk_HistorialCambios_Administrador1_idx` (`Administrador_idAdministrador` ASC) VISIBLE,
  INDEX `fk_HistorialCambios_Beneficiario1_idx` (`Beneficiario_idBeneficiario` ASC) VISIBLE,
  CONSTRAINT `fk_HistorialCambios_Administrador1`
    FOREIGN KEY (`Administrador_idAdministrador`)
    REFERENCES `mydb`.`Administrador` (`idAdministrador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_HistorialCambios_Beneficiario1`
    FOREIGN KEY (`Beneficiario_idBeneficiario`)
    REFERENCES `mydb`.`Beneficiario` (`idBeneficiario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;