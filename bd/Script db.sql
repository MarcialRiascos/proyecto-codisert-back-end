CREATE SCHEMA IF NOT EXISTS `proyecto_codisert` DEFAULT CHARACTER SET utf8 ;
USE `proyecto_codisert` ;

CREATE TABLE `administrador` (
  `idAdministrador` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `TipoDocumento_idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `NumeroDocumento` varchar(45) NOT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `Correo` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Estado_idEstado` int(10) UNSIGNED NOT NULL,
  `Rol_idRol` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`idAdministrador`, `Nombre`, `Apellido`, `TipoDocumento_idTipoDocumento`, `NumeroDocumento`, `Telefono`, `Correo`, `Password`, `Estado_idEstado`, `Rol_idRol`, `Administrador_idAdministrador`) VALUES
(1, 'Super', 'Admin', 1, '0000000000', '1111111111', 'admin@admin.com', '1234567890', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficiario`
--

CREATE TABLE `beneficiario` (
  `idBeneficiario` int(10) UNSIGNED NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `TipoDocumento_idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `NumeroDocumento` varchar(45) NOT NULL,
  `Telefono` varchar(45) DEFAULT NULL,
  `Celular` varchar(45) DEFAULT NULL,
  `Correo` varchar(45) NOT NULL,
  `Estrato` varchar(45) NOT NULL,
  `FechaInicio` varchar(45) NOT NULL,
  `FechaFin` varchar(45) DEFAULT NULL,
  `CodigoDaneDpmto` varchar(45) NOT NULL,
  `CodigoDaneMunicipio` varchar(45) NOT NULL,
  `Direccion` varchar(45) NOT NULL,
  `Barrio` varchar(45) DEFAULT NULL,
  `Estado_idEstado` int(10) UNSIGNED NOT NULL,
  `Estrato_idEstrato` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dcumentos`
--

CREATE TABLE `dcumentos` (
  `idDocumentos` int(10) UNSIGNED NOT NULL,
  `NombreDocumento` varchar(45) NOT NULL,
  `TipoDocumento` varchar(45) NOT NULL,
  `Url` varchar(45) NOT NULL,
  `Persona_idPersona` int(10) UNSIGNED NOT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idEstado` int(10) UNSIGNED NOT NULL,
  `Estado` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idEstado`, `Estado`) VALUES
(1, 'Activo'),
(2, 'Inactivo '),
(3, 'Operativo'),
(4, 'Suspendido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estrato`
--

CREATE TABLE `estrato` (
  `idEstrato` int(10) UNSIGNED NOT NULL,
  `Estrato` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estrato`
--

INSERT INTO `estrato` (`idEstrato`, `Estrato`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4'),
(5, '5'),
(6, '6');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialcambios`
--

CREATE TABLE `historialcambios` (
  `idHistorialCambios` int(10) UNSIGNED NOT NULL,
  `Accion` varchar(45) NOT NULL,
  `ValorAnterior` varchar(45) NOT NULL,
  `ValorNuevo` varchar(45) DEFAULT NULL,
  `Administrador_idAdministrador` int(10) UNSIGNED DEFAULT NULL,
  `Beneficiario_idBeneficiario` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(10) UNSIGNED NOT NULL,
  `Rol` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `Rol`) VALUES
(1, 'admin_super'),
(2, 'admin_registrador'),
(3, 'admin_lector');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipodocumento`
--

CREATE TABLE `tipodocumento` (
  `idTipoDocumento` int(10) UNSIGNED NOT NULL,
  `TipoDocumento` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipodocumento`
--

INSERT INTO `tipodocumento` (`idTipoDocumento`, `TipoDocumento`) VALUES
(1, 'Cedula de ciudadanía '),
(2, 'Cedula de ciudadanía extranjera'),
(3, 'Pasaporte');
