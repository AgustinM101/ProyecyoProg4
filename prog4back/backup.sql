-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql:3306
-- Tiempo de generación: 05-11-2025 a las 23:46:29
-- Versión del servidor: 5.7.44
-- Versión de PHP: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hexagonal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_alert` tinyint(4) NOT NULL DEFAULT '0',
  `severity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`id`, `text`, `created_at`, `is_alert`, `severity`) VALUES
(1, 'probando de nuevo', '2025-11-04 03:54:39', 0, NULL),
(2, 'probando 2', '2025-11-04 03:57:32', 1, 1),
(3, 'probando 3', '2025-11-04 03:57:45', 1, 2),
(4, 'probando 4', '2025-11-04 03:57:57', 1, 3),
(5, 'probando reciente', '2025-11-04 03:58:10', 0, NULL),
(6, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'Fede\' a estado \'active\' con expiraciÃ³n \'2025-11-12 00:00:00\'.', '2025-11-04 01:26:57', 0, NULL),
(7, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'Fede\' a estado \'chargePending\' con expiraciÃ³n \'2025-11-12 00:00:00\'.', '2025-11-04 02:49:25', 0, 1),
(8, 'Se eliminÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'belenas\'.', '2025-11-04 02:52:24', 0, 1),
(9, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'Fede\' a estado \'active\' con expiraciÃ³n \'2025-11-12 00:00:00\'.', '2025-11-04 11:10:36', 0, 1),
(10, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'prueba\' a estado \'chargePending\' con expiraciÃ³n \'2025-10-10 00:00:00\'.', '2025-11-04 11:49:25', 0, 1),
(11, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'prueba\' a estado \'active\' con expiraciÃ³n \'2025-10-10 00:00:00\'.', '2025-11-04 12:02:31', 0, 1),
(12, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'belen\' a estado \'confirmPayment\' con expiraciÃ³n \'2025-11-02 00:00:00\'.', '2025-11-04 12:06:01', 0, 1),
(13, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'belen\' a estado \'active\' con expiraciÃ³n \'2025-11-02 00:00:00\'.', '2025-11-04 15:41:13', 0, 1),
(14, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'belen\' a estado \'confirmPayment\' con expiraciÃ³n \'2025-11-02 00:00:00\'.', '2025-11-04 15:41:43', 0, 1),
(15, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'belen\' a estado \'active\' con expiraciÃ³n \'2025-11-02 00:00:00\'.', '2025-11-04 16:16:11', 0, 1),
(16, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'prueba\' a estado \'chargePending\' con expiraciÃ³n \'2025-10-10 00:00:00\'.', '2025-11-04 18:06:12', 0, 1),
(17, 'Se eliminÃ³ la asignaciÃ³n del plan \'Plan Competicion\' para el usuario \'pruebalogs2\'.', '2025-11-04 18:06:35', 0, 1),
(18, 'Se eliminÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'Fede\'.', '2025-11-04 18:11:56', 0, 1),
(19, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'belenas\' a estado \'confirmPayment\' con expiraciÃ³n \'\'.', '2025-11-04 18:31:05', 0, 1),
(20, 'Se actualizÃ³ el plan: Plan PHaV, descripciÃ³n:El plan PHAV esta disenado para lograr una recomposicion corporal efectiva, mejorar fuerza, resistencia y estetica de manera progresiva y saludable., precio: 12000 ', '2025-11-04 19:30:15', 1, 1),
(21, 'Se actualizÃ³ el plan: Plan PHaV, descripciÃ³n:El plan PHAV esta disenado para lograr una recomposicion corporal efectiva, mejorar fuerza, resistencia y estetica de manera progresiva y saludable., precio: 11000 ', '2025-11-04 19:31:08', 1, 1),
(22, 'Se eliminÃ³ el plan: random', '2025-11-04 19:31:37', 1, 1),
(23, 'Se eliminÃ³ el plan: Plan competicion', '2025-11-04 19:56:00', 1, 1),
(24, 'Se creÃ³ un nuevo plan: prueba', '2025-11-04 19:56:24', 0, 1),
(25, 'Se actualizÃ³ el plan: Plan PHaV, descripciÃ³n:El plan PHAV esta disenado para lograr una recomposicion corporal efectiva, mejorar fuerza, resistencia y estetica de manera progresiva y saludable., precio: 11001 ', '2025-11-04 19:57:03', 1, 1),
(26, 'Se eliminÃ³ la asignaciÃ³n del plan \'Plan Competicion\' para el usuario \'pruebalogs2\'.', '2025-11-04 20:57:18', 1, 1),
(27, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan Competicion\' para el usuario \'pruebalogs2\' a estado \'chargePending\' con expiraciÃ³n \'2025-10-26 21:50:51\'.', '2025-11-04 20:58:06', 0, 1),
(28, 'El usuario belenas completÃ³ el formulario de plan Plan PHaV.', '2025-11-04 21:15:34', 0, 1),
(29, 'Se eliminÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'prueba\'.', '2025-11-04 21:58:15', 1, 1),
(30, 'Se eliminÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'anag\'.', '2025-11-04 21:59:31', 1, 1),
(31, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan Competicion\' para el usuario \'pruebalogs2\' a estado \'active\' con expiraciÃ³n \'2025-10-26 21:50:51\'.', '2025-11-04 22:01:14', 0, 1),
(32, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'belenas\' a estado \'active\' con expiraciÃ³n \'\'.', '2025-11-04 22:03:06', 0, 1),
(33, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'prueba\' a estado \'chargePending\' con expiraciÃ³n \'2025-11-20 03:00:00\'.', '2025-11-04 23:18:37', 0, 1),
(34, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'prueba\' a estado \'active\' con expiraciÃ³n \'2025-11-20 03:00:00\'.', '2025-11-04 23:20:06', 0, 1),
(35, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'belenas\' a estado \'confirmPayment\' con expiraciÃ³n \'2025-11-02\'.', '2025-11-04 23:22:35', 0, 1),
(36, 'Se actualizÃ³ la asignaciÃ³n del plan \'Plan PHaV\' para el usuario \'belenas\' a estado \'finished\' con expiraciÃ³n \'2025-11-02 00:00:00\'.', '2025-11-04 23:23:17', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `plans_user_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` enum('pending','approved','cancelled') DEFAULT 'pending',
  `preference_id` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plans`
--

CREATE TABLE `plans` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plans`
--

INSERT INTO `plans` (`id`, `name`, `description`, `price`, `deleted`) VALUES
(1, 'Plan PHaV', 'El plan PHAV esta disenado para lograr una recomposicion corporal efectiva, mejorar fuerza, resistencia y estetica de manera progresiva y saludable.', 11001, 0),
(2, 'Plan Competicion', 'El plan de Competicion esta disenado para quienes buscan ingresar al equipo competitivo de fisicoculturismo. Este programa exige cumplir con condiciones fisicas y disciplina estricta para alcanzar los objetivos planteados y competir al maximo nivel.', 15000, 0),
(3, 'plan random', 'random', 209, 1),
(4, 'Plan prueba', 'Esta es la descripcion del plan pruba', 1500, 1),
(5, 'premiun', 'premiun description', 20000, 1),
(6, 'Plan competicion', 'El plan de Competicion esta disenado para quienes buscan ingresar al equipo competitivo de fisicoculturismo. Este programa exige cumplir con condiciones fisicas y disciplina estricta para alcanzar los objetivos planteados y competir al maximo nivel.', 2000, 1),
(7, 'random', 'random', 3000, 1),
(8, 'prueba', 'prueba', 20, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plans_forms`
--

CREATE TABLE `plans_forms` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `edad` int(11) NOT NULL,
  `sexo` enum('M','F','Otro') NOT NULL,
  `altura` decimal(5,2) NOT NULL,
  `peso_actual` decimal(5,2) NOT NULL,
  `peso_deseado` decimal(5,2) NOT NULL,
  `actividad_fisica` varchar(100) NOT NULL,
  `antecedentes_medicos` text,
  `alergias` text,
  `medicamentos` text,
  `problemas_digestivos` text,
  `comidas_diarias` int(11) NOT NULL,
  `alimentos_evitar` text NOT NULL,
  `horarios_comidas` text NOT NULL,
  `consumo_agua` decimal(5,2) NOT NULL,
  `consumo_alcohol` varchar(50) NOT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_plans_user` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plans_forms`
--

INSERT INTO `plans_forms` (`id`, `nombre`, `edad`, `sexo`, `altura`, `peso_actual`, `peso_deseado`, `actividad_fisica`, `antecedentes_medicos`, `alergias`, `medicamentos`, `problemas_digestivos`, `comidas_diarias`, `alimentos_evitar`, `horarios_comidas`, `consumo_agua`, `consumo_alcohol`, `fecha_registro`, `id_plans_user`, `deleted`) VALUES
(1, 'juan', 23, 'M', 150.00, 70.00, 80.00, 'nada', 'no', 'no', 'no', 'no', 3, 'harinas', 'cada 3 horas', 3.00, 'si', '2025-10-14 23:48:22', 5, 0),
(2, 'juan', 23, 'M', 150.00, 70.00, 80.00, 'nada', 'no', 'no', 'no', 'no', 3, 'harinas', 'cada 3 horas', 3.00, 'si', '2025-10-14 23:48:22', 6, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plans_user`
--

CREATE TABLE `plans_user` (
  `id_plan` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  `id` int(11) NOT NULL,
  `expiration_date` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plans_user`
--

INSERT INTO `plans_user` (`id_plan`, `id_user`, `status`, `id`, `expiration_date`, `deleted`, `created_at`) VALUES
(1, 5, 'expired', 1, '2025-10-10 00:00:00', 1, '2025-11-03 19:01:11'),
(1, 8, 'expired', 2, '2025-11-05 23:09:19', 1, '2025-11-03 19:01:11'),
(2, 16, 'expired', 3, '2025-10-26 21:50:51', 0, '2025-11-03 19:01:11'),
(1, 18, 'active', 4, '2025-11-20 03:00:00', 0, '2025-11-03 19:01:11'),
(1, 6, 'active', 5, '2025-11-12 00:00:00', 0, '2025-11-03 19:01:11'),
(1, 7, 'expired', 6, '2025-11-02 00:00:00', 0, '2025-11-03 19:01:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan_alimentos`
--

CREATE TABLE `plan_alimentos` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `dias` int(11) NOT NULL,
  `id_plans_user` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plan_alimentos`
--

INSERT INTO `plan_alimentos` (`id`, `description`, `tipo`, `dias`, `id_plans_user`, `deleted`) VALUES
(1, 'alimento descripcion', 'verdura', 0, 2, 0),
(2, 'Pollo con arroz', 'almuerzo', 1, 1, 0),
(3, 'Yogurt con cereales', 'desayuno', 2, 1, 0),
(4, 'Pollo con arroz', 'almuerzo', 3, 1, 0),
(5, 'Yogurt con cereales', 'desayuno', 4, 1, 0),
(6, 'Pollo con arroz', 'almuerzo', 5, 1, 0),
(7, 'Yogurt con cereales', 'desayuno', 6, 1, 0),
(16, 'Desayuno: Avena con banana', 'Desayuno', 1, 4, 0),
(17, 'Almuerzo: Pollo con arroz', 'Almuerzo', 1, 4, 0),
(18, 'Cena: Ensalada verde', 'Cena', 1, 4, 0),
(19, 'Desayuno: Huevos revueltos', 'Desayuno', 2, 4, 0),
(20, 'Almuerzo: Pasta integral', 'Almuerzo', 2, 4, 0),
(21, 'Cena: Pescado a la plancha', 'Cena', 2, 4, 0),
(22, '1', 'Desayuno', 1, 3, 0),
(23, 'prueba 6', 'Desayuno', 1, 5, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan_ejercicios`
--

CREATE TABLE `plan_ejercicios` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `dias` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `id_plans_user` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plan_ejercicios`
--

INSERT INTO `plan_ejercicios` (`id`, `tipo`, `dias`, `description`, `id_plans_user`, `deleted`) VALUES
(1, 'tren superior', 0, 'press banca', 2, 0),
(2, 'tren inferior', 7, 'tambien hacelo vos la prox', 1, 0),
(3, 'almuerzo', 1, 'actualizado 3', 1, 0),
(4, 'desayuno', 2, 'actualizado 4', 1, 0),
(12, 'Cardio', 1, 'Cardio 30 min', 4, 0),
(13, 'Fuerza', 1, 'Pesas: Tren superior', 4, 0),
(14, 'Flexibilidad', 1, 'Estiramientos', 4, 0),
(15, 'Movilidad', 1, 'agrego prueba', 4, 0),
(16, 'Cardio', 2, 'Cardio 25 min', 4, 0),
(17, 'Fuerza', 2, 'Pesas: Tren inferior', 4, 0),
(18, 'Flexibilidad', 2, 'cambio prueba', 4, 0),
(19, 'Cardio', 1, '1', 3, 0),
(20, 'Cardio', 1, 'prueba 6', 5, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_auth_date` datetime DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `profile_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `token`, `token_auth_date`, `deleted`, `admin`, `profile_image`) VALUES
(5, 'anag', 'roberto@hotmail.com', '$2y$10$5c1EEFbE.eROV1h88hyK3eSKH9NWoVdJE5iaOL4Srp7WGe3JA9NUu', '49c281c5b363ec804c84036535e69b8a', '2025-10-21 20:25:37', 0, 0, ''),
(6, 'belen', 'ana@gmail.com', '$2y$10$t3oKyWF573MYPG6sol/Za.Hz5oZgQd3rpvZXAsB4DQnyLRc4gPeeu', '43b1a9cebff6b440758093ac7384c7c5', '2025-11-04 23:06:04', 0, 0, ''),
(7, 'belenas', 'anasd@gmail.com', '$2y$10$aq2KmoAZfN.zz0Dli9QQluxoTjSbl3xfiOPuJwDfcrBI1lvWJ0Hy2', 'd7e2d5317b45fc5b8895214c5b3017dd', '2025-09-09 21:30:23', 0, 0, ''),
(8, 'Fede', 'fede@gmail.com', '$2y$10$KU8BAYGkD6JN8tUvnv.YteqfgS0JoMSXQWZD2gfsf8jTrzezCEk5e', 'ae7762714130c096bbdbc78d1236b51c', '2025-11-05 19:36:39', 0, 1, ''),
(13, 'Prueba', 'prueba4@gmail.com', '$2y$10$UfzC8yiQ0yQLJh//8xgpf.s42y22.0cVb8dk87w43NkFOPeWAK1aa', '093349b6a4b7c28b05ef64d578cd0054', '2025-10-15 22:39:58', 0, 0, NULL),
(14, 'Prueba', 'prueba5@gmail.com', '$2y$10$Jda3sBK4dEpVgcJtLfPbNuf.qLo8.cTTNsROZsNFeypfWIMTpjJjO', '61d4160dccf4d19c04ee45ce9b4b17c8', '2025-10-15 22:41:15', 0, 0, NULL),
(15, 'pruebalogs', 'pruebalogs@hotmail.com', '$2y$10$97CYIMdaPHYslUMjskaUc.b0S4YPDZ2F1bt/y4PtEHV65kWNNa4QW', 'a59a1964d8f71337e369343b8c468d3a', '2025-10-19 05:03:28', 0, 0, NULL),
(16, 'pruebalogs2', 'pruebalogs2@hotmail.com', '$2y$10$KvqL7STOqQL9C57AoDqL7uLjcuOlEFs.J/YbWZ4v2B0DzzvmEbTiO', '5c0c1fac4ee9006b82799b383a011359', '2025-10-19 05:14:11', 0, 0, NULL),
(17, 'pruebalogs3', 'pruebalogs3@gmail.com', '$2y$10$bXuwjGKp/3l3WUh7SIHg0OCrgyIEC1OxEFR4xggeTIBGn1q1BwCOK', '149b748215f93949e1ea7c817ce345b8', '2025-10-19 05:16:23', 0, 0, NULL),
(18, 'prueba', 'pruebalogs4@hotmail.com', '$2y$10$4gIsZugjzTfIStApCNvfPuKBw8r5I4tctphIk11dALS/F.uQDopDW', '8f62a520bd7a738dae00898b7fafffdb', '2025-10-22 16:07:13', 0, 0, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`plans_user_id`);

--
-- Indices de la tabla `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `plans_forms`
--
ALTER TABLE `plans_forms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_plans_user` (`id_plans_user`);

--
-- Indices de la tabla `plans_user`
--
ALTER TABLE `plans_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_plan` (`id_plan`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `plan_alimentos`
--
ALTER TABLE `plan_alimentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_user_id` (`id_plans_user`);

--
-- Indices de la tabla `plan_ejercicios`
--
ALTER TABLE `plan_ejercicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_user_id` (`id_plans_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `plans_forms`
--
ALTER TABLE `plans_forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `plans_user`
--
ALTER TABLE `plans_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `plan_alimentos`
--
ALTER TABLE `plan_alimentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `plan_ejercicios`
--
ALTER TABLE `plan_ejercicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `plans_forms`
--
ALTER TABLE `plans_forms`
  ADD CONSTRAINT `plans_forms_ibfk_1` FOREIGN KEY (`id_plans_user`) REFERENCES `plans_user` (`id`);

--
-- Filtros para la tabla `plans_user`
--
ALTER TABLE `plans_user`
  ADD CONSTRAINT `plans_user_ibfk_1` FOREIGN KEY (`id_plan`) REFERENCES `plans` (`id`),
  ADD CONSTRAINT `plans_user_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `plan_alimentos`
--
ALTER TABLE `plan_alimentos`
  ADD CONSTRAINT `plan_alimentos_ibfk_2` FOREIGN KEY (`id_plans_user`) REFERENCES `plans_user` (`id`);

--
-- Filtros para la tabla `plan_ejercicios`
--
ALTER TABLE `plan_ejercicios`
  ADD CONSTRAINT `plan_ejercicios_ibfk_2` FOREIGN KEY (`id_plans_user`) REFERENCES `plans_user` (`id`);

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`%` EVENT `expire_active_plans` ON SCHEDULE EVERY 1 MINUTE STARTS '2025-11-05 22:58:01' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE plans_user
  SET status = 'expired'
  WHERE status = 'active'
  AND expiration_date < NOW()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
