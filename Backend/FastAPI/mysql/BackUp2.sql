-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: funiber
-- ------------------------------------------------------
-- Server version	8.0.32

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
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `stock` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producthistory_product_id` (`product_id`),
  KEY `producthistory_category_id` (`category_id`),
  CONSTRAINT `product_history_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `product_history_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `depth` decimal(5,2) NOT NULL,
  `width` decimal(5,2) NOT NULL,
  `height` decimal(5,2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productmeasurement_product_id` (`product_id`),
  CONSTRAINT `product_measurements_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_measurements`
--

LOCK TABLES `product_measurements` WRITE;
/*!40000 ALTER TABLE `product_measurements` DISABLE KEYS */;
INSERT INTO `product_measurements` VALUES (15,1,20.00,30.00,20.00,'2023-02-16 17:29:53','2023-02-16 17:29:53',1),(16,4,56.00,8.00,50.00,'2023-02-16 17:29:53','2023-02-16 17:29:53',1),(17,1,22.00,22.00,22.00,'2023-02-16 17:29:53','2023-02-16 17:29:53',1),(18,12,256.00,58.00,96.00,'2023-02-16 17:29:53','2023-02-16 17:29:53',1);
/*!40000 ALTER TABLE `product_measurements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `stock` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `state` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_code` (`code`),
  KEY `product_category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'12345x','jordan',4,1,'2023-02-10 12:39:14','2023-02-10 16:31:25',0),(4,'jr345','jordan',1,1,'2023-02-10 13:10:19','2023-02-10 16:43:52',0),(5,'j12345','jordan',3,0,'2023-02-10 13:10:19','2023-02-15 08:41:59',0),(6,'J11','jordan',3,0,'2023-02-10 13:46:48','2023-02-15 08:46:30',0),(7,'S1','jordan',3,0,'2023-02-10 14:00:47','2023-02-10 14:09:38',0),(8,'S12','jordan',3,0,'2023-02-10 14:05:58','2023-02-15 15:10:14',0),(9,'S123','jordan',3,0,'2023-02-10 14:09:00','2023-02-10 14:09:00',1),(10,'QP123','Pruebas de Ingreso',1,0,'2023-02-15 08:40:33','2023-02-15 08:40:33',1),(11,'QP124','Actualizacion',2,0,'2023-02-15 08:40:33','2023-02-15 08:40:33',1),(12,'QP145','Otra Actual',1,1,'2023-02-15 08:40:33','2023-02-15 15:10:32',1),(13,'QP1516','Prueba Actualizacion',2,1,'2023-02-15 08:40:33','2023-02-15 09:50:52',0),(14,'PLSO','PRUENAS NUEVA CATEGORIA',6,0,'2023-02-15 11:42:47','2023-02-15 11:42:47',1),(15,'FG','Pruebas',1,0,'2023-02-15 15:09:36','2023-02-15 15:09:36',1),(16,'CD1','Con Docker',1,0,'2023-02-16 17:29:53','2023-02-16 17:29:53',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int NOT NULL,
  `product_id` int NOT NULL,
  `unid` int NOT NULL,
  `state` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stock_type_id` (`type_id`),
  KEY `stock_product_id` (`product_id`),
  CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type_moves` (`id`),
  CONSTRAINT `stocks_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,1,4,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(2,1,1,5,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(3,1,4,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(4,1,1,15,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(5,1,4,20,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(6,1,1,14,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(7,1,4,12,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(8,1,1,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(9,1,4,5,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(10,1,1,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(11,1,5,20,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(12,1,6,20,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(13,1,5,30,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(14,1,6,30,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(15,1,5,40,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(16,1,6,40,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(17,1,5,50,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(18,1,6,50,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(19,1,5,60,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(20,1,6,60,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(21,1,7,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(22,1,8,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(23,1,7,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(24,1,8,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(25,1,7,30,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(26,1,8,40,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(27,1,7,50,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(28,1,8,60,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(29,1,7,70,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(30,1,8,80,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(31,1,9,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(32,1,10,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(33,1,11,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(34,1,9,5,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(35,1,10,8,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(36,1,11,9,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(37,1,9,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(38,1,10,11,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(39,1,11,13,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(40,1,9,14,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(41,1,10,15,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(42,1,11,16,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(43,1,9,20,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(44,1,10,21,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(45,1,11,23,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(46,1,9,25,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(47,1,10,30,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(48,1,11,21,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(49,1,9,36,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(50,1,10,35,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(51,1,12,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(52,1,13,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(53,1,14,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(54,1,15,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(55,1,16,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(56,1,10,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(57,1,12,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(58,1,13,15,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(59,1,14,16,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(60,1,15,17,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(61,1,16,18,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(62,1,13,19,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(63,1,14,20,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(64,1,15,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(65,1,16,13,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(66,1,13,36,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(67,1,14,35,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(68,1,15,15,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(69,1,16,23,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(70,1,13,69,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(71,1,12,36,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(72,1,12,25,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(73,1,12,96,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(74,1,13,32,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(75,1,14,14,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(76,1,15,23,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(77,1,16,23,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(78,2,4,100,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(79,2,5,25,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(80,2,6,30,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(81,2,7,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(82,2,8,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(83,2,9,300,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(84,2,10,36,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(85,2,11,65,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(86,2,12,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(87,2,13,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(88,2,14,66,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(89,2,15,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(90,2,16,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(91,2,4,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(92,2,5,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(93,2,6,4,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(94,2,7,5,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(95,2,8,6,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(96,2,9,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(97,2,10,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(98,2,11,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(99,2,12,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(100,2,13,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(101,2,14,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(102,2,15,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(103,2,16,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(104,2,4,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(105,2,5,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(106,2,6,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(107,2,7,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(108,2,8,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(109,2,9,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(110,2,10,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(111,2,11,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(112,2,12,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(113,2,13,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(114,2,14,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(115,2,15,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(116,2,16,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(117,2,4,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(118,2,5,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(119,2,6,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(120,2,7,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(121,2,8,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(122,2,9,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(123,2,10,6,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(124,2,11,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(125,2,12,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(126,2,13,61,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(127,2,14,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(128,2,15,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(129,2,16,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(130,2,4,4,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(131,2,5,5,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(132,2,6,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(133,2,7,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(134,2,8,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(135,2,9,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(136,2,10,6,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(137,2,11,7,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(138,2,12,8,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(139,2,13,9,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(140,2,14,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(141,2,15,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(142,2,16,10,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(143,2,4,13,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(144,2,5,5,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(145,2,6,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(146,2,7,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(147,2,8,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(148,2,9,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(149,2,10,21,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(150,2,11,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(151,2,12,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(152,2,13,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(153,2,14,3,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(154,2,15,2,1,'2023-02-10 12:39:14','2023-02-10 12:39:14'),(155,2,16,1,1,'2023-02-10 12:39:14','2023-02-10 12:39:14');
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_moves`
--

DROP TABLE IF EXISTS `type_moves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_moves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_moves`
--

LOCK TABLES `type_moves` WRITE;
/*!40000 ALTER TABLE `type_moves` DISABLE KEYS */;
INSERT INTO `type_moves` VALUES (1,'+','Ingreso',1,'2023-02-10 13:46:48','2023-02-10 13:46:48'),(2,'-','Salida',1,'2023-02-10 13:46:48','2023-02-10 13:46:48');
/*!40000 ALTER TABLE `type_moves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2023-02-16 15:14:02
SELECT * from categories;