# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: blsi
# Generation Time: 2019-03-23 05:55:31 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table algorithm
# ------------------------------------------------------------

DROP TABLE IF EXISTS `algorithm`;

CREATE TABLE `algorithm` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `version_number` float(8,2) DEFAULT NULL,
  `description` text,
  `short_description` text,
  `date_modified` text,
  `date_created` text,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

LOCK TABLES `algorithm` WRITE;
/*!40000 ALTER TABLE `algorithm` DISABLE KEYS */;

INSERT INTO `algorithm` (`id`, `name`, `version_number`, `description`, `short_description`, `date_modified`, `date_created`)
VALUES
	(1,'NOM BLSI',0.00,'1',NULL,'Mon Mar 04 2019','Mon Mar 04 2019');

/*!40000 ALTER TABLE `algorithm` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table key
# ------------------------------------------------------------

DROP TABLE IF EXISTS `key`;

CREATE TABLE `key` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `key` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;



# Dump of table question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `algorithm_id` int(10) unsigned NOT NULL,
  `text` text NOT NULL,
  `prompt` text NOT NULL,
  `type_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `algorithm_id` (`algorithm_id`) USING BTREE,
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;

INSERT INTO `question` (`id`, `algorithm_id`, `text`, `prompt`, `type_key`)
VALUES
	(1,1,'Suspected liver or spleen injury without peritonitis?','','picklist'),
	(2,1,'Does surgeon suspect ongoing or very recent bleeding?','','picklist'),
	(3,1,'Aspartate aminotransferase greater than 200U/L?','','picklist'),
	(4,1,'Abdominal wall trauma, tenderness or distension?','','picklist'),
	(5,1,'Abnormal chest x-ray?','','picklist'),
	(6,1,'Patient complaining of abdominal pain?','','picklist'),
	(7,1,'Abnormal pancreatic enzymes?','','picklist'),
	(8,1,'Injury grade?','','picklist'),
	(9,1,'Hb >7, but close to 7?','','picklist'),
	(10,1,'Patient symptomatic?','','picklist'),
	(11,1,'Patient Hb less than 7?','','picklist'),
	(12,1,'Hb stable?','','picklist'),
	(13,1,'Vitals normal?','','picklist'),
	(14,1,'Tolerating diet?','','picklist'),
	(15,1,'Minimal abdominal pain?','','picklist'),
	(16,1,'Sustained response to LR or NS?','','picklist'),
	(17,1,'Has the patient been given 40mL/kg PRBCs? or 4 units PRBCs?','','picklist'),
	(18,1,'Recurrent hypotension?','','picklist'),
	(19,1,'Would you like to continue going through algorithm?','','picklist'),
	(20,1,'Has patient\'s Hb been stable for 18 hours?','','picklist'),
	(21,1,'Is there a sustained response to PRBCs?','','picklist'),
	(22,1,'Has the patient already had a CT Scan?','','picklist'),
	(23,1,'Abdominal wall marks?','','picklist');

/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table question_option
# ------------------------------------------------------------

DROP TABLE IF EXISTS `question_option`;

CREATE TABLE `question_option` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question_id` int(10) unsigned NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `min_value` int(11) DEFAULT NULL,
  `max_value` int(11) DEFAULT NULL,
  `is_good` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `question_id` (`question_id`) USING BTREE,
  CONSTRAINT `question_option_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

LOCK TABLES `question_option` WRITE;
/*!40000 ALTER TABLE `question_option` DISABLE KEYS */;

INSERT INTO `question_option` (`id`, `question_id`, `label`, `min_value`, `max_value`, `is_good`)
VALUES
	(1,1,'No',0,1,1),
	(2,1,'Yes',0,1,0),
	(3,2,'No',0,1,1),
	(4,2,'Yes',0,1,0),
	(5,3,'No',0,1,1),
	(6,3,'Yes',0,1,0),
	(7,4,'No',0,1,1),
	(8,4,'Yes',0,1,0),
	(9,5,'No',0,1,1),
	(10,5,'Yes',0,1,0),
	(11,6,'No',0,1,1),
	(12,6,'Yes',0,1,0),
	(13,7,'No',0,1,1),
	(14,7,'Yes',0,1,0),
	(15,8,'Good',0,1,1),
	(16,8,'Bad',0,1,0),
	(19,10,'No',0,1,1),
	(20,10,'Yes',0,1,0),
	(23,12,'No',0,1,0),
	(24,12,'Yes',0,1,1),
	(25,13,'No',0,1,0),
	(26,13,'Yes',0,1,1),
	(27,14,'No',0,1,0),
	(28,14,'Yes',0,1,1),
	(29,15,'No',0,1,0),
	(30,15,'Yes',0,1,1),
	(31,16,'No',0,1,0),
	(32,16,'Yes',0,1,1),
	(35,18,'No',0,1,1),
	(36,18,'Yes',0,1,0),
	(37,19,'No',0,1,0),
	(38,19,'Yes',0,1,1),
	(39,11,'No',0,1,1),
	(40,11,'Yes',0,1,0),
	(45,21,'No',0,1,0),
	(46,21,'Yes',0,1,1),
	(47,22,'No',0,1,0),
	(48,22,'Yes',0,1,1),
	(49,9,'No',0,1,0),
	(50,9,'Yes',0,1,1),
	(51,17,'No',0,1,1),
	(52,17,'Yes',0,1,0),
	(53,20,'No',0,1,0),
	(54,20,'Yes',0,1,1),
	(55,23,'No',0,1,1),
	(56,23,'Yes',0,1,0);

/*!40000 ALTER TABLE `question_option` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table question_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `question_type`;

CREATE TABLE `question_type` (
  `key` varchar(255) CHARACTER SET utf8mb4 NOT NULL DEFAULT '',
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

LOCK TABLES `question_type` WRITE;
/*!40000 ALTER TABLE `question_type` DISABLE KEYS */;

INSERT INTO `question_type` (`key`)
VALUES
	('number'),
	('picklist');

/*!40000 ALTER TABLE `question_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table recommendation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `recommendation`;

CREATE TABLE `recommendation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `algorithm_id` int(10) unsigned NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `short_description` text,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `algorithm_id` (`algorithm_id`) USING BTREE,
  CONSTRAINT `recommendation_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

LOCK TABLES `recommendation` WRITE;
/*!40000 ALTER TABLE `recommendation` DISABLE KEYS */;

