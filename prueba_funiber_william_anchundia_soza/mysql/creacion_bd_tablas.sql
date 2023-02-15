CREATE DATABASE `prueba` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `nombres` varchar(500) NOT NULL,
  `apellidos` varchar(500) NOT NULL,
  `password` varchar(600) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL AUTO_INCREMENT,
  `code_product` varchar(100) NOT NULL,
  `name_product` varchar(400) NOT NULL,
  `id_category_product` int(11) NOT NULL,
  `has_stock` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `historyproduct` (
  `id_history_product` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `code_product` varchar(100) NOT NULL,
  `name_product` varchar(400) NOT NULL,
  `id_category_product` int(11) NOT NULL,
  `email_update` varchar(100) NOT NULL,
  `date_update` datetime NOT NULL,
  PRIMARY KEY (`id_history_product`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `categoryproduct` (
  `id_category_product` int(11) NOT NULL AUTO_INCREMENT,
  `name_category_product` varchar(400) NOT NULL,
  PRIMARY KEY (`id_category_product`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;