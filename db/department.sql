-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para department
CREATE DATABASE IF NOT EXISTS `department` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `department`;

-- Volcando estructura para tabla department.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla department.cache: ~0 rows (aproximadamente)

-- Volcando estructura para tabla department.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla department.cache_locks: ~0 rows (aproximadamente)

-- Volcando estructura para tabla department.departments
CREATE TABLE IF NOT EXISTS `departments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `up_department_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `embassador` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int NOT NULL,
  `employees` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `departments_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla department.departments: ~23 rows (aproximadamente)
INSERT INTO `departments` (`id`, `up_department_id`, `name`, `embassador`, `level`, `employees`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 2, 'AUTOMOTIVE BODY REPAIRER', 'Luciano', 10, 8674, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(2, 2, 'CHIROPRACTOR', 'Herminio', 9, 8198, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(3, 3, 'COMMERCIAL AND INDUSTRIAL DESIGNER', 'Vella', 10, 9062, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(4, 5, 'EXPLOSIVES EXPERT', 'Trystan', 3, 2289, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(5, 2, 'HEALTH EDUCATOR', 'Sylvester', 2, 4406, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(6, 5, 'EDUCATION ADMINISTRATOR', 'Jocelyn', 5, 5464, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(7, 2, 'ANTHROPOLOGIST OR ARCHEOLOGIST', 'Mustafa', 6, 6652, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(8, 3, 'PETROLEUM PUMP SYSTEM OPERATOR', 'Myles', 7, 8616, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(9, 2, 'MILITARY OFFICER', 'Leonardo', 2, 1983, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(10, 1, 'AIRFIELD OPERATIONS SPECIALIST', 'Cali', 10, 6925, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(11, 1, 'LOAN OFFICER', 'Lila', 2, 664, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(12, 2, 'WIND INSTRUMENT REPAIRER', 'Amelia', 9, 3954, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(13, 4, 'SET DESIGNER', 'Dorian', 2, 2467, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(14, 4, 'MAKEUP ARTISTS', 'Antonetta', 1, 8195, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(15, 3, 'RANGE MANAGER', 'Edmond', 3, 9253, '2024-06-23 00:56:10', '2024-06-23 06:49:06', '2024-06-23 06:49:06'),
	(16, 5, 'RESPIRATORY THERAPY TECHNICIAN', 'Kevin', 3, 3206, '2024-06-23 00:56:10', '2024-06-23 05:23:39', '2024-06-23 05:23:39'),
	(17, 1, 'COMPACTING MACHINE OPERATOR', 'Lilliana', 8, 5868, '2024-06-23 00:56:10', '2024-06-23 06:49:06', '2024-06-23 06:49:06'),
	(18, 5, 'FASHION MODEL', 'Wayne', 1, 8011, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(19, 4, 'WORD PROCESSORS AND TYPIST', 'Alfred', 1, 8530, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(20, 4, 'COMPUTER HARDWARE ENGINEER', 'D\'angelo', 7, 8416, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(21, 3, 'ROUSTABOUTS', 'Jerrod', 8, 2316, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(22, NULL, 'GENERAL DIRECTION', 'MARIA CASANOVA', 4, 7634, '2024-06-23 00:57:13', '2024-06-23 00:57:13', NULL),
	(23, NULL, 'GENERAL DIRECTIONa', 'MARIA CASANOVA', 5, 108, '2024-06-23 04:47:48', '2024-06-23 05:21:08', '2024-06-23 05:21:08');

-- Volcando estructura para tabla department.detail_departments
CREATE TABLE IF NOT EXISTS `detail_departments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `department_id` bigint unsigned NOT NULL,
  `department_assigment_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla department.detail_departments: ~10 rows (aproximadamente)
INSERT INTO `detail_departments` (`id`, `department_id`, `department_assigment_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 2, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(2, 3, 4, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(3, 5, 6, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(4, 7, 8, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(5, 9, 10, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(6, 11, 12, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(7, 13, 14, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(8, 15, 16, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(9, 17, 18, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL),
	(10, 19, 20, '2024-06-23 00:56:10', '2024-06-23 00:56:10', NULL);

-- Volcando estructura para tabla department.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla department.migrations: ~4 rows (aproximadamente)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000001_create_cache_table', 1),
	(2, '2024_06_20_003301_create_departments_table', 1),
	(3, '2024_06_20_004559_create_detail_deparments_table', 1),
	(4, '2024_06_20_170725_create_sessions_table', 1);

-- Volcando estructura para tabla department.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla department.sessions: ~2 rows (aproximadamente)
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('3xVMgt8sQ3vUn0TNWxgSZ2Ymc3cfVsCw0jH76FG4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN0RyTm9aM0dCbWFuc1dQRFJQWU1obmJBQ1ltTGpQVnR0dDVaOFFwRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1719108855),
	('OUxYOWNzcsLOVLHdLFZOoiuqZqQb2i96HocfqEAX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidGVGVGw5Z3hTWXBjR1h0NDd5cnVHMkhYQUtsR1JnVVFCa3NZZWJVbiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NTM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9vcmdhbml6YWNpb24/cGFnZT0xJnBlcl9wYWdlPTEwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1719107767);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