INSERT INTO `recommendation` (`id`, `algorithm_id`, `title`, `description`, `short_description`)
VALUES
	(1,1,'Admit to non-ICU','An abbreviated period of bed rest of one day or less for stable patients is unequivocally supported for children whose hemoglobin has been documented to be stable. The use of bed rest on the day of admission will be discretionary until data is available.\nPatients not admitted to the ICU and without signs on ongoing bleeding may be allowed to drink and eat when comfortable and able.',NULL),
	(2,1,'Take vitals every 2 hours 4 times, then every 4 hours','',NULL),
	(3,1,'Type and screen','No evidence in the literature suggests routinely performing a type and screen in a hemodynamically stable patient, without evidence of ongoing bleeding, and with a stable hemoglobin, above the transfusion threshold is necessary. There is evidence to suggest that eliminating a type and screen in stable patients could potentially reduce the cost of care.',NULL),
	(4,1,'Bed-rest overnight','',NULL),
	(5,1,'Check Hb at 6 hours and as clinically indicated','The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.',NULL),
	(6,1,'Check Hb at 12 hours','The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.',NULL),
	(7,1,'Check Hb at 24 hours','The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.',NULL),
	(8,1,'Admit to floor','',NULL),
	(9,1,'Administer 20 mL/kg of LR (lactated ringers) or NS (normal saline)','',NULL),
	(10,1,'Give 10 mL/kg of PRBCs','Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.',NULL),
	(11,1,'NPO','',NULL),
	(12,1,'Bed-rest additional night','An abbreviated period of bed rest of one day or less for stable patients is unequivocally supported for children whose hemoglobin has been documented to be stable. The use of bed rest on the day of admission will be discretionary until data is available.',NULL),
	(13,1,'Check Hb as clinically indicated','The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.',NULL),
	(14,1,'Obtain abdominal CT scan','',NULL),
	(15,1,'Admit to PICU','',NULL),
	(16,1,'Bed-rest 18 hours','',NULL),
	(17,1,'Consider embolization','Only 16% of patients with constant extravasation on CT Scan fail NOM. Patients w/ evidence of symptomatic, continued bleeding should undergo angioemolization.',NULL),
	(18,1,'Administer 10 - 20 mL/kg of PRBCs','Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.',NULL),
	(19,1,'Consider other causes (head injury, tension pneumothorax, tamponade, pelvic hemorrhage)','Failure to stabilize as noted by persistent or recurrent hypotension cannot have NOM dictated by algorithm alone without taking into account local resources and other injuries. These patients should be considered for surgery, urgent embolization, or continued NOM, depending on other injuries and the center’s resources.\nWhere not contraindicated, a NOM guideline may be applied to patients with multiple injuries. In patients with other intra-abdominal injuries, such as pancreatic trauma or small bowel injury, the other injuries may take priority over the liver or spleen injury.',NULL),
	(20,1,'Consider massive transfusion protocol','',NULL),
	(21,1,'Floor status for 18 hours','',NULL),
	(22,1,'Regular diet','',NULL),
	(23,1,'Ambulate','',NULL),
	(24,1,'Success of NOM by algorithm','',NULL),
	(25,1,'Patient meets criteria for discharge','In children with isolated BLSI without signs of clinical bleeding at presentation and stable hemoglobin, discharge before 24 hours seems to be safe. Patients at risk for missed injury, need for operation, or recurrent bleeding are those with multiple identified abdominal injuries (especially pancreas), those with a contrast blush on CT scan, and those with bicycle handlebar injuries may not be candidates for early discharge. Since delayed bleeds have occurred (often outside of the APSA guideline period), standardized education remains an important component of discharge.',NULL),
	(26,1,'Use caution if it was an abdominal wall injury (handlebar injury or seatbelt sign)','',NULL),
	(27,1,'Provide discharge instructions','In children with isolated BLSI without signs of clinical bleeding at presentation and stable hemoglobin, discharge before 24 hours seems to be safe. Patients at risk for missed injury, need for operation, or recurrent bleeding are those with multiple identified abdominal injuries (especially pancreas), those with a contrast blush on CT scan, and those with bicycle handlebar injuries may not be candidates for early discharge. Since delayed bleeds have occurred (often outside of the APSA guideline period), standardized education remains an important component of discharge.',NULL),
	(28,1,'No ibuprofen, naproxen, or other drug store pain medications','Children are advised to avoid nonsteroidal anti-inflammatory drugs at the time of the discharge until follow-up is complete.',NULL),
	(29,1,'Acetaminophen (tylenol) is okay','',NULL),
	(30,1,'May go back to school when off narcotic pain medicines','',NULL),
	(31,1,'Restricted activity per APSA Guidelines for injury grade + 2 weeks','',NULL),
	(32,1,'No gym class','Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.',NULL),
	(33,1,'No sports','Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.',NULL),
	(34,1,'No rough play','Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.',NULL),
	(35,1,'No recreational activities with wheels','Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.',NULL),
	(36,1,'No activities where both feet leave the ground at the same time','Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.',NULL),
	(37,1,'Trauma service will provide medical permission for early class change for students at risk of reinjury between classes','Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.',NULL),
	(38,1,'Return to emergency department for increasing pain, paleness, dizziness, shortness of breath, vomiting, worsening shoulder pain, intestinal bleeding, or black tarry stools','Parents and patients are instructed to return to the emergency department for increasing pain, pallor, dizziness, difficulty breathing, vomiting, worsening shoulder pain, jaundice, gastrointestinal bleeding, or black tarry stools.',NULL),
	(39,1,'Grade 1 – 2 injury: phone call follow-up at 2 weeks','Grade 1 – 2 injuries receive telephone follow-up at 2 weeks, and Grade 3 – 5 injuries receive office visit at 2 weeks.',NULL),
	(40,1,'Grade 3 – 5 injury: office visit at 2 weeks','Grade 1 – 2 injuries receive telephone follow-up at 2 weeks, and Grade 3 – 5 injuries receive office visit at 2 weeks.',NULL),
	(41,1,'No routine follow-up imaging is required unless symptoms develop','',NULL),
	(42,1,'Remain in PICU for 18 hours','',NULL),
	(43,1,'Administer 10 - 30 mL/kg of PRBCs','Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.',NULL),
	(44,1,'Bed-rest','',NULL),
	(45,1,'Failure of NOM by algorithm','',NULL),
	(46,1,'     Angiography and embolization','',NULL),
	(47,1,'     Surgery','',NULL),
	(48,1,'     NOM at surgeon’s discretion','',NULL),
	(49,1,'NOM in the face of peritonitis should be excluded from a PMG for SOI.','',NULL),
	(50,1,'A transfusion threshold of 7.0 g/dL is safe and reasonable for children undergoing NOM for BLSI.','',NULL),
	(51,1,'Management of pediatric BLSI may be based on hemodynamic status, rather than grade.','',NULL),
	(52,1,'Transfusion beyond 40 mL/kg or >4 U in pediatric trauma seems to be highly correlated with failure of NOM, and care beyond these thresholds should be individualized.','',NULL),
	(53,1,'Hemodynamic status at presentation may be used as a determinant for ICU admission regardless of grade, with the exception of Grade 5 injuries, which require ICU.','',NULL),
	(54,1,'AE may be used in the NOM of children with BLSI to improve splenic salvage and possibly complement available treatments of hepatic injury, but not all children with contrast extravasation need AE.','',NULL),
	(55,1,'Clinical determination of recent or ongoing bleeding in children requires integration of multiple factors to determine the relative importance of SOI bleeding. Important factors to consider are listed on the algorithm instructions to assist in the determination recent bleeding significant enough to suggest shock.','',NULL),
	(56,1,'Consider use of 1:1:1 transfusion ratios early in resuscitation.','',NULL),
	(57,1,'Consideration for TEG-directed therapy may be given based on adult data.','',NULL),
	(58,1,'Limiting crystalloid volume and early use of transfusion in children with significant bleeding should be considered based on the adult literature.','',NULL),
	(59,1,'A pediatric PMG may be used for all children < 18 years of age, but a caution about the use of the algorithm for children > 16 of age may be appropriate.','',NULL),
	(60,1,'While routine reimaging in all children with BLSI is not indicated, some cases may benefit from reimaging. Patients who might benefit have not been defined, but patients with high-grade injuries near the hilum seem to be at the greatest risk of developing pseudoaneurysms based on the reported cases of relevant pseudoaneurysms.','',NULL),
	(61,1,'ERCP can be considered as an adjunct in the management of blunt hepatic injury with biloma or ductal injury.','',NULL),
	(62,1,'Management of late-presenting liver or spleen injury beyond 24 hours of injury is at the discretion of the treating surgeon. Patient care should be based predominantly on the reason for finally seeking care (pain, ileus, etc.) rather than on the initial injury.','',NULL),
	(63,1,'8% of population','',NULL),
	(64,1,'38% of the population','',NULL),
	(65,1,'2% of the population','',NULL),
	(66,1,'2% of the population','2% of the population will have abdominal pain, but none of the other findings.',NULL),
	(67,1,'17% of the population','',NULL),
	(68,1,'A hemoglobin drop of 0.5 g/dL the day of admission is expected form a 20-mL/kg bolus of crystalloid in a patient receiving maintenance and does not represent ongoing bleeding.','',NULL),
	(69,1,'33% of the population','',NULL),
	(70,1,'Checking Hb at 24 hours post injury is optional unless clinically indicated by vitals or exam.','',NULL),
	(71,1,'This algorithm is not recommended for use with peritonitis.','',NULL),
	(72,1,'52.6 risk of IAI','',NULL),
	(73,1,'11.9% risk of IAI intervention','',NULL),
	(74,1,'12.6% risk of IAI','',NULL),
	(75,1,'4.0% risk of IAI intervention','',NULL),
	(76,1,'6.7% risk of IAI','',NULL),
	(77,1,'0.0% risk of IAI -intervention','',NULL),
	(78,1,'Consider embolization if continual bleeding','The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.',NULL),
	(79,1,'Check Hb as clinically indicated after transfusion','The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.',NULL),
	(80,1,'2.3% risk of IA','',NULL),
	(81,1,'0.7% risk of IAI','',NULL),
	(82,1,'Omit abdominal CT Scan','',NULL),
	(83,1,'Observe in ED','',NULL),
	(84,1,'Discharge home if patient is reliable to return for clinical change.','',NULL),
	(85,1,'1.5% risk of IAI','',NULL),
	(86,1,'Admit to non-ICU for serial abdominal exams','',NULL),
	(87,1,'Discharge to home if pain-free >18 hours','',NULL),
	(88,1,'Clear liquid diet','',NULL),
	(89,1,'Serial exam for >= 24 hours','',NULL);

