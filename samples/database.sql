-- --------------------------------------------------------
-- Servidor:                     database.c4gffxjofhme.us-east-1.rds.amazonaws.com
-- Versão do servidor:           8.0.28 - Source distribution
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              12.1.0.6562
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para verzel
CREATE DATABASE IF NOT EXISTS `verzel` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `verzel`;

-- Copiando estrutura para tabela verzel.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela verzel.brands: ~0 rows (aproximadamente)
DELETE FROM `brands`;
INSERT INTO `brands` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Marca 01', '2022-10-31 20:02:47', '2022-10-31 20:02:47'),
	(2, 'Marca 02', '2022-10-31 20:04:06', '2022-10-31 20:04:06'),
	(3, 'Marca 03', '2022-10-31 20:04:19', '2022-10-31 20:04:19');

-- Copiando estrutura para tabela verzel.cars
CREATE TABLE IF NOT EXISTS `cars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `model` int DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `km` int DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `brandId` int DEFAULT NULL,
  `storeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `brandId` (`brandId`),
  KEY `storeId` (`storeId`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `cars_ibfk_2` FOREIGN KEY (`storeId`) REFERENCES `stores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela verzel.cars: ~0 rows (aproximadamente)
DELETE FROM `cars`;
INSERT INTO `cars` (`id`, `name`, `model`, `price`, `km`, `desc`, `image`, `createdAt`, `updatedAt`, `brandId`, `storeId`) VALUES
	(1, 'Carro 01', 2000, 50000, 10000, 'descrição do carro 01', 'https://www.kbb.com/wp-content/uploads/2020/04/2005-toyota-camry-front-left.jpg', '2022-10-31 20:06:17', '2022-10-31 20:09:28', 1, 1),
	(2, 'Carro 02', 2000, 70000, 20000, 'descrição do carro 02', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzsjiolUlnZJZPfZBVp4F_gheyR7gXWn7oIFl-McIpMHFYUwxSsydDqSpwon7snKRRtE&usqp=CAU', '2022-10-31 20:06:42', '2022-10-31 20:08:51', 2, 2),
	(3, 'Carro 03', 2001, 55000, 5000, 'descrição do carro 03', 'https://images.autotrader.com/hn/c/bd3aa903d4824b5fa53e8962d42eb93c.jpg', '2022-10-31 20:07:06', '2022-10-31 20:10:11', 3, 6);

-- Copiando estrutura para tabela verzel.stores
CREATE TABLE IF NOT EXISTS `stores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela verzel.stores: ~0 rows (aproximadamente)
DELETE FROM `stores`;
INSERT INTO `stores` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'MG', '2022-10-31 20:02:58', '2022-10-31 20:02:58'),
	(2, 'SP', '2022-10-31 20:03:06', '2022-10-31 20:03:06'),
	(3, 'Filial 01', '2022-10-31 20:03:23', '2022-10-31 20:03:23'),
	(4, 'RJ', '2022-10-31 20:03:30', '2022-10-31 20:03:30'),
	(5, 'PR', '2022-10-31 20:04:47', '2022-10-31 20:04:47'),
	(6, 'AM', '2022-10-31 20:04:50', '2022-10-31 20:04:50'),
	(7, 'Filial 02', '2022-10-31 20:05:04', '2022-10-31 20:05:14');

-- Copiando estrutura para tabela verzel.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `access` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela verzel.users: ~2 rows (aproximadamente)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `name`, `password`, `email`, `access`, `createdAt`, `updatedAt`) VALUES
	(4, 'admin', 'admin', 'admin@admin.com', 'admin', '2022-10-31 18:37:52', '2022-10-31 18:37:52'),
	(5, 'user', 'user', 'user@user.com', 'user', '2022-10-31 20:05:42', '2022-10-31 20:11:44');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
