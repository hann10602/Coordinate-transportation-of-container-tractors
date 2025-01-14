-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: gorm
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `total_price` bigint NOT NULL,
  `delivery_date` datetime(3) DEFAULT NULL,
  `current_position` tinyint NOT NULL,
  `detail_address` varchar(255) NOT NULL,
  `note` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  `type` varchar(10) NOT NULL,
  `truck_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `port_id` bigint DEFAULT NULL,
  `customer_warehouse_id` bigint DEFAULT NULL,
  `start_trailer_id` bigint DEFAULT NULL,
  `end_trailer_id` bigint DEFAULT NULL,
  `container_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dump_container_dump` (`container_id`),
  KEY `fk_dump_customer_warehouse` (`customer_warehouse_id`),
  KEY `fk_truck_port_dump` (`truck_id`),
  KEY `fk_user_orders` (`user_id`),
  KEY `fk_dump_port_dump` (`port_id`),
  KEY `fk_dump_start_trailer_dump` (`start_trailer_id`),
  KEY `fk_dump_end_trailer_dump` (`end_trailer_id`),
  CONSTRAINT `fk_dump_container_dump` FOREIGN KEY (`container_id`) REFERENCES `dump` (`id`),
  CONSTRAINT `fk_dump_customer_warehouse` FOREIGN KEY (`customer_warehouse_id`) REFERENCES `dump` (`id`),
  CONSTRAINT `fk_dump_end_trailer_dump` FOREIGN KEY (`end_trailer_id`) REFERENCES `dump` (`id`),
  CONSTRAINT `fk_dump_port_dump` FOREIGN KEY (`port_id`) REFERENCES `dump` (`id`),
  CONSTRAINT `fk_dump_start_trailer_dump` FOREIGN KEY (`start_trailer_id`) REFERENCES `dump` (`id`),
  CONSTRAINT `fk_truck_port_dump` FOREIGN KEY (`truck_id`) REFERENCES `truck` (`id`),
  CONSTRAINT `fk_user_orders` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (136,'2025-02-15 05:55:25.328','2025-02-15 07:55:11.877',311282,'2025-01-10 00:00:00.000',0,'d','f','Pending','IE',NULL,1,NULL,46,15,18,32),(137,'2025-02-15 06:46:38.789','2025-02-15 07:55:11.893',721140,'2025-01-11 00:00:00.000',0,'d','f','Pending','IE',NULL,1,NULL,45,15,23,37),(138,'2025-02-15 06:49:45.261','2025-02-15 07:55:11.898',694489,'2025-01-10 00:00:00.000',0,'b','b','Pending','IE',NULL,1,NULL,46,15,25,39),(139,'2025-02-15 06:53:11.840','2025-02-15 07:55:11.902',689986,'2025-01-09 00:00:00.000',0,'g','r','Pending','IE',NULL,1,NULL,47,15,23,37),(140,'2025-02-15 07:17:16.694','2025-02-15 07:55:11.905',689986,'2025-01-09 00:00:00.000',0,'g','r','Pending','IE',NULL,1,NULL,47,15,23,37),(141,'2025-02-15 07:56:55.714',NULL,689986,'2025-01-09 00:00:00.000',0,'g','r','Pending','IE',NULL,1,NULL,47,15,23,37),(142,'2025-02-15 07:56:57.590',NULL,689986,'2025-01-09 00:00:00.000',0,'g','r','Pending','IE',NULL,1,NULL,47,15,23,37),(143,'2025-02-15 07:56:57.640',NULL,689986,'2025-01-09 00:00:00.000',0,'g','r','Pending','IE',NULL,1,NULL,47,15,23,37);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-06  0:37:41