/*!40000 ALTER TABLE `recommendation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table release
# ------------------------------------------------------------

DROP TABLE IF EXISTS `release`;

CREATE TABLE `release` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `algorithm_id` int(10) unsigned NOT NULL,
  `version_number` float(8,2) NOT NULL,
  `algorithm_json` text,
  `attribute_json` text,
  `is_active` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`version_number`) USING BTREE,
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `algorithm_id` (`algorithm_id`) USING BTREE,
  CONSTRAINT `release_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

LOCK TABLES `release` WRITE;
/*!40000 ALTER TABLE `release` DISABLE KEYS */;

INSERT INTO `release` (`id`, `name`, `algorithm_id`, `version_number`, `algorithm_json`, `attribute_json`, `is_active`, `date_created`)
VALUES
	(6,'NOM BLSI',1,0.02,'{\"id\":1,\"name\":\"NOM BLSI\",\"version_number\":0.02,\"description\":\"(CC) ATOMAC\r\nThis work is licensed under the Creative Commons 4.0 International Attribution Non-Commercial and may be adapted or reproduced for non-commercial use. This version used by permission of ATOMAC.\r\n\r\nThe vast majority of pediatric abdominal injuries are due to blunt trauma. The liver and spleen are the two most commonly injured organs in pediatric patients sustaining blunt abdominal trauma. Early recognition and standardized management are associated with excellent outcomes. Nonoperative Management of Blunt Liver Spleen Injuries (NOM BLSI) is an algorithm intended for screening pediatric patients in emergency departments. The algorithm will allow pediatric surgeons and other emergency personnel the ability to make a determination of whether non operation management of blunt liver and spleen injuries is permissible. A nonoperative approach of liver and spleen injuries should be achievable for more than 95% of children. \r\n\r\nDISCLAIMER:\r\nThis algorithm is not intended to establish a protocol for all patients with a particular condition, may not be replicable at other institutions, and it is not intended to replace a clinician\'s clinical judgment. A clinician\'s adherence to this algorithm is voluntary. It is understood that some patients will not fit the clinical conditions contemplated by this algorithm and that the recommendations contained in this algorithm should not be considered inclusive of all proper methods or exclusive of other methods of care reasonably directed to obtaining the same results. Decisions to adopt any specific recommendation of this algorithm must be made by the clinician in light of available resources and the individual circumstances presented by the patient. This algorithm has not undergone expert review and ASU/PCH hosting this algorithm should not be considered an endorsement of its content or the refutation of any alternate management strategy.\r\n\",\"short_description\":\"Nonoperative Management of Blunt Liver Spleen Injuries (NOM BLSI) is an algorithm intended for screening pediatric patients.\",\"date_modified\":\"Fri Mar 22 2019\",\"date_created\":\"Mon Mar 04 2019\"}','{\"questions\": [{\"id\": 1,\"algorithm_id\": 1,\"text\": \"Suspected liver or spleen injury without peritonitis?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 1,\"question_id\": 1,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 2,\"question_id\": 1,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 2,\"algorithm_id\": 1,\"text\": \"Does surgeon suspect ongoing or very recent bleeding?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 3,\"question_id\": 2,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 4,\"question_id\": 2,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 3,\"algorithm_id\": 1,\"text\": \"Aspartate aminotransferase greater than 200U/L?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 5,\"question_id\": 3,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 6,\"question_id\": 3,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 4,\"algorithm_id\": 1,\"text\": \"Abdominal wall trauma, tenderness or distension?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 7,\"question_id\": 4,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 8,\"question_id\": 4,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 5,\"algorithm_id\": 1,\"text\": \"Abnormal chest x-ray?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 9,\"question_id\": 5,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 10,\"question_id\": 5,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 6,\"algorithm_id\": 1,\"text\": \"Patient complaining of abdominal pain?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 11,\"question_id\": 6,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 12,\"question_id\": 6,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 7,\"algorithm_id\": 1,\"text\": \"Abnormal pancreatic enzymes?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 13,\"question_id\": 7,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 14,\"question_id\": 7,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 8,\"algorithm_id\": 1,\"text\": \"Injury grade?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 15,\"question_id\": 8,\"label\": \"Good\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 16,\"question_id\": 8,\"label\": \"Bad\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 9,\"algorithm_id\": 1,\"text\": \"Hb >7, but close to 7?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 49,\"question_id\": 9,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 50,\"question_id\": 9,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 10,\"algorithm_id\": 1,\"text\": \"Patient symptomatic?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 19,\"question_id\": 10,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 20,\"question_id\": 10,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 11,\"algorithm_id\": 1,\"text\": \"Patient Hb less than 7?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 39,\"question_id\": 11,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 40,\"question_id\": 11,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 12,\"algorithm_id\": 1,\"text\": \"Hb stable?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 23,\"question_id\": 12,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 24,\"question_id\": 12,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 13,\"algorithm_id\": 1,\"text\": \"Vitals normal?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 25,\"question_id\": 13,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 26,\"question_id\": 13,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 14,\"algorithm_id\": 1,\"text\": \"Tolerating diet?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 27,\"question_id\": 14,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 28,\"question_id\": 14,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 15,\"algorithm_id\": 1,\"text\": \"Minimal abdominal pain?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 29,\"question_id\": 15,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 30,\"question_id\": 15,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 16,\"algorithm_id\": 1,\"text\": \"Sustained response to LR or NS?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 31,\"question_id\": 16,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 32,\"question_id\": 16,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 17,\"algorithm_id\": 1,\"text\": \"Has the patient been given 40mL/kg PRBCs? or 4 units PRBCs?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 51,\"question_id\": 17,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 52,\"question_id\": 17,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 18,\"algorithm_id\": 1,\"text\": \"Recurrent hypotension?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 35,\"question_id\": 18,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 36,\"question_id\": 18,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]},{\"id\": 19,\"algorithm_id\": 1,\"text\": \"Would you like to continue going through algorithm?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 37,\"question_id\": 19,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 38,\"question_id\": 19,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 20,\"algorithm_id\": 1,\"text\": \"Has patient\'s Hb been stable for 18 hours?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 53,\"question_id\": 20,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 54,\"question_id\": 20,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 21,\"algorithm_id\": 1,\"text\": \"Is there a sustained response to PRBCs?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 45,\"question_id\": 21,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 46,\"question_id\": 21,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 22,\"algorithm_id\": 1,\"text\": \"Has the patient already had a CT Scan?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 47,\"question_id\": 22,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false},{\"id\": 48,\"question_id\": 22,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true}]},{\"id\": 23,\"algorithm_id\": 1,\"text\": \"Abdominal wall marks?\",\"prompt\": \"\",\"type_key\": \"picklist\",\"question_options\": [{\"id\": 55,\"question_id\": 23,\"label\": \"No\",\"min_value\": 0,\"max_value\": 1,\"is_good\": true},{\"id\": 56,\"question_id\": 23,\"label\": \"Yes\",\"min_value\": 0,\"max_value\": 1,\"is_good\": false}]}],\"recommendations\": [{\"id\": 1,\"algorithm_id\": 1,\"title\": \"Admit to non-ICU\",\"description\": \"An abbreviated period of bed rest of one day or less for stable patients is unequivocally supported for children whose hemoglobin has been documented to be stable. The use of bed rest on the day of admission will be discretionary until data is available.\\nPatients not admitted to the ICU and without signs on ongoing bleeding may be allowed to drink and eat when comfortable and able.\",\"short_description\": null},{\"id\": 2,\"algorithm_id\": 1,\"title\": \"Take vitals every 2 hours 4 times, then every 4 hours\",\"description\": \"\",\"short_description\": null},{\"id\": 3,\"algorithm_id\": 1,\"title\": \"Type and screen\",\"description\": \"No evidence in the literature suggests routinely performing a type and screen in a hemodynamically stable patient, without evidence of ongoing bleeding, and with a stable hemoglobin, above the transfusion threshold is necessary. There is evidence to suggest that eliminating a type and screen in stable patients could potentially reduce the cost of care.\",\"short_description\": null},{\"id\": 4,\"algorithm_id\": 1,\"title\": \"Bed-rest overnight\",\"description\": \"\",\"short_description\": null},{\"id\": 5,\"algorithm_id\": 1,\"title\": \"Check Hb at 6 hours and as clinically indicated\",\"description\": \"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\": null},{\"id\": 6,\"algorithm_id\": 1,\"title\": \"Check Hb at 12 hours\",\"description\": \"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\": null},{\"id\": 7,\"algorithm_id\": 1,\"title\": \"Check Hb at 24 hours\",\"description\": \"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\": null},{\"id\": 8,\"algorithm_id\": 1,\"title\": \"Admit to floor\",\"description\": \"\",\"short_description\": null},{\"id\": 9,\"algorithm_id\": 1,\"title\": \"Administer 20 mL/kg of LR (lactated ringers) or NS (normal saline)\",\"description\": \"\",\"short_description\": null},{\"id\": 10,\"algorithm_id\": 1,\"title\": \"Give 10 mL/kg of PRBCs\",\"description\": \"Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.\",\"short_description\": null},{\"id\": 11,\"algorithm_id\": 1,\"title\": \"NPO\",\"description\": \"\",\"short_description\": null},{\"id\": 12,\"algorithm_id\": 1,\"title\": \"Bed-rest additional night\",\"description\": \"An abbreviated period of bed rest of one day or less for stable patients is unequivocally supported for children whose hemoglobin has been documented to be stable. The use of bed rest on the day of admission will be discretionary until data is available.\",\"short_description\": null},{\"id\": 13,\"algorithm_id\": 1,\"title\": \"Check Hb as clinically indicated\",\"description\": \"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\": null},{\"id\": 14,\"algorithm_id\": 1,\"title\": \"Obtain abdominal CT scan\",\"description\": \"\",\"short_description\": null},{\"id\": 15,\"algorithm_id\": 1,\"title\": \"Admit to PICU\",\"description\": \"\",\"short_description\": null},{\"id\": 16,\"algorithm_id\": 1,\"title\": \"Bed-rest 18 hours\",\"description\": \"\",\"short_description\": null},{\"id\": 17,\"algorithm_id\": 1,\"title\": \"Consider embolization\",\"description\": \"Only 16% of patients with constant extravasation on CT Scan fail NOM. Patients w/ evidence of symptomatic, continued bleeding should undergo angioemolization.\",\"short_description\": null},{\"id\": 18,\"algorithm_id\": 1,\"title\": \"Administer 10 - 20 mL/kg of PRBCs\",\"description\": \"Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.\",\"short_description\": null},{\"id\": 19,\"algorithm_id\": 1,\"title\": \"Consider other causes (head injury, tension pneumothorax, tamponade, pelvic hemorrhage)\",\"description\": \"Failure to stabilize as noted by persistent or recurrent hypotension cannot have NOM dictated by algorithm alone without taking into account local resources and other injuries. These patients should be considered for surgery, urgent embolization, or continued NOM, depending on other injuries and the center’s resources.\\nWhere not contraindicated, a NOM guideline may be applied to patients with multiple injuries. In patients with other intra-abdominal injuries, such as pancreatic trauma or small bowel injury, the other injuries may take priority over the liver or spleen injury.\",\"short_description\": null},{\"id\": 20,\"algorithm_id\": 1,\"title\": \"Consider massive transfusion protocol\",\"description\": \"\",\"short_description\": null},{\"id\": 21,\"algorithm_id\": 1,\"title\": \"Floor status for 18 hours\",\"description\": \"\",\"short_description\": null},{\"id\": 22,\"algorithm_id\": 1,\"title\": \"Regular diet\",\"description\": \"\",\"short_description\": null},{\"id\": 23,\"algorithm_id\": 1,\"title\": \"Ambulate\",\"description\": \"\",\"short_description\": null},{\"id\": 24,\"algorithm_id\": 1,\"title\": \"Success of NOM by algorithm\",\"description\": \"\",\"short_description\": null},{\"id\": 25,\"algorithm_id\": 1,\"title\": \"Patient meets criteria for discharge\",\"description\": \"In children with isolated BLSI without signs of clinical bleeding at presentation and stable hemoglobin, discharge before 24 hours seems to be safe. Patients at risk for missed injury, need for operation, or recurrent bleeding are those with multiple identified abdominal injuries (especially pancreas), those with a contrast blush on CT scan, and those with bicycle handlebar injuries may not be candidates for early discharge. Since delayed bleeds have occurred (often outside of the APSA guideline period), standardized education remains an important component of discharge.\",\"short_description\": null},{\"id\": 26,\"algorithm_id\": 1,\"title\": \"Use caution if it was an abdominal wall injury (handlebar injury or seatbelt sign)\",\"description\": \"\",\"short_description\": null},{\"id\": 27,\"algorithm_id\": 1,\"title\": \"Provide discharge instructions\",\"description\": \"In children with isolated BLSI without signs of clinical bleeding at presentation and stable hemoglobin, discharge before 24 hours seems to be safe. Patients at risk for missed injury, need for operation, or recurrent bleeding are those with multiple identified abdominal injuries (especially pancreas), those with a contrast blush on CT scan, and those with bicycle handlebar injuries may not be candidates for early discharge. Since delayed bleeds have occurred (often outside of the APSA guideline period), standardized education remains an important component of discharge.\",\"short_description\": null},{\"id\": 28,\"algorithm_id\": 1,\"title\": \"No ibuprofen, naproxen, or other drug store pain medications\",\"description\": \"Children are advised to avoid nonsteroidal anti-inflammatory drugs at the time of the discharge until follow-up is complete.\",\"short_description\": null},{\"id\": 29,\"algorithm_id\": 1,\"title\": \"Acetaminophen (tylenol) is okay\",\"description\": \"\",\"short_description\": null},{\"id\": 30,\"algorithm_id\": 1,\"title\": \"May go back to school when off narcotic pain medicines\",\"description\": \"\",\"short_description\": null},{\"id\": 31,\"algorithm_id\": 1,\"title\": \"Restricted activity per APSA Guidelines for injury grade + 2 weeks\",\"description\": \"\",\"short_description\": null},{\"id\": 32,\"algorithm_id\": 1,\"title\": \"No gym class\",\"description\": \"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\": null},{\"id\": 33,\"algorithm_id\": 1,\"title\": \"No sports\",\"description\": \"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\": null},{\"id\": 34,\"algorithm_id\": 1,\"title\": \"No rough play\",\"description\": \"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\": null},{\"id\": 35,\"algorithm_id\": 1,\"title\": \"No recreational activities with wheels\",\"description\": \"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\": null},{\"id\": 36,\"algorithm_id\": 1,\"title\": \"No activities where both feet leave the ground at the same time\",\"description\": \"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\": null},{\"id\": 37,\"algorithm_id\": 1,\"title\": \"Trauma service will provide medical permission for early class change for students at risk of reinjury between classes\",\"description\": \"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\": null},{\"id\": 38,\"algorithm_id\": 1,\"title\": \"Return to emergency department for increasing pain, paleness, dizziness, shortness of breath, vomiting, worsening shoulder pain, intestinal bleeding, or black tarry stools\",\"description\": \"Parents and patients are instructed to return to the emergency department for increasing pain, pallor, dizziness, difficulty breathing, vomiting, worsening shoulder pain, jaundice, gastrointestinal bleeding, or black tarry stools.\",\"short_description\": null},{\"id\": 39,\"algorithm_id\": 1,\"title\": \"Grade 1 – 2 injury: phone call follow-up at 2 weeks\",\"description\": \"Grade 1 – 2 injuries receive telephone follow-up at 2 weeks, and Grade 3 – 5 injuries receive office visit at 2 weeks.\",\"short_description\": null},{\"id\": 40,\"algorithm_id\": 1,\"title\": \"Grade 3 – 5 injury: office visit at 2 weeks\",\"description\": \"Grade 1 – 2 injuries receive telephone follow-up at 2 weeks, and Grade 3 – 5 injuries receive office visit at 2 weeks.\",\"short_description\": null},{\"id\": 41,\"algorithm_id\": 1,\"title\": \"No routine follow-up imaging is required unless symptoms develop\",\"description\": \"\",\"short_description\": null},{\"id\": 42,\"algorithm_id\": 1,\"title\": \"Remain in PICU for 18 hours\",\"description\": \"\",\"short_description\": null},{\"id\": 43,\"algorithm_id\": 1,\"title\": \"Administer 10 - 30 mL/kg of PRBCs\",\"description\": \"Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.\",\"short_description\": null},{\"id\": 44,\"algorithm_id\": 1,\"title\": \"Bed-rest\",\"description\": \"\",\"short_description\": null},{\"id\": 45,\"algorithm_id\": 1,\"title\": \"Failure of NOM by algorithm\",\"description\": \"\",\"short_description\": null},{\"id\": 46,\"algorithm_id\": 1,\"title\": \" Angiography and embolization\",\"description\": \"\",\"short_description\": null},{\"id\": 47,\"algorithm_id\": 1,\"title\": \" Surgery\",\"description\": \"\",\"short_description\": null},{\"id\": 48,\"algorithm_id\": 1,\"title\": \" NOM at surgeon’s discretion\",\"description\": \"\",\"short_description\": null},{\"id\": 49,\"algorithm_id\": 1,\"title\": \"NOM in the face of peritonitis should be excluded from a PMG for SOI.\",\"description\": \"\",\"short_description\": null},{\"id\": 50,\"algorithm_id\": 1,\"title\": \"A transfusion threshold of 7.0 g/dL is safe and reasonable for children undergoing NOM for BLSI.\",\"description\": \"\",\"short_description\": null},{\"id\": 51,\"algorithm_id\": 1,\"title\": \"Management of pediatric BLSI may be based on hemodynamic status, rather than grade.\",\"description\": \"\",\"short_description\": null},{\"id\": 52,\"algorithm_id\": 1,\"title\": \"Transfusion beyond 40 mL/kg or >4 U in pediatric trauma seems to be highly correlated with failure of NOM, and care beyond these thresholds should be individualized.\",\"description\": \"\",\"short_description\": null},{\"id\": 53,\"algorithm_id\": 1,\"title\": \"Hemodynamic status at presentation may be used as a determinant for ICU admission regardless of grade, with the exception of Grade 5 injuries, which require ICU.\",\"description\": \"\",\"short_description\": null},{\"id\": 54,\"algorithm_id\": 1,\"title\": \"AE may be used in the NOM of children with BLSI to improve splenic salvage and possibly complement available treatments of hepatic injury, but not all children with contrast extravasation need AE.\",\"description\": \"\",\"short_description\": null},{\"id\": 55,\"algorithm_id\": 1,\"title\": \"Clinical determination of recent or ongoing bleeding in children requires integration of multiple factors to determine the relative importance of SOI bleeding. Important factors to consider are listed on the algorithm instructions to assist in the determination recent bleeding significant enough to suggest shock.\",\"description\": \"\",\"short_description\": null},{\"id\": 56,\"algorithm_id\": 1,\"title\": \"Consider use of 1:1:1 transfusion ratios early in resuscitation.\",\"description\": \"\",\"short_description\": null},{\"id\": 57,\"algorithm_id\": 1,\"title\": \"Consideration for TEG-directed therapy may be given based on adult data.\",\"description\": \"\",\"short_description\": null},{\"id\": 58,\"algorithm_id\": 1,\"title\": \"Limiting crystalloid volume and early use of transfusion in children with significant bleeding should be considered based on the adult literature.\",\"description\": \"\",\"short_description\": null},{\"id\": 59,\"algorithm_id\": 1,\"title\": \"A pediatric PMG may be used for all children < 18 years of age, but a caution about the use of the algorithm for children > 16 of age may be appropriate.\",\"description\": \"\",\"short_description\": null},{\"id\": 60,\"algorithm_id\": 1,\"title\": \"While routine reimaging in all children with BLSI is not indicated, some cases may benefit from reimaging. Patients who might benefit have not been defined, but patients with high-grade injuries near the hilum seem to be at the greatest risk of developing pseudoaneurysms based on the reported cases of relevant pseudoaneurysms.\",\"description\": \"\",\"short_description\": null},{\"id\": 61,\"algorithm_id\": 1,\"title\": \"ERCP can be considered as an adjunct in the management of blunt hepatic injury with biloma or ductal injury.\",\"description\": \"\",\"short_description\": null},{\"id\": 62,\"algorithm_id\": 1,\"title\": \"Management of late-presenting liver or spleen injury beyond 24 hours of injury is at the discretion of the treating surgeon. Patient care should be based predominantly on the reason for finally seeking care (pain, ileus, etc.) rather than on the initial injury.\",\"description\": \"\",\"short_description\": null},{\"id\": 63,\"algorithm_id\": 1,\"title\": \"8% of population\",\"description\": \"\",\"short_description\": null},{\"id\": 64,\"algorithm_id\": 1,\"title\": \"38% of the population\",\"description\": \"\",\"short_description\": null},{\"id\": 65,\"algorithm_id\": 1,\"title\": \"2% of the population\",\"description\": \"\",\"short_description\": null},{\"id\": 66,\"algorithm_id\": 1,\"title\": \"2% of the population\",\"description\": \"2% of the population will have abdominal pain, but none of the other findings.\",\"short_description\": null},{\"id\": 67,\"algorithm_id\": 1,\"title\": \"17% of the population\",\"description\": \"\",\"short_description\": null},{\"id\": 68,\"algorithm_id\": 1,\"title\": \"A hemoglobin drop of 0.5 g/dL the day of admission is expected form a 20-mL/kg bolus of crystalloid in a patient receiving maintenance and does not represent ongoing bleeding.\",\"description\": \"\",\"short_description\": null},{\"id\": 69,\"algorithm_id\": 1,\"title\": \"33% of the population\",\"description\": \"\",\"short_description\": null},{\"id\": 70,\"algorithm_id\": 1,\"title\": \"Checking Hb at 24 hours post injury is optional unless clinically indicated by vitals or exam.\",\"description\": \"\",\"short_description\": null},{\"id\": 71,\"algorithm_id\": 1,\"title\": \"This algorithm is not recommended for use with peritonitis.\",\"description\": \"\",\"short_description\": null},{\"id\": 72,\"algorithm_id\": 1,\"title\": \"52.6 risk of IAI\",\"description\": \"\",\"short_description\": null},{\"id\": 73,\"algorithm_id\": 1,\"title\": \"11.9% risk of IAI intervention\",\"description\": \"\",\"short_description\": null},{\"id\": 74,\"algorithm_id\": 1,\"title\": \"12.6% risk of IAI\",\"description\": \"\",\"short_description\": null},{\"id\": 75,\"algorithm_id\": 1,\"title\": \"4.0% risk of IAI intervention\",\"description\": \"\",\"short_description\": null},{\"id\": 76,\"algorithm_id\": 1,\"title\": \"6.7% risk of IAI\",\"description\": \"\",\"short_description\": null},{\"id\": 77,\"algorithm_id\": 1,\"title\": \"0.0% risk of IAI -intervention\",\"description\": \"\",\"short_description\": null},{\"id\": 78,\"algorithm_id\": 1,\"title\": \"Consider embolization if continual bleeding\",\"description\": \"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\": null},{\"id\": 79,\"algorithm_id\": 1,\"title\": \"Check Hb as clinically indicated after transfusion\",\"description\": \"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\": null},{\"id\": 80,\"algorithm_id\": 1,\"title\": \"2.3% risk of IA\",\"description\": \"\",\"short_description\": null},{\"id\": 81,\"algorithm_id\": 1,\"title\": \"0.7% risk of IAI\",\"description\": \"\",\"short_description\": null},{\"id\": 82,\"algorithm_id\": 1,\"title\": \"Omit abdominal CT Scan\",\"description\": \"\",\"short_description\": null},{\"id\": 83,\"algorithm_id\": 1,\"title\": \"Observe in ED\",\"description\": \"\",\"short_description\": null},{\"id\": 84,\"algorithm_id\": 1,\"title\": \"Discharge home if patient is reliable to return for clinical change.\",\"description\": \"\",\"short_description\": null},{\"id\": 85,\"algorithm_id\": 1,\"title\": \"1.5% risk of IAI\",\"description\": \"\",\"short_description\": null},{\"id\": 86,\"algorithm_id\": 1,\"title\": \"Admit to non-ICU for serial abdominal exams\",\"description\": \"\",\"short_description\": null},{\"id\": 87,\"algorithm_id\": 1,\"title\": \"Discharge to home if pain-free >18 hours\",\"description\": \"\",\"short_description\": null},{\"id\": 88,\"algorithm_id\": 1,\"title\": \"Clear liquid diet\",\"description\": \"\",\"short_description\": null},{\"id\": 89,\"algorithm_id\": 1,\"title\": \"Serial exam for >= 24 hours\",\"description\": \"\",\"short_description\": null}],\"states\": [{\"id\": 1,\"algorithm_id\": 1,\"state_id_next_good\": 12,\"state_id_next_bad\": 2,\"question_ids\": [1],\"recommendation_ids\": [],\"is_initial\": 1},{\"id\": 2,\"algorithm_id\": 1,\"state_id_next_good\": 29,\"state_id_next_bad\": 14,\"question_ids\": [2],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 3,\"algorithm_id\": 1,\"state_id_next_good\": 4,\"state_id_next_bad\": 19,\"question_ids\": [3],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 4,\"algorithm_id\": 1,\"state_id_next_good\": 5,\"state_id_next_bad\": 20,\"question_ids\": [4],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 5,\"algorithm_id\": 1,\"state_id_next_good\": 6,\"state_id_next_bad\": 22,\"question_ids\": [5],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 6,\"algorithm_id\": 1,\"state_id_next_good\": 7,\"state_id_next_bad\": 23,\"question_ids\": [6],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 7,\"algorithm_id\": 1,\"state_id_next_good\": 8,\"state_id_next_bad\": 24,\"question_ids\": [7],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 8,\"algorithm_id\": 1,\"state_id_next_good\": null,\"state_id_next_bad\": null,\"question_ids\": [],\"recommendation_ids\": [69,81,77,82,83,84],\"is_initial\": 0},{\"id\": 9,\"algorithm_id\": 1,\"state_id_next_good\": 10,\"state_id_next_bad\": 25,\"question_ids\": [11,10],\"recommendation_ids\": [3,5,2],\"is_initial\": 0},{\"id\": 10,\"algorithm_id\": 1,\"state_id_next_good\": 11,\"state_id_next_bad\": 27,\"question_ids\": [12,13,14,15,23],\"recommendation_ids\": [21,22,23],\"is_initial\": 0},{\"id\": 11,\"algorithm_id\": 1,\"state_id_next_good\": null,\"state_id_next_bad\": null,\"question_ids\": [],\"recommendation_ids\": [24,26,27],\"is_initial\": 0},{\"id\": 12,\"algorithm_id\": 1,\"state_id_next_good\": 2,\"state_id_next_bad\": 13,\"question_ids\": [19],\"recommendation_ids\": [71],\"is_initial\": 0},{\"id\": 13,\"algorithm_id\": 1,\"state_id_next_good\": null,\"state_id_next_bad\": null,\"question_ids\": [],\"recommendation_ids\": [45],\"is_initial\": 0},{\"id\": 14,\"algorithm_id\": 1,\"state_id_next_good\": 15,\"state_id_next_bad\": 28,\"question_ids\": [16],\"recommendation_ids\": [9],\"is_initial\": 0},{\"id\": 15,\"algorithm_id\": 1,\"state_id_next_good\": 18,\"state_id_next_bad\": 16,\"question_ids\": [10,11],\"recommendation_ids\": [14,15,11,13,16,17],\"is_initial\": 0},{\"id\": 16,\"algorithm_id\": 1,\"state_id_next_good\": 26,\"state_id_next_bad\": 17,\"question_ids\": [11],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 17,\"algorithm_id\": 1,\"state_id_next_good\": 16,\"state_id_next_bad\": 27,\"question_ids\": [17],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 18,\"algorithm_id\": 1,\"state_id_next_good\": 33,\"state_id_next_bad\": 34,\"question_ids\": [12,13,14,15],\"recommendation_ids\": [21,22,23],\"is_initial\": 0},{\"id\": 19,\"algorithm_id\": 1,\"state_id_next_good\": 9,\"state_id_next_bad\": 21,\"question_ids\": [9],\"recommendation_ids\": [63,72,73,14,1,4],\"is_initial\": 0},{\"id\": 20,\"algorithm_id\": 1,\"state_id_next_good\": 9,\"state_id_next_bad\": 21,\"question_ids\": [9],\"recommendation_ids\": [64,74,75,14,1,4],\"is_initial\": 0},{\"id\": 21,\"algorithm_id\": 1,\"state_id_next_good\": 10,\"state_id_next_bad\": 25,\"question_ids\": [11,10],\"recommendation_ids\": [2,13],\"is_initial\": 0},{\"id\": 22,\"algorithm_id\": 1,\"state_id_next_good\": 9,\"state_id_next_bad\": 21,\"question_ids\": [9],\"recommendation_ids\": [65,76,77,14,1,4],\"is_initial\": 0},{\"id\": 23,\"algorithm_id\": 1,\"state_id_next_good\": 9,\"state_id_next_bad\": 21,\"question_ids\": [9],\"recommendation_ids\": [66,80,77,14,1,4],\"is_initial\": 0},{\"id\": 24,\"algorithm_id\": 1,\"state_id_next_good\": 9,\"state_id_next_bad\": 21,\"question_ids\": [9],\"recommendation_ids\": [67,85,77,14,86,87,88],\"is_initial\": 0},{\"id\": 25,\"algorithm_id\": 1,\"state_id_next_good\": 31,\"state_id_next_bad\": 17,\"question_ids\": [10],\"recommendation_ids\": [10,11,12,13],\"is_initial\": 0},{\"id\": 26,\"algorithm_id\": 1,\"state_id_next_good\": 10,\"state_id_next_bad\": 27,\"question_ids\": [20],\"recommendation_ids\": [42],\"is_initial\": 0},{\"id\": 27,\"algorithm_id\": 1,\"state_id_next_good\": null,\"state_id_next_bad\": null,\"question_ids\": [],\"recommendation_ids\": [45,46,47,48],\"is_initial\": 0},{\"id\": 28,\"algorithm_id\": 1,\"state_id_next_good\": 15,\"state_id_next_bad\": 27,\"question_ids\": [18,21],\"recommendation_ids\": [18,19,20],\"is_initial\": 0},{\"id\": 29,\"algorithm_id\": 1,\"state_id_next_good\": 30,\"state_id_next_bad\": 3,\"question_ids\": [22],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 30,\"algorithm_id\": 1,\"state_id_next_good\": 9,\"state_id_next_bad\": 21,\"question_ids\": [],\"recommendation_ids\": [14,1,4],\"is_initial\": 0},{\"id\": 31,\"algorithm_id\": 1,\"state_id_next_good\": 18,\"state_id_next_bad\": 32,\"question_ids\": [11],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 32,\"algorithm_id\": 1,\"state_id_next_good\": 16,\"state_id_next_bad\": 16,\"question_ids\": [],\"recommendation_ids\": [43,11,16,79,78],\"is_initial\": 0},{\"id\": 33,\"algorithm_id\": 1,\"state_id_next_good\": 11,\"state_id_next_bad\": 34,\"question_ids\": [23],\"recommendation_ids\": [],\"is_initial\": 0},{\"id\": 34,\"algorithm_id\": 1,\"state_id_next_good\": 11,\"state_id_next_bad\": 11,\"question_ids\": [],\"recommendation_ids\": [89],\"is_initial\": 0},{\"id\": 35,\"algorithm_id\": 1,\"state_id_next_good\": null,\"state_id_next_bad\": null,\"question_ids\": [],\"recommendation_ids\": [],\"is_initial\": 0}]}',1,'0000-00-00 00:00:00');

