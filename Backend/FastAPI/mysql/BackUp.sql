-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: funiber
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--
DROP DATABASE IF EXISTS `funiber`;
DROP SCHEMA IF EXISTS `funiber`;
CREATE SCHEMA `funiber` ;
USE `funiber`;
DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Catego1',1,'2023-02-09 16:48:23','2023-02-09 16:48:23'),(2,'Catego2',1,'2023-02-09 16:51:01','2023-02-09 16:51:01'),(3,'Catego3',1,'2023-02-09 16:52:45','2023-02-09 16:52:45'),(4,'Catego44',0,'2023-02-09 16:52:45','2023-02-10 16:43:16'),(5,'Category_',0,'2023-02-15 10:53:27','2023-02-15 11:37:41'),(6,'Catego4',1,'2023-02-15 11:42:47','2023-02-15 11:42:47'),(7,'Catego6',1,'2023-02-15 15:09:36','2023-02-15 15:09:36');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_history`
--

DROP TABLE IF EXISTS `product_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `stock` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producthistory_product_id` (`product_id`),
  KEY `producthistory_category_id` (`category_id`),
  CONSTRAINT `product_history_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `product_history_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_history`
--

LOCK TABLES `product_history` WRITE;
/*!40000 ALTER TABLE `product_history` DISABLE KEYS */;
INSERT INTO `product_history` VALUES (13,4,'jr2345','jordan_',1,1,'2023-02-10 16:39:25','2023-02-10 16:39:25'),(14,4,'jr2345','jordan',1,1,'2023-02-10 16:39:25','2023-02-10 16:39:25'),(15,4,'jr345','jordan',1,1,'2023-02-10 16:43:01','2023-02-10 16:43:01'),(16,5,'j12345','jordan',3,0,'2023-02-10 16:45:03','2023-02-10 16:45:03'),(17,5,'j12345','jordan',3,0,'2023-02-15 08:40:33','2023-02-15 08:40:33'),(18,6,'J11','jordan',3,0,'2023-02-15 08:40:33','2023-02-15 08:40:33'),(19,13,'QP1516','Prueba Again',1,0,'2023-02-15 08:40:33','2023-02-15 08:40:33'),(20,13,'QP1516','Prueba Actualizacion',2,1,'2023-02-15 08:40:33','2023-02-15 08:40:33'),(21,8,'S12','jordan',3,0,'2023-02-15 15:09:36','2023-02-15 15:09:36'),(22,12,'QP145','Otra Actual',3,0,'2023-02-15 15:09:36','2023-02-15 15:09:36');
/*!40000 ALTER TABLE `product_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_measurements`
--

DROP TABLE IF EXISTS `product_measurements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_measurements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `depth` decimal(5,2) NOT NULL,
  `width` decimal(5,2) NOT NULL,
  `height` decimal(5,2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productmeasurement_product_id` (`product_id`),
  CONSTRAINT `product_measurements_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_measurements`
--

LOCK TABLES `product_measurements` WRITE;
/*!40000 ALTER TABLE `product_measurements` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_measurements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `stock` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_code` (`code`),
  KEY `product_category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'12345x','jordan',4,1,'2023-02-10 12:39:14','2023-02-10 16:31:25',0),(4,'jr345','jordan',1,1,'2023-02-10 13:10:19','2023-02-10 16:43:52',0),(5,'j12345','jordan',3,0,'2023-02-10 13:10:19','2023-02-15 08:41:59',0),(6,'J11','jordan',3,0,'2023-02-10 13:46:48','2023-02-15 08:46:30',0),(7,'S1','jordan',3,0,'2023-02-10 14:00:47','2023-02-10 14:09:38',0),(8,'S12','jordan',3,0,'2023-02-10 14:05:58','2023-02-15 15:10:14',0),(9,'S123','jordan',3,0,'2023-02-10 14:09:00','2023-02-10 14:09:00',1),(10,'QP123','Pruebas de Ingreso',1,0,'2023-02-15 08:40:33','2023-02-15 08:40:33',1),(11,'QP124','Actualizacion',2,0,'2023-02-15 08:40:33','2023-02-15 08:40:33',1),(12,'QP145','Otra Actual',1,1,'2023-02-15 08:40:33','2023-02-15 15:10:32',1),(13,'QP1516','Prueba Actualizacion',2,1,'2023-02-15 08:40:33','2023-02-15 09:50:52',0),(14,'PLSO','PRUENAS NUEVA CATEGORIA',6,0,'2023-02-15 11:42:47','2023-02-15 11:42:47',1),(15,'FG','Pruebas',1,0,'2023-02-15 15:09:36','2023-02-15 15:09:36',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `unid` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stock_type_id` (`type_id`),
  CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type_moves` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_moves`
--

DROP TABLE IF EXISTS `type_moves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_moves` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_moves`
--

LOCK TABLES `type_moves` WRITE;
/*!40000 ALTER TABLE `type_moves` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_moves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'jordan_r_a@hotmail.es','$2b$12$Xz2b.7xIuzjB9GW2f2ToIekEwOWjyVXLM2KF/XqbErPuBkayECueO',1,'2023-02-15 08:40:33','2023-02-15 08:40:33');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-15 15:14:46
select * from categories;