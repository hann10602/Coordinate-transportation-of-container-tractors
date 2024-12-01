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
-- Table structure for table `dump`
--

DROP TABLE IF EXISTS `dump`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dump` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `latitude` decimal(19,17) NOT NULL,
  `longitude` decimal(20,17) NOT NULL,
  `status` varchar(10) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dump`
--

LOCK TABLES `dump` WRITE;
/*!40000 ALTER TABLE `dump` DISABLE KEYS */;
INSERT INTO `dump` VALUES (1,'Hai Phong - Hai Phong',20.86513900000000000,106.68689400000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(2,'Cai Lan - Quang Ninh',20.97025600000000000,107.05109800000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(3,'Da Nang - Da Nang',16.12143900000000000,108.21563400000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(4,'Chan May - Thua Thien Hue',16.35232000000000000,107.92169400000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(5,'Qui Nhon - Binh Dinh',13.76903600000000000,109.22384000000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(6,'Dung Quat - Quang Ngai',15.35736800000000000,108.80637200000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(7,'Ho Chi Minh City - Cat Lai Terminal',10.76921300000000000,106.78943000000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(8,'Cai Mep - Thi Vai - Ba Ria - Vung Tau',10.51385000000000000,107.02926300000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(9,'Can Tho - Can Tho',10.04450300000000000,105.77695600000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(10,'Phu My - Phu My',10.48963000000000000,107.06708900000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(11,'Vung Tau - Vung Tau',10.34559400000000000,107.08175800000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(12,'Nghi Son - Thanh Hoa',19.34565900000000000,105.77133100000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(13,'Vinh - Nghe An',18.68880100000000000,105.67364700000000000,'Working','Port','2024-12-01 04:26:19.849',NULL),(14,'Cam Ranh - Khanh Hoa',11.89856000000000000,109.18170200000000000,'Working','Port','2024-12-01 04:26:19.849',NULL);
/*!40000 ALTER TABLE `dump` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 11:27:18