/*!40000 ALTER TABLE `release` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table state
# ------------------------------------------------------------

DROP TABLE IF EXISTS `state`;

CREATE TABLE `state` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `algorithm_id` int(10) unsigned NOT NULL,
  `state_id_next_good` int(10) unsigned DEFAULT NULL,
  `state_id_next_bad` int(10) unsigned DEFAULT NULL,
  `is_initial` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `algorithm_id` (`algorithm_id`) USING BTREE,
  CONSTRAINT `state_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;

INSERT INTO `state` (`id`, `algorithm_id`, `state_id_next_good`, `state_id_next_bad`, `is_initial`)
VALUES
	(1,1,12,2,1),
	(2,1,29,14,0),
	(3,1,4,19,0),
	(4,1,5,20,0),
	(5,1,6,22,0),
	(6,1,7,23,0),
	(7,1,8,24,0),
	(8,1,NULL,NULL,0),
	(9,1,10,25,0),
	(10,1,11,27,0),
	(11,1,NULL,NULL,0),
	(12,1,2,13,0),
	(13,1,NULL,NULL,0),
	(14,1,15,28,0),
	(15,1,18,16,0),
	(16,1,26,17,0),
	(17,1,16,27,0),
	(18,1,33,34,0),
	(19,1,9,21,0),
	(20,1,9,21,0),
	(21,1,10,25,0),
	(22,1,9,21,0),
	(23,1,9,21,0),
	(24,1,9,21,0),
	(25,1,31,17,0),
	(26,1,10,27,0),
	(27,1,NULL,NULL,0),
	(28,1,15,27,0),
	(29,1,30,3,0),
	(30,1,9,21,0),
	(31,1,18,32,0),
	(32,1,16,16,0),
	(33,1,11,34,0),
	(34,1,11,11,0),
	(35,1,NULL,NULL,0);

/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table state_question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `state_question`;

CREATE TABLE `state_question` (
  `state_id` int(10) unsigned NOT NULL,
  `question_id` int(10) unsigned NOT NULL,
  KEY `state_id` (`state_id`) USING BTREE,
  CONSTRAINT `state_question_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

LOCK TABLES `state_question` WRITE;
/*!40000 ALTER TABLE `state_question` DISABLE KEYS */;

