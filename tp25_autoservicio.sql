-- Script para creacion de base de datos para TP Integrador - Programacion III

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp25_autoservicio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--
CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('belleza', 'farmacia', 'cuidado personal') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `products`
--
INSERT INTO `products` (`id`, `name`, `image`, `category`, `price`, `active`) VALUES
(1, 'Fragancia Noir EDT for Women', './img/belleza/perfume-mujer.jpg', 'belleza', '23000.00', 1),
(2, 'Fragancia Absolute EDT for Men', './img/belleza/perfume-hombre.jpg', 'belleza', '30000.00', 1),
(3, 'Paleta de Sombras Rimmel Magnif Eyes Spice', './img/belleza/paleta-sombras.jpg', 'belleza', '19000.00', 1),
(4, 'Mascara de Pestanas Maybelline Sky High Waterproof', './img/belleza/mascara-pestañas.jpg', 'belleza', '26000.00', 1),
(5, 'Corrector de Ojeras Rimmel Kind & Free 40 Tan', './img/belleza/corrector-ojeras.jpg', 'belleza', '13000.00', 1),
(6, 'Labial en Barra Revlon Super Lustrous', './img/belleza/labial.jpg', 'belleza', '19000.00', 1),
(7, 'Hidratante Facial Neutrogena Hydro Boost 50g', './img/belleza/hidratante-facial.jpg', 'belleza', '55000.00', 1),
(8, 'Esmalte Sally Hansen Color Therapy', './img/belleza/esmalte-uñas.jpg', 'belleza', '12000.00', 1),
(9, 'Delineador Rimmel Scandal Eyes Exaggerate Black', './img/belleza/delineador.jpg', 'belleza', '14000.00', 1),
(10, 'Mascara de Tratamiento Dove Hidratacion Hialuron 10 en 1', './img/belleza/tratamiento-capilar-hidratacion.jpg', 'belleza', '13000.00', 1),
(11, 'Buscapina Antiespasmodico x 20 grageas', './img/farmacia/buscapina.jpg', 'farmacia', '13000.00', 1),
(12, 'Actron Ibuprofeno 400 mg x 20 capsulas', './img/farmacia/actron.jpg', 'farmacia', '5000.00', 1),
(13, 'Paracetamol Isa 500 mg x 30 comprimidos', './img/farmacia/paracetamol.jpg', 'farmacia', '9000.00', 1),
(14, 'Refrianex Compuesto x 20 comprimidos', './img/farmacia/refrianex.jpg', 'farmacia', '11000.00', 1),
(15, 'Vick Vitapyrena Miel y Limon x 1 sobre', './img/farmacia/te-vick.jpg', 'farmacia', '3000.00', 1),
(16, 'Next Gripe x 20 comprimidos', './img/farmacia/next.jpg', 'farmacia', '11000.00', 1),
(17, 'Hepatalgina x 10 comprimidos', './img/farmacia/hepatalgina.jpg', 'farmacia', '7000.00', 1),
(18, 'Supradyn Multivitaminico x 30 comprimidos', './img/farmacia/supradyn-multivitaminico.jpg', 'farmacia', '22000.00', 1),
(19, 'Alernix Spray Nasal x 10 ml', './img/farmacia/alernix.jpg', 'farmacia', '16000.00', 1),
(20, 'Ibuprofeno 400 mg x 20 comprimidos', './img/farmacia/ibuprofeno.jpg', 'farmacia', '6000.00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_sales`
--
CREATE TABLE `product_sales` (
  `product_id` int NOT NULL,
  `sale_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `product_sales`
--
INSERT INTO `product_sales` (`product_id`, `sale_id`) VALUES
(1, 6),
(3, 6),
(11, 6),
(2, 7),
(7, 7),
(5, 8),
(9, 8),
(4, 9),
(6, 9),
(12, 9),
(7, 10),
(10, 10),
(13, 11),
(15, 11),
(2, 12),
(7, 12),
(18, 12),
(8, 13),
(14, 13);

---------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--
CREATE TABLE `sales` (
  `id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(240) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `sales`
--
INSERT INTO `sales` (`id`, `date`, `total_price`, `user_name`) VALUES
(6, '2026-11-01 10:25:00', '42000.00', 'Camila Lopez'),
(7, '2026-11-02 13:40:00', '68000.00', 'Martin Gonzalez'),
(8, '2026-11-03 16:15:00', '19000.00', 'Sofia Rodriguez'),
(9, '2026-11-04 11:30:00', '35000.00', 'Lucas Martinez'),
(10, '2026-11-05 18:20:00', '55000.00', 'Valentina Romero'),
(11, '2026-11-06 09:45:00', '25000.00', 'Nicolas Torres'),
(12, '2026-11-07 14:10:00', '81000.00', 'Julieta Diaz'),
(13, '2026-11-08 17:50:00', '16000.00', 'Tomas Alvarez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--
CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--
INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Maria Fernandez', 'maria.fernandez@gmail.com', 'MarF_2026!'),
(2, 'Lucas Martinez', 'lucas.martinez@gmail.com', 'LuM#8492'),
(3, 'Sofia Rodriguez', 'sofia.rodriguez@gmail.com', 'Sofi_R92$'),
(4, 'Martin Gonzalez', 'martin.gonzalez@gmail.com', 'MGz!7315'),
(5, 'Camila Lopez', 'camila.lopez@gmail.com', 'Cami*5821'),
(6, 'Pedro Sanchez', 'pedro.sanchez@gmail.com', 'PedS_4098'),
(7, 'Valentina Romero', 'valentina.romero@gmail.com', 'Vale!6283'),
(8, 'Nicolas Torres', 'nicolas.torres@gmail.com', 'NicT#1957'),
(9, 'Julieta Diaz', 'julieta.diaz@gmail.com', 'Juli$8346'),
(10, 'Tomas Alvarez', 'tomas.alvarez@gmail.com', 'TomA_7204'),
(11, 'Florencia Castro', 'florencia.castro@gmail.com', 'Flor!3962'),
(12, 'Agustin Morales', 'agustin.morales@gmail.com', 'AgM#5819'),
(13, 'Lucia Herrera', 'lucia.herrera@gmail.com', 'LucH*2473'),
(14, 'Diego Ramirez', 'diego.ramirez@gmail.com', 'DieR_9631'),
(15, 'Carolina Silva', 'carolina.silva@gmail.com', 'CarS!8152');

--
-- Índices para tablas volcadas
--
--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD KEY `product_id` (`product_id`,`sale_id`),
  ADD KEY `sale_id` (`sale_id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--
--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--
--
-- Filtros para la tabla `product_sales`
--
ALTER TABLE `product_sales`
  ADD CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
