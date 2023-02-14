-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2023 a las 23:01:47
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test_vue_laravel_rolando`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `idcategory` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `state` varchar(1) NOT NULL,
  `idcreated_by` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `idupdated_by` int(11) DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`idcategory`, `name`, `state`, `idcreated_by`, `date_created`, `idupdated_by`, `date_updated`) VALUES
(29, 'Tecnologia', 'A', 1, '2023-02-14 15:13:27', NULL, NULL),
(30, 'Alimentos', 'A', 1, '2023-02-14 15:13:36', 1, '2023-02-14 21:39:23'),
(31, 'ds', 'I', 1, '2023-02-14 15:15:47', 1, '2023-02-14 15:15:52'),
(32, 'd', 'I', 1, '2023-02-14 15:43:07', 1, '2023-02-14 15:43:12'),
(33, 'rer', 'I', 1, '2023-02-14 20:32:30', 1, '2023-02-14 20:32:50'),
(34, 'abc', 'I', 1, '2023-02-14 21:38:35', 1, '2023-02-14 21:39:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detail_exit`
--

CREATE TABLE `detail_exit` (
  `iddetail_exit` int(11) NOT NULL,
  `idhead_exit` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `product` varchar(500) NOT NULL,
  `category` varchar(500) NOT NULL,
  `quantify` decimal(10,2) NOT NULL,
  `idcreated_by` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `code_product` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detail_exit`
--

INSERT INTO `detail_exit` (`iddetail_exit`, `idhead_exit`, `id_product`, `product`, `category`, `quantify`, `idcreated_by`, `date_created`, `code_product`) VALUES
(13, 11, 9, 'Laptot', 'Tecnologia', '1.00', 1, '2023-02-14 15:34:30', '21212'),
(14, 11, 8, 'Coca Cola', 'Alimentos', '1.00', 1, '2023-02-14 15:34:30', '221212'),
(15, 12, 8, 'Coca Cola', 'Alimentos', '2.00', 1, '2023-02-14 15:44:24', '221212'),
(17, 14, 9, 'Laptot', 'Tecnologia', '1.00', 1, '2023-02-14 21:59:45', '21212'),
(18, 14, 10, 'Impresora', 'Tecnologia', '1.00', 1, '2023-02-14 21:59:45', '7777');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detail_income`
--

CREATE TABLE `detail_income` (
  `iddetail_income` int(11) NOT NULL,
  `idhead_income` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `product` varchar(500) NOT NULL,
  `category` varchar(500) NOT NULL,
  `quantify` decimal(10,2) NOT NULL,
  `idcreated_by` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `code_product` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detail_income`
--

INSERT INTO `detail_income` (`iddetail_income`, `idhead_income`, `id_product`, `product`, `category`, `quantify`, `idcreated_by`, `date_created`, `code_product`) VALUES
(16, 15, 9, 'Laptot', 'Tecnologia', '1.00', 1, '2023-02-14 15:21:03', '21212'),
(17, 15, 7, 'Celular', 'Tecnologia', '2.00', 1, '2023-02-14 15:21:03', '12345'),
(18, 15, 8, 'Coca Cola', 'Alimentos', '1.00', 1, '2023-02-14 15:21:03', '221212'),
(19, 16, 8, 'Coca Cola', 'Alimentos', '12.00', 1, '2023-02-14 15:44:08', '221212'),
(26, 23, 9, 'Laptot', 'Tecnologia', '1.00', 1, '2023-02-14 21:59:27', '21212'),
(27, 23, 10, 'Impresora', 'Tecnologia', '1.00', 1, '2023-02-14 21:59:27', '7777');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `head_exit`
--

CREATE TABLE `head_exit` (
  `idhead_exit` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `idcreated_by` int(11) NOT NULL,
  `quantity_entered` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `head_exit`
--

INSERT INTO `head_exit` (`idhead_exit`, `date_created`, `idcreated_by`, `quantity_entered`) VALUES
(11, '2023-02-14 15:34:30', 1, '2.00'),
(12, '2023-02-14 15:44:24', 1, '2.00'),
(14, '2023-02-14 21:59:45', 1, '2.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `head_income`
--

CREATE TABLE `head_income` (
  `idhead_income` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `idcreated_by` int(11) NOT NULL,
  `quantity_entered` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `head_income`
--

INSERT INTO `head_income` (`idhead_income`, `date_created`, `idcreated_by`, `quantity_entered`) VALUES
(15, '2023-02-14 15:21:03', 1, '4.00'),
(16, '2023-02-14 15:44:08', 1, '12.00'),
(23, '2023-02-14 21:59:27', 1, '2.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_08_25_185850_create_files_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(500) NOT NULL,
  `state` varchar(1) NOT NULL,
  `id_category` int(11) NOT NULL,
  `stock` decimal(10,2) NOT NULL,
  `tiene_stock` tinyint(1) NOT NULL,
  `idcreated_by` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `idupdated_by` int(11) DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id_product`, `code`, `name`, `state`, `id_category`, `stock`, `tiene_stock`, `idcreated_by`, `date_created`, `idupdated_by`, `date_updated`) VALUES
(7, '12345', 'Celular', 'A', 29, '2.00', 1, 1, '2023-02-14 15:16:58', NULL, NULL),
(8, '221212', 'Coca Cola', 'A', 30, '10.00', 1, 1, '2023-02-14 15:17:10', 1, '2023-02-14 15:19:57'),
(9, '21212', 'Laptot', 'A', 29, '0.00', 0, 1, '2023-02-14 15:17:24', NULL, NULL),
(10, '7777', 'Impresora', 'A', 29, '0.00', 0, 1, '2023-02-14 21:44:23', 1, '2023-02-14 21:54:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `record_movements`
--

CREATE TABLE `record_movements` (
  `idrecord_movements` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `product` varchar(500) NOT NULL,
  `code_product` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `date_created` datetime NOT NULL,
  `idcreated_by` int(11) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `record_movements`
--

INSERT INTO `record_movements` (`idrecord_movements`, `id_product`, `product`, `code_product`, `type`, `quantity`, `date_created`, `idcreated_by`, `category`) VALUES
(7, 9, 'Laptot', '21212', 'Income', '1.00', '2023-02-14 15:21:03', 1, 'Tecnologia'),
(8, 7, 'Celular', '12345', 'Income', '2.00', '2023-02-14 15:21:03', 1, 'Tecnologia'),
(9, 8, 'Coca Cola', '221212', 'Income', '1.00', '2023-02-14 15:21:03', 1, 'Alimentos'),
(10, 9, 'Laptot', '21212', 'Exit', '1.00', '2023-02-14 15:34:30', 1, 'Tecnologia'),
(11, 8, 'Coca Cola', '221212', 'Exit', '1.00', '2023-02-14 15:34:30', 1, 'Alimentos'),
(12, 8, 'Coca Cola', '221212', 'Income', '12.00', '2023-02-14 15:44:08', 1, 'Alimentos'),
(13, 8, 'Coca Cola', '221212', 'Exit', '2.00', '2023-02-14 15:44:24', 1, 'Alimentos'),
(14, 9, 'Laptot', '21212', 'Income', '1.00', '2023-02-14 21:59:27', 1, 'Tecnologia'),
(15, 10, 'Impresora', '7777', 'Income', '1.00', '2023-02-14 21:59:27', 1, 'Tecnologia'),
(16, 9, 'Laptot', '21212', 'Exit', '1.00', '2023-02-14 21:59:45', 1, 'Tecnologia'),
(17, 10, 'Impresora', '7777', 'Exit', '1.00', '2023-02-14 21:59:45', 1, 'Tecnologia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `iduser` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `nombres` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`iduser`, `email`, `password`, `nombres`) VALUES
(1, 'admin@admin.com', '$2y$10$AW.xgHRlBeHnzKAt77x0I.x3MFA9azL9DzZ1R3.abnnlLflrfglpS', 'Juan Rolando Cedeño Navarrete');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Juan Rolando', 'admin@admin.com', NULL, '$2y$10$7mE1fZ9RE.gl/BmTrX7Je.w1DTTxgiOsXocakGtHQ6IhzHSVEzhYO', NULL, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`idcategory`);

--
-- Indices de la tabla `detail_exit`
--
ALTER TABLE `detail_exit`
  ADD PRIMARY KEY (`iddetail_exit`);

--
-- Indices de la tabla `detail_income`
--
ALTER TABLE `detail_income`
  ADD PRIMARY KEY (`iddetail_income`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `head_exit`
--
ALTER TABLE `head_exit`
  ADD PRIMARY KEY (`idhead_exit`);

--
-- Indices de la tabla `head_income`
--
ALTER TABLE `head_income`
  ADD PRIMARY KEY (`idhead_income`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`);

--
-- Indices de la tabla `record_movements`
--
ALTER TABLE `record_movements`
  ADD PRIMARY KEY (`idrecord_movements`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `idcategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `detail_exit`
--
ALTER TABLE `detail_exit`
  MODIFY `iddetail_exit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `detail_income`
--
ALTER TABLE `detail_income`
  MODIFY `iddetail_income` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `head_exit`
--
ALTER TABLE `head_exit`
  MODIFY `idhead_exit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `head_income`
--
ALTER TABLE `head_income`
  MODIFY `idhead_income` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `record_movements`
--
ALTER TABLE `record_movements`
  MODIFY `idrecord_movements` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