INSERT INTO `state_question` (`state_id`, `question_id`)
VALUES
	(1,1),
	(12,19),
	(15,10),
	(15,11),
	(3,3),
	(4,4),
	(5,5),
	(6,6),
	(7,7),
	(17,17),
	(26,20),
	(14,16),
	(28,18),
	(28,21),
	(2,2),
	(29,22),
	(20,9),
	(19,9),
	(22,9),
	(25,10),
	(23,9),
	(24,9),
	(21,11),
	(21,10),
	(9,11),
	(9,10),
	(31,11),
	(16,11),
	(10,12),
	(10,13),
	(10,14),
	(10,15),
	(10,23),
	(33,23),
	(18,12),
	(18,13),
	(18,14),
	(18,15);

/*!40000 ALTER TABLE `state_question` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table state_recommendation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `state_recommendation`;

CREATE TABLE `state_recommendation` (
  `state_id` int(10) unsigned NOT NULL,
  `recommendation_id` int(10) unsigned NOT NULL,
  KEY `state_id` (`state_id`) USING BTREE,
  CONSTRAINT `state_recommendation_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

LOCK TABLES `state_recommendation` WRITE;
/*!40000 ALTER TABLE `state_recommendation` DISABLE KEYS */;

INSERT INTO `state_recommendation` (`state_id`, `recommendation_id`)
VALUES
	(11,24),
	(11,26),
	(11,27),
	(13,45),
	(12,71),
	(15,14),
	(15,15),
	(15,11),
	(15,13),
	(15,16),
	(15,17),
	(27,45),
	(27,46),
	(27,47),
	(27,48),
	(26,42),
	(14,9),
	(28,18),
	(28,19),
	(28,20),
	(30,14),
	(30,1),
	(30,4),
	(20,64),
	(20,74),
	(20,75),
	(20,14),
	(20,1),
	(20,4),
	(19,63),
	(19,72),
	(19,73),
	(19,14),
	(19,1),
	(19,4),
	(22,65),
	(22,76),
	(22,77),
	(22,14),
	(22,1),
	(22,4),
	(25,10),
	(25,11),
	(25,12),
	(25,13),
	(32,43),
	(32,11),
	(32,16),
	(32,79),
	(32,78),
	(23,66),
	(23,80),
	(23,77),
	(23,14),
	(23,1),
	(23,4),
	(24,67),
	(24,85),
	(24,77),
	(24,14),
	(24,86),
	(24,87),
	(24,88),
	(21,2),
	(21,13),
	(9,3),
	(9,5),
	(9,2),
	(8,69),
	(8,81),
	(8,77),
	(8,82),
	(8,83),
	(8,84),
	(10,21),
	(10,22),
	(10,23),
	(34,89),
	(18,21),
	(18,22),
	(18,23);

/*!40000 ALTER TABLE `state_recommendation` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;