-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 24-02-2022 a las 10:03:52
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restauracion`
--

DROP DATABASE IF EXISTS `restauracion`;
CREATE DATABASE `restauracion` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `restauracion`;

-- --------------------------------------------------------

--
-- Dando los permisos de acceso al usuario
--

GRANT ALL PRIVILEGES ON restauracion.* TO 'pcw'@127.0.0.1 IDENTIFIED BY 'pcw';
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
CREATE TABLE `etiqueta` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `etiqueta`
--

INSERT INTO `etiqueta` (`id`, `nombre`) VALUES
(9, 'Actuaciones'),
(1, 'Bar'),
(18, 'Bocatas'),
(5, 'Cervecería'),
(11, 'Copas'),
(3, 'Hamburguesas'),
(10, 'Monólogos'),
(4, 'Montaditos'),
(8, 'Música en vivo'),
(7, 'Restaurante'),
(2, 'Tapas'),
(6, 'Tapería');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foto`
--

DROP TABLE IF EXISTS `foto`;
CREATE TABLE `foto` (
  `id` int(11) NOT NULL,
  `id_lugar` int(11) NOT NULL,
  `fichero` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `foto`
--

INSERT INTO `foto` (`id`, `id_lugar`, `fichero`) VALUES
(1, 1, 'foto1.jpg'),
(2, 1, 'foto2.jpg'),
(3, 1, 'foto3.jpg'),
(4, 2, 'foto4.jpg'),
(5, 2, 'foto5.jpg'),
(6, 2, 'foto6.jpg'),
(7, 2, 'foto7.jpg'),
(8, 3, 'foto8.jpg'),
(9, 3, 'foto9.jpg'),
(25, 4, 'foto10.jpg'),
(26, 4, 'foto11.jpg'),
(27, 4, 'foto12.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugar`
--

DROP TABLE IF EXISTS `lugar`;
CREATE TABLE `lugar` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `poblacion` varchar(250) NOT NULL,
  `provincia` varchar(250) NOT NULL,
  `comentario` text NOT NULL,
  `login` varchar(20) NOT NULL,
  `fecha_alta` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lugar`
--

INSERT INTO `lugar` (`id`, `nombre`, `direccion`, `poblacion`, `provincia`, `comentario`, `login`, `fecha_alta`) VALUES
(1, 'El Garaje Bar Alicante', 'Plaza Gabriel Miró, 14', 'Alicante', 'Alicante', 'Tapas, minihamburguesas y cerveza en un espacioso establecimiento industrial con sesiones de DJs y exposiciones de arte temporales.', 'usuario1', '2022-01-17 17:25:55'),
(2, 'Pura Tapa', 'Calle Cervantes, 17', 'San Vicente del Raspeig', 'Alicante', 'Es un lugar muy tranquilo y con una amplia terraza al que puedes ir en el plan que quieras, ya sea para comer, para cenar, para tapear o simplemente para tomarte unas cervezas.', 'usuario3', '2022-01-11 17:25:55'),
(3, 'El Rinconcito del Tapeo', 'Centro Comercial La Seda. Av. Locutor Vicente Hipólito, 39', 'Alicante', 'Alicante', 'Cocina española buenísima. Las tapas son espectaculares y bastante grandes. El precio también sorprende porque no es exagerado para la calidad de la comida. Si tengo que poner alguna pega es que a veces la cocina va algo lenta.', 'usuario2', '2022-01-19 17:38:41'),
(4, 'Cervecería L\'embolic', 'Calle Dr. Gadea, 46', 'Sant Joan d\'Alacant', 'Alicante', 'Hamburguesas buenísimas y toda la cerveza que quieras. Además, el ambiente y el trato es maravilloso.', 'usuario5', '2022-02-24 08:51:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lugar_etiqueta`
--

DROP TABLE IF EXISTS `lugar_etiqueta`;
CREATE TABLE `lugar_etiqueta` (
  `id_lugar` int(11) NOT NULL,
  `id_etiqueta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `lugar_etiqueta`
--

INSERT INTO `lugar_etiqueta` (`id_lugar`, `id_etiqueta`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 8),
(2, 1),
(2, 2),
(2, 4),
(2, 5),
(3, 2),
(3, 3),
(3, 5),
(3, 11),
(4, 2),
(4, 3),
(4, 4),
(4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `login` varchar(20) NOT NULL,
  `pwd` varchar(20) NOT NULL,
  `foto` varchar(20) DEFAULT NULL,
  `token` varchar(250) DEFAULT NULL,
  `ultimo_acceso` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`login`, `pwd`, `foto`, `token`, `ultimo_acceso`) VALUES
('usuario1', 'usuario1', 'usuario1.png', '', '2022-02-11 10:37:07'),
('usuario2', 'usuario2', 'usuario2.png', '9a2da7cc788b1a3825287079129cf0e71aee5b7dabb4a066e27bfbdc35d85fa3982317e38ccf803ec6160ef7e8d9f0176c3d2e20d4e788627abc30b3dbb0716c', '2022-02-11 10:37:37'),
('usuario3', 'usuario3', 'usuario3.png', '', '2022-02-11 10:37:07'),
('usuario4', 'usuario4', 'usuario4.jpg', '6db5f9d2a5f4e8903efe939994315376810ad2c37bcf980d1a5c7e4ebff965133b39b29681d74199110082516409d29413f528438889efdad0b46f4757545113', '2022-02-21 17:24:46'),
('usuario5', 'usuario5', 'usuario5.jpg', '', '2022-02-11 10:37:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoracion`
--

DROP TABLE IF EXISTS `valoracion`;
CREATE TABLE `valoracion` (
  `id` int(11) NOT NULL,
  `id_lugar` int(11) NOT NULL,
  `login` varchar(20) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `titulo` varchar(250) NOT NULL,
  `texto` text NOT NULL,
  `puntuacion` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `valoracion`
--

INSERT INTO `valoracion` (`id`, `id_lugar`, `login`, `fecha`, `titulo`, `texto`, `puntuacion`) VALUES
(1, 1, 'usuario2', '2022-01-24 17:59:35', 'Atención del personal perfecta', 'Lo conocí gracias a esta web. He ido unas cuantas veces y no deja de sorprenderme. Todo espectacular y a precios asequibles. El sitio está muy bien decorado.', 5),
(2, 1, 'usuario3', '2022-01-29 09:29:06', 'Está muy bien pero ...', 'El bar está muy bien, muy acogedor. La comida tampoco está mal, pero hay veces que las salsas están demasiado especiadas y se pierde el sabor.', 4),
(3, 3, 'usuario1', '2022-01-25 18:05:46', 'Se come fenomenal', 'Todo está muy bueno. El personal es muy amable. Hay gran variedad de tapas y el lugar en el que se encuentra es muy bonito. Recomendable. Volveré seguro.', 5),
(4, 3, 'usuario4', '2022-01-22 18:05:46', 'No muy buena experiencia', 'Yo estuve hace unos días con mi familia y la experiencia no resultó muy agradable. Tuvimos que quejarnos del pan de los montaditos, estaba muy seco, parecía de hacía unos días. Además, a la hora de cobrar se equivocaron y nos querían cobrar de más. Pudo ser un mal día. Volveré para probar otra vez.', 2),
(5, 2, 'usuario5', '2022-02-01 18:10:47', 'Sitio perfecto para tapear', 'Es un sitio ideal para juntarte a tomarte unas cervezas con unas tapas. Hay gran variedad de comida, ensaladas, tapas, etc. Si hace un día bueno, te recomiendo la terraza. Ah! Y la cerveza está buenísima y fresquísima. ', 5),
(9, 4, 'usuario3', '2022-02-24 09:03:13', 'No me parece para tanto', 'Me esperaba algo mejor. No es que esté mal, pero el servicio fue algo lento y la comida estaba fría. Eso sí, la cerveza muy fría y buenísima.', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `etiqueta`
--
ALTER TABLE `etiqueta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_lugar` (`id_lugar`);

--
-- Indices de la tabla `lugar`
--
ALTER TABLE `lugar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lugar_ibfk_1` (`login`);

--
-- Indices de la tabla `lugar_etiqueta`
--
ALTER TABLE `lugar_etiqueta`
  ADD PRIMARY KEY (`id_lugar`,`id_etiqueta`),
  ADD KEY `id_etiqueta` (`id_etiqueta`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`login`) USING BTREE;

--
-- Indices de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_lugar` (`id_lugar`),
  ADD KEY `login` (`login`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `etiqueta`
--
ALTER TABLE `etiqueta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `foto`
--
ALTER TABLE `foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `lugar`
--
ALTER TABLE `lugar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `valoracion`
--
ALTER TABLE `valoracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `foto`
--
ALTER TABLE `foto`
  ADD CONSTRAINT `foto_ibfk_1` FOREIGN KEY (`id_lugar`) REFERENCES `lugar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lugar`
--
ALTER TABLE `lugar`
  ADD CONSTRAINT `lugar_ibfk_1` FOREIGN KEY (`login`) REFERENCES `usuario` (`login`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lugar_etiqueta`
--
ALTER TABLE `lugar_etiqueta`
  ADD CONSTRAINT `lugar_etiqueta_ibfk_1` FOREIGN KEY (`id_etiqueta`) REFERENCES `etiqueta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lugar_etiqueta_ibfk_2` FOREIGN KEY (`id_lugar`) REFERENCES `lugar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `valoracion`
--
ALTER TABLE `valoracion`
  ADD CONSTRAINT `valoracion_ibfk_1` FOREIGN KEY (`id_lugar`) REFERENCES `lugar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `valoracion_ibfk_2` FOREIGN KEY (`login`) REFERENCES `usuario` (`login`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
