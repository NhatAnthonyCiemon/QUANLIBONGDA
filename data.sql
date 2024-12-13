-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: football
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `goal`
--

DROP TABLE IF EXISTS `goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goal` (
  `schedule_id` int NOT NULL,
  `player_id` int DEFAULT NULL,
  `goal_type` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `goal_time` int NOT NULL,
  PRIMARY KEY (`schedule_id`,`goal_time`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `goal_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`),
  CONSTRAINT `goal_ibfk_2` FOREIGN KEY (`schedule_id`) REFERENCES `match_schedule` (`schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goal`
--

LOCK TABLES `goal` WRITE;
/*!40000 ALTER TABLE `goal` DISABLE KEYS */;
INSERT INTO `goal` VALUES (535,189,'Ghi bàn',15),(535,189,'Ghi bàn',24),(537,211,'Ghi bàn',30),(537,212,'Penalty',60),(538,181,'Ghi bàn',70),(539,205,'Penalty',41),(539,211,'Penalty',61),(541,252,'Ghi bàn',21),(541,207,'Ghi bàn',23),(541,217,'Penalty',44),(542,216,'Ghi bàn',21),(542,218,'Ghi bàn',80),(543,190,'Ghi bàn',23),(543,196,'Penalty',44),(543,200,'Ghi bàn',70),(544,182,'Ghi bàn',34),(544,194,'Ghi bàn',41),(544,195,'Penalty',44),(544,183,'Ghi bàn',60),(544,184,'Ghi bàn',71),(544,200,'Ghi bàn',77),(545,233,'Ghi bàn',43),(545,235,'Ghi bàn',69),(546,232,'Ghi bàn',13),(546,235,'Phản lưới',45),(546,189,'Ghi bàn',51),(547,175,'Penalty',23),(547,183,'Ghi bàn',45),(547,248,'Ghi bàn',50),(547,250,'Penalty',68),(547,251,'Ghi bàn',83),(550,209,'Penalty',23),(551,182,'Ghi bàn',66),(552,232,'Ghi bàn',14),(552,200,'Ghi bàn',31),(552,194,'Penalty',49),(552,196,'Ghi bàn',88),(553,200,'Ghi bàn',41),(553,170,'Ghi bàn',53),(553,201,'Ghi bàn',61),(553,178,'Ghi bàn',67),(553,198,'Penalty',89),(554,233,'Ghi bàn',13),(554,234,'Phản lưới',45),(554,235,'Ghi bàn',78);
/*!40000 ALTER TABLE `goal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_schedule`
--

DROP TABLE IF EXISTS `match_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_schedule` (
  `schedule_id` int NOT NULL,
  `season` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `round` int DEFAULT NULL,
  `team_1` int DEFAULT NULL,
  `team_2` int DEFAULT NULL,
  `match_time` datetime DEFAULT NULL,
  `result` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stadium` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `season` (`season`),
  KEY `team_1` (`team_1`),
  KEY `team_2` (`team_2`),
  CONSTRAINT `match_schedule_ibfk_1` FOREIGN KEY (`season`) REFERENCES `season` (`season`),
  CONSTRAINT `match_schedule_ibfk_2` FOREIGN KEY (`team_1`) REFERENCES `team` (`team_id`),
  CONSTRAINT `match_schedule_ibfk_3` FOREIGN KEY (`team_2`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_schedule`
--

LOCK TABLES `match_schedule` WRITE;
/*!40000 ALTER TABLE `match_schedule` DISABLE KEYS */;
INSERT INTO `match_schedule` VALUES (535,'2023-2024',1,12,15,'2023-06-12 19:30:00','2-0','Sân Thống Nhất'),(536,'2023-2024',6,15,12,'2024-01-07 19:30:00','1-0','Sân Cao Lãnh'),(537,'2023-2024',1,13,14,'2023-06-16 20:00:00','2-0','Sân Cẩm Phả'),(538,'2023-2024',2,11,15,'2023-06-18 19:00:00','1-0','Sân Tam Kỳ'),(539,'2023-2024',2,12,13,'2023-07-10 20:00:00','0-2','Sân Thống Nhất'),(540,'2023-2024',3,11,14,'2023-08-28 19:30:00','0-0','Sân Tam Kỳ'),(541,'2023-2024',3,15,13,'2023-09-07 20:00:00','1-2','Sân Cao Lãnh'),(542,'2023-2024',4,11,13,'2023-09-26 19:30:00','0-2','Sân Tam Kỳ'),(543,'2023-2024',4,14,12,'2023-10-01 19:00:00','0-3','Sân Long An'),(544,'2023-2024',5,11,12,'2023-10-11 20:00:00','3-3','Sân Tam Kỳ'),(545,'2023-2024',5,14,15,'2023-10-26 20:00:00','2-0','Sân Long An'),(546,'2023-2024',6,14,13,'2024-01-18 20:00:00','1-2','Sân Long An'),(547,'2023-2024',7,15,11,'2024-01-28 19:00:00','3-2','Sân Cao Lãnh'),(548,'2023-2024',7,13,12,'2024-03-16 19:00:00','0-0','Sân Cẩm Phả'),(549,'2023-2024',8,14,11,'2024-03-22 19:00:00','0-0','Sân Long An'),(550,'2023-2024',8,13,15,'2024-03-23 19:30:00','1-0','Sân Cẩm Phả'),(551,'2023-2024',9,13,11,'2024-03-25 19:30:00','0-1','Sân Cẩm Phả'),(552,'2023-2024',9,12,14,'2024-04-22 19:30:00','3-1','Sân Thống Nhất'),(553,'2023-2024',10,12,11,'2024-04-23 19:30:00','3-2','Sân Thống Nhất'),(554,'2023-2024',10,15,14,'2024-05-28 19:30:00','1-2','Sân Cao Lãnh');
/*!40000 ALTER TABLE `match_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `player_id` int NOT NULL,
  `player_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `note` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `player_type` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  `ao_number` int DEFAULT NULL,
  PRIMARY KEY (`player_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `player_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (168,'Nguyễn Hồng Quân','1994-03-19','Tiền vệ','Trong nước',11,1),(169,'Trần Minh Dũng','1997-07-14','Tiền đạo','Trong nước',11,2),(170,'Lê Quốc Hưng','1995-05-10','Hậu vệ','Trong nước',11,3),(171,'Phạm Quốc Tý','1996-12-13','Thủ môn','Trong nước',11,4),(172,'Bùi Thiên Trí','1994-11-02','Tiền vệ','Trong nước',11,5),(173,'Nguyễn Minh Hoàng','1998-08-16','Tiền đạo','Trong nước',11,6),(174,'Vũ Minh Long','1995-10-18','Hậu vệ','Trong nước',11,7),(175,'Đoàn Hồng Sơn','1996-05-09','Tiền vệ','Trong nước',11,8),(176,'Nguyễn Thanh Hậu','1997-01-02','Thủ môn','Trong nước',11,9),(177,'Trần Lan Hải','1995-04-08','Tiền đạo','Trong nước',11,10),(178,'Lý Quang Anh','1994-08-11','Tiền vệ','Trong nước',11,11),(179,'Nguyễn Quốc Tiến','1996-09-20','Hậu vệ','Trong nước',11,12),(180,'Hoàng Quang Thắng','1997-02-25','Tiền đạo','Trong nước',11,13),(181,'Bùi Quang Kiệt','1994-12-15','Thủ môn','Trong nước',11,14),(182,'Juan Torres','1995-03-08','Tiền đạo','Nước ngoài',11,15),(183,'Lucas Martinez','1996-07-01','Hậu vệ','Nước ngoài',11,16),(184,'Felipe Rocha','1997-05-18','Tiền vệ','Nước ngoài',11,17),(185,'Nguyễn Thanh Tường','1995-09-03','Tiền vệ','Trong nước',12,1),(186,'Trần Minh Hoàn','1997-04-17','Tiền đạo','Trong nước',12,2),(187,'Lê Quang Sơn','1994-06-26','Hậu vệ','Trong nước',12,3),(188,'Phạm Quốc Bình','1996-12-22','Thủ môn','Trong nước',12,4),(189,'Bùi Minh Tiến','1995-05-14','Tiền vệ','Trong nước',12,5),(190,'Nguyễn Thiên Quân','1998-11-11','Tiền đạo','Trong nước',12,6),(191,'Vũ Minh Tuấn','1994-10-09','Hậu vệ','Trong nước',12,7),(192,'Đoàn Thanh Phúc','1996-01-03','Tiền vệ','Trong nước',12,8),(193,'Nguyễn Thanh Hoàng','1997-07-15','Thủ môn','Trong nước',12,9),(194,'Trần Quốc Trí','1995-11-30','Tiền đạo','Trong nước',12,10),(195,'Lý Minh Thắng','1994-02-05','Tiền vệ','Trong nước',12,11),(196,'Nguyễn Thanh Sơn','1996-08-18','Hậu vệ','Trong nước',12,12),(197,'Hoàng Quang Bình','1997-04-02','Tiền đạo','Trong nước',12,13),(198,'Bùi Thanh Duy','1994-07-21','Thủ môn','Trong nước',12,14),(199,'Antonio Carvalho','1995-01-11','Tiền vệ','Nước ngoài',12,15),(200,'Gabriel Navarro','1996-08-24','Hậu vệ','Nước ngoài',12,16),(201,'Felipe Gonzales','1997-09-09','Tiền đạo','Nước ngoài',12,17),(202,'Nguyễn Quốc Bảo','1995-03-23','Tiền vệ','Trong nước',13,1),(203,'Trần Minh Tâm','1997-05-15','Tiền đạo','Trong nước',13,2),(204,'Lê Quang Sơn','1994-06-10','Hậu vệ','Trong nước',13,3),(205,'Phạm Hữu Lộc','1996-11-06','Thủ môn','Trong nước',13,4),(206,'Bùi Quang Đoàn','1995-09-22','Tiền vệ','Trong nước',13,5),(207,'Nguyễn Thiên An','1998-07-10','Tiền đạo','Trong nước',13,6),(208,'Vũ Minh Triều','1994-08-25','Hậu vệ','Trong nước',13,7),(209,'Đoàn Quốc Khoa','1996-05-02','Tiền vệ','Trong nước',13,8),(210,'Nguyễn Thanh Duy','1997-02-14','Thủ môn','Trong nước',13,9),(211,'Trần Lan Quân','1995-01-10','Tiền đạo','Trong nước',13,10),(212,'Lý Minh Bình','1994-04-11','Tiền vệ','Trong nước',13,11),(213,'Nguyễn Thanh Tùng','1996-12-02','Hậu vệ','Trong nước',13,12),(214,'Hoàng Quang Phúc','1997-03-05','Tiền đạo','Trong nước',13,13),(215,'Bùi Minh Sơn','1994-07-13','Thủ môn','Trong nước',13,14),(216,'Carlos Martinez','1995-09-17','Tiền vệ','Nước ngoài',13,15),(217,'David Hernandez','1996-11-04','Hậu vệ','Nước ngoài',13,16),(218,'Marcus Silva','1997-05-12','Tiền đạo','Nước ngoài',13,17),(219,'Nguyễn Minh Thi','1994-01-18','Tiền vệ','Trong nước',14,1),(220,'Trần Quang Thiên','1997-02-07','Tiền đạo','Trong nước',14,2),(221,'Lê Quang Anh','1995-08-06','Hậu vệ','Trong nước',14,3),(222,'Phạm Thanh Khoa','1996-03-22','Thủ môn','Trong nước',14,4),(223,'Bùi Quang Tân','1995-10-13','Tiền vệ','Trong nước',14,5),(224,'Nguyễn Thiên Tín','1998-09-05','Tiền đạo','Trong nước',14,6),(225,'Vũ Minh Hiếu','1994-07-24','Hậu vệ','Trong nước',14,7),(226,'Đoàn Quốc Kiên','1996-11-28','Tiền vệ','Trong nước',14,8),(227,'Nguyễn Thanh Linh','1997-01-09','Thủ môn','Trong nước',14,9),(228,'Trần Lan Tài','1995-04-25','Tiền đạo','Trong nước',14,10),(229,'Lý Quang Tuấn','1994-12-14','Tiền vệ','Trong nước',14,11),(230,'Nguyễn Thanh Hải','1996-05-04','Hậu vệ','Trong nước',14,12),(231,'Hoàng Minh Kiên','1997-06-30','Tiền đạo','Trong nước',14,13),(232,'Bùi Thanh Anh','1994-08-20','Thủ môn','Trong nước',14,14),(233,'Juan Carlos','1995-05-18','Tiền đạo','Nước ngoài',14,15),(234,'Lucas Garcia','1996-02-21','Hậu vệ','Nước ngoài',14,16),(235,'Felipe Mendes','1997-11-10','Tiền vệ','Nước ngoài',14,17),(236,'Nguyễn Hữu Tài','1995-03-02','Tiền vệ','Trong nước',15,1),(237,'Trần Quang Duy','1997-12-06','Tiền đạo','Trong nước',15,2),(238,'Lê Minh Thành','1994-06-30','Hậu vệ','Trong nước',15,3),(239,'Phạm Thanh Hải','1996-08-19','Thủ môn','Trong nước',15,4),(240,'Bùi Minh Tân','1995-11-14','Tiền vệ','Trong nước',15,5),(241,'Nguyễn Thiên Tiến','1998-10-23','Tiền đạo','Trong nước',15,6),(242,'Vũ Quang Khoa','1994-09-28','Hậu vệ','Trong nước',15,7),(243,'Đoàn Minh Lộc','1996-07-12','Tiền vệ','Trong nước',15,8),(244,'Nguyễn Thanh Quân','1997-04-17','Thủ môn','Trong nước',15,9),(245,'Trần Thiên Tín','1995-03-11','Tiền đạo','Trong nước',15,10),(246,'Lý Minh Quân','1994-01-29','Tiền vệ','Trong nước',15,11),(247,'Nguyễn Quốc Khang','1996-06-09','Hậu vệ','Trong nước',15,12),(248,'Hoàng Quốc Hưng','1997-05-25','Tiền đạo','Trong nước',15,13),(249,'Bùi Quang Duy','1994-10-10','Thủ môn','Trong nước',15,14),(250,'Antonio Gomez','1995-07-05','Tiền đạo','Nước ngoài',15,15),(251,'Gabriel Hernandez','1996-09-03','Hậu vệ','Nước ngoài',15,16),(252,'Felipe Silva','1997-11-14','Tiền vệ','Nước ngoài',15,17);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player_type`
--

DROP TABLE IF EXISTS `player_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player_type` (
  `player_type_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`player_type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player_type`
--

LOCK TABLES `player_type` WRITE;
/*!40000 ALTER TABLE `player_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `player_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `season`
--

DROP TABLE IF EXISTS `season`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `season` (
  `season` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`season`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `season`
--

LOCK TABLES `season` WRITE;
/*!40000 ALTER TABLE `season` DISABLE KEYS */;
INSERT INTO `season` VALUES ('2023-2024');
/*!40000 ALTER TABLE `season` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standards`
--

DROP TABLE IF EXISTS `standards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `standards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `loaicauthu` varchar(100) DEFAULT NULL,
  `age_max` int DEFAULT NULL,
  `age_min` int DEFAULT NULL,
  `num_max` int DEFAULT NULL,
  `num_min` int DEFAULT NULL,
  `foreign_max` int DEFAULT NULL,
  `max_goal_time` int DEFAULT NULL,
  `goal_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standards`
--

LOCK TABLES `standards` WRITE;
/*!40000 ALTER TABLE `standards` DISABLE KEYS */;
INSERT INTO `standards` VALUES (18,'Trong nước, Nước ngoài',30,16,22,15,3,57,'Ghi bàn, Penalty, Phản');
/*!40000 ALTER TABLE `standards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_id` int NOT NULL,
  `team_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `home_stadium` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `season` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`team_id`),
  KEY `season` (`season`),
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`season`) REFERENCES `season` (`season`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (11,'Quảng Nam','Sân Tam Kỳ','quangnam@example.com','2023-2024'),(12,'CLB TP Hồ Chí Minh','Sân Thống Nhất','tphochiminh@example.com','2023-2024'),(13,'Than Quảng Ninh','Sân Cẩm Phả','thanqn@example.com','2023-2024'),(14,'Long An','Sân Long An','longan@example.com','2023-2024'),(15,'Đồng Tháp','Sân Cao Lãnh','dongthap@example.com','2023-2024');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-13 20:44:44
