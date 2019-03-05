/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3366
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3366
 Source Schema         : blsi

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

 Date: 05/03/2019 02:47:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for algorithm
-- ----------------------------
DROP TABLE IF EXISTS `algorithm`;
CREATE TABLE `algorithm`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `version_number` float(8, 2) NULL DEFAULT NULL,
  `state_id_start` int(10) UNSIGNED NULL DEFAULT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `short_description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `date_modified` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `date_created` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of algorithm
-- ----------------------------
INSERT INTO `algorithm` VALUES (1, 'NOM BLSI', 0.00, 1, NULL, NULL, 'Mon Mar 04 2019', 'Mon Mar 04 2019');

-- ----------------------------
-- Table structure for key
-- ----------------------------
DROP TABLE IF EXISTS `key`;
CREATE TABLE `key`  (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `key` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `algorithm_id` int(10) UNSIGNED NOT NULL,
  `question` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `prompt` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `type_key` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  INDEX `algorithm_id`(`algorithm_id`) USING BTREE,
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES (1, 1, 'Suspected liver or spleen injury without peritonitis?', '', 'picklist');
INSERT INTO `question` VALUES (2, 1, 'Does surgeon suspect ongoing or very recent bleeding?', '', 'picklist');
INSERT INTO `question` VALUES (3, 1, 'Aspartate aminotransferase greater than 200U/L?', '', 'picklist');
INSERT INTO `question` VALUES (4, 1, 'Abdominal wall trauma, tenderness or distension?', '', 'picklist');
INSERT INTO `question` VALUES (5, 1, 'Abnormal chest x-ray?', '', 'picklist');
INSERT INTO `question` VALUES (6, 1, 'Patient complaining of abdominal pain?', '', 'picklist');
INSERT INTO `question` VALUES (7, 1, 'Abnormal pancreatic enzymes?', '', 'picklist');
INSERT INTO `question` VALUES (8, 1, 'Injury grade?', '', 'picklist');
INSERT INTO `question` VALUES (9, 1, 'Hb close to 7?', '', 'picklist');
INSERT INTO `question` VALUES (10, 1, 'Patient symptomatic?', '', 'picklist');
INSERT INTO `question` VALUES (11, 1, 'Patient Hb less than 7?', '', 'picklist');
INSERT INTO `question` VALUES (12, 1, 'Hb stable?', '', 'picklist');
INSERT INTO `question` VALUES (13, 1, 'Vitals normal?', '', 'picklist');
INSERT INTO `question` VALUES (14, 1, 'Tolerating diet?', '', 'picklist');
INSERT INTO `question` VALUES (15, 1, 'Minimal abdominal pain?', '', 'picklist');
INSERT INTO `question` VALUES (16, 1, 'Sustained response to LR or NS?', '', 'picklist');
INSERT INTO `question` VALUES (17, 1, 'Has the patient been given 40mgL/kg PRBCs? or 4 units PRBCs?', '', 'picklist');
INSERT INTO `question` VALUES (18, 1, 'Recurrent hypotension?', '', 'picklist');
INSERT INTO `question` VALUES (19, 1, 'Would you like to continue going through algorithm?', '', 'picklist');
INSERT INTO `question` VALUES (20, 1, 'Has patient\'s Hb been stable for 24 hours?', '', 'picklist');
INSERT INTO `question` VALUES (21, 1, 'Is there a sustained response to PRBCs?', '', 'picklist');

-- ----------------------------
-- Table structure for question_option
-- ----------------------------
DROP TABLE IF EXISTS `question_option`;
CREATE TABLE `question_option`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_id` int(10) UNSIGNED NOT NULL,
  `label` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `min_value` int(11) NULL DEFAULT NULL,
  `max_value` int(11) NULL DEFAULT NULL,
  `is_good` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  INDEX `question_id`(`question_id`) USING BTREE,
  CONSTRAINT `question_option_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question_option
-- ----------------------------
INSERT INTO `question_option` VALUES (1, 1, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (2, 1, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (3, 2, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (4, 2, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (5, 3, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (6, 3, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (7, 4, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (8, 4, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (9, 5, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (10, 5, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (11, 6, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (12, 6, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (13, 7, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (14, 7, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (15, 8, 'Good', 0, 1, 1);
INSERT INTO `question_option` VALUES (16, 8, 'Bad', 0, 1, 0);
INSERT INTO `question_option` VALUES (17, 9, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (18, 9, 'Yes', 0, 1, 1);
INSERT INTO `question_option` VALUES (19, 10, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (20, 10, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (23, 12, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (24, 12, 'Yes', 0, 1, 1);
INSERT INTO `question_option` VALUES (25, 13, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (26, 13, 'Yes', 0, 1, 1);
INSERT INTO `question_option` VALUES (27, 14, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (28, 14, 'Yes', 0, 1, 1);
INSERT INTO `question_option` VALUES (29, 15, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (30, 15, 'Yes', 0, 1, 1);
INSERT INTO `question_option` VALUES (31, 16, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (32, 16, 'Yes', 0, 1, 1);
INSERT INTO `question_option` VALUES (35, 18, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (36, 18, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (37, 19, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (38, 19, 'Yes', 0, 1, 1);
INSERT INTO `question_option` VALUES (39, 11, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (40, 11, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (41, 20, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (42, 20, 'Yes', 0, 1, 1);
INSERT INTO `question_option` VALUES (43, 17, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (44, 17, 'Yes', 0, 1, 0);
INSERT INTO `question_option` VALUES (45, 21, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (46, 21, 'Yes', 0, 1, 1);

-- ----------------------------
-- Table structure for recommendation
-- ----------------------------
DROP TABLE IF EXISTS `recommendation`;
CREATE TABLE `recommendation`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `algorithm_id` int(10) UNSIGNED NOT NULL,
  `title` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `short_description` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  INDEX `algorithm_id`(`algorithm_id`) USING BTREE,
  CONSTRAINT `recommendation_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recommendation
-- ----------------------------
INSERT INTO `recommendation` VALUES (1, 1, 'Admit to non-ICU', 'An abbreviated period of bed rest of one day or less for stable patients is unequivocally supported for children whose hemoglobin has been documented to be stable. The use of bed rest on the day of admission will be discretionary until data is available.\nPatients not admitted to the ICU and without signs on ongoing bleeding may be allowed to drink and eat when comfortable and able.', NULL);
INSERT INTO `recommendation` VALUES (2, 1, 'Take vitals every 2 hours 4 times, then every 4 hours', '', NULL);
INSERT INTO `recommendation` VALUES (3, 1, 'Type and screen blood.', 'No evidence in the literature suggests routinely performing a type and screen in a hemodynamically stable patient, without evidence of ongoing bleeding, and with a stable hemoglobin, above the transfusion threshold is necessary. There is evidence to suggest that eliminating a type and screen in stable patients could potentially reduce the cost of care.', NULL);
INSERT INTO `recommendation` VALUES (4, 1, 'Bed-rest overnight', '', NULL);
INSERT INTO `recommendation` VALUES (5, 1, 'Check Hb at 6 hours', 'The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.', NULL);
INSERT INTO `recommendation` VALUES (6, 1, 'Check Hb at 12 hours', 'The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.', NULL);
INSERT INTO `recommendation` VALUES (7, 1, 'Check Hb at 24 hours', 'The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.', NULL);
INSERT INTO `recommendation` VALUES (8, 1, 'Admit to floor', '', NULL);
INSERT INTO `recommendation` VALUES (9, 1, 'Administer 20 mL/kg of LR (lacerated ringer) or NS (normal saline)', '', NULL);
INSERT INTO `recommendation` VALUES (10, 1, 'Give 10 mL/kg of PRBCs', 'Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.', NULL);
INSERT INTO `recommendation` VALUES (11, 1, 'NPO', '', NULL);
INSERT INTO `recommendation` VALUES (12, 1, 'Bed-rest additional night', 'An abbreviated period of bed rest of one day or less for stable patients is unequivocally supported for children whose hemoglobin has been documented to be stable. The use of bed rest on the day of admission will be discretionary until data is available.', NULL);
INSERT INTO `recommendation` VALUES (13, 1, 'Check Hb every 6 hours', 'The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.', NULL);
INSERT INTO `recommendation` VALUES (14, 1, 'Obtain abdominal CT scan', '', NULL);
INSERT INTO `recommendation` VALUES (15, 1, 'Admit to PICU', '', NULL);
INSERT INTO `recommendation` VALUES (16, 1, 'Bed-rest until Hb is stable', '', NULL);
INSERT INTO `recommendation` VALUES (17, 1, 'Consider embolization', '', NULL);
INSERT INTO `recommendation` VALUES (18, 1, 'Administer 10 - 20 ML/kg of PRBCs', 'Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.', NULL);
INSERT INTO `recommendation` VALUES (19, 1, 'Consider other causes (head injury, tension pneumothorax, tamponade, pelvic hemorrhage)', 'Failure to stabilize as noted by persistent or recurrent hypotension cannot have NOM dictated by algorithm alone without taking into account local resources and other injuries. These patients should be considered for surgery, urgent embolization, or continued NOM, depending on other injuries and the center’s resources.\nWhere not contraindicated, a NOM guideline may be applied to patients with multiple injuries. In patients with other intra-abdominal injuries, such as pancreatic trauma or small bowel injury, the other injuries may take priority over the liver or spleen injury.', NULL);
INSERT INTO `recommendation` VALUES (20, 1, 'Consider massive transfusion protocol', '', NULL);
INSERT INTO `recommendation` VALUES (21, 1, 'Floor status for 18 hours', '', NULL);
INSERT INTO `recommendation` VALUES (22, 1, 'Give regular diet', '', NULL);
INSERT INTO `recommendation` VALUES (23, 1, 'Ambulate', '', NULL);
INSERT INTO `recommendation` VALUES (24, 1, 'Success of NOM by algorithm', '', NULL);
INSERT INTO `recommendation` VALUES (25, 1, 'Patient meets criteria for discharge', 'In children with isolated BLSI without signs of clinical bleeding at presentation and stable hemoglobin, discharge before 24 hours seems to be safe. Patients at risk for missed injury, need for operation, or recurrent bleeding are those with multiple identified abdominal injuries (especially pancreas), those with a contrast blush on CT scan, and those with bicycle handlebar injuries may not be candidates for early discharge. Since delayed bleeds have occurred (often outside of the APSA guideline period), standardized education remains an important component of discharge.', NULL);
INSERT INTO `recommendation` VALUES (26, 1, 'Use caution if it was an abdominal wall injury (handlebar injury or seatbelt sign)', '', NULL);
INSERT INTO `recommendation` VALUES (27, 1, 'Provide discharge instructions', 'In children with isolated BLSI without signs of clinical bleeding at presentation and stable hemoglobin, discharge before 24 hours seems to be safe. Patients at risk for missed injury, need for operation, or recurrent bleeding are those with multiple identified abdominal injuries (especially pancreas), those with a contrast blush on CT scan, and those with bicycle handlebar injuries may not be candidates for early discharge. Since delayed bleeds have occurred (often outside of the APSA guideline period), standardized education remains an important component of discharge.', NULL);
INSERT INTO `recommendation` VALUES (28, 1, 'No ibuprofen, naproxen, or other drug store pain medications', 'Children are advised to avoid nonsteroidal anti-inflammatory drugs at the time of the discharge until follow-up is complete.', NULL);
INSERT INTO `recommendation` VALUES (29, 1, 'Acetaminophen (tylenol) is okay', '', NULL);
INSERT INTO `recommendation` VALUES (30, 1, 'May go back to school when off narcotic pain medicines', '', NULL);
INSERT INTO `recommendation` VALUES (31, 1, 'Restricted activity per APSA Guidelines for injury grade + 2 weeks', '', NULL);
INSERT INTO `recommendation` VALUES (32, 1, 'No gym class', 'Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.', NULL);
INSERT INTO `recommendation` VALUES (33, 1, 'No sports', 'Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.', NULL);
INSERT INTO `recommendation` VALUES (34, 1, 'No rough play', 'Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.', NULL);
INSERT INTO `recommendation` VALUES (35, 1, 'No recreational activities with wheels', 'Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.', NULL);
INSERT INTO `recommendation` VALUES (36, 1, 'No activities where both feet leave the ground at the same time', 'Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.', NULL);
INSERT INTO `recommendation` VALUES (37, 1, 'Trauma service will provide medical permission for early class change for students at risk of reinjury between classes', 'Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.', NULL);
INSERT INTO `recommendation` VALUES (38, 1, 'Return to emergency department for increasing pain, paleness, dizziness, shortness of breath, vomiting, worsening shoulder pain, intestinal bleeding, or black tarry stools', 'Parents and patients are instructed to return to the emergency department for increasing pain, pallor, dizziness, difficulty breathing, vomiting, worsening shoulder pain, jaundice, gastrointestinal bleeding, or black tarry stools.', NULL);
INSERT INTO `recommendation` VALUES (39, 1, 'Grade 1 – 2 injury: phone call follow-up at 2 weeks', 'Grade 1 – 2 injuries receive telephone follow-up at 2 weeks, and Grade 3 – 5 injuries receive office visit at 2 weeks.', NULL);
INSERT INTO `recommendation` VALUES (40, 1, 'Grade 3 – 5 injury: office visit at 2 weeks', 'Grade 1 – 2 injuries receive telephone follow-up at 2 weeks, and Grade 3 – 5 injuries receive office visit at 2 weeks.', NULL);
INSERT INTO `recommendation` VALUES (41, 1, 'No routine follow-up imaging is required unless symptoms develop', '', NULL);
INSERT INTO `recommendation` VALUES (42, 1, 'Remain in PICU', '', NULL);
INSERT INTO `recommendation` VALUES (43, 1, 'Administer 10 - 30 mL/kg of PRBCs', 'Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.', NULL);
INSERT INTO `recommendation` VALUES (44, 1, 'Bed-rest', '', NULL);
INSERT INTO `recommendation` VALUES (45, 1, 'Failure of NOM by algorithm', '', NULL);
INSERT INTO `recommendation` VALUES (46, 1, 'Angiography and embolization', '', NULL);
INSERT INTO `recommendation` VALUES (47, 1, 'Surgery', '', NULL);
INSERT INTO `recommendation` VALUES (48, 1, 'NOM at surgeon’s discretion', '', NULL);
INSERT INTO `recommendation` VALUES (49, 1, 'NOM in the face of peritonitis should be excluded from a PMG for SOI.', '', NULL);
INSERT INTO `recommendation` VALUES (50, 1, 'A transfusion threshold of 7.0 g/dL is safe and reasonable for children undergoing NOM for BLSI.', '', NULL);
INSERT INTO `recommendation` VALUES (51, 1, 'Management of pediatric BLSI may be based on hemodynamic status, rather than grade.', '', NULL);
INSERT INTO `recommendation` VALUES (52, 1, 'Transfusion beyond 40 mL/kg or >4 U in pediatric trauma seems to be highly correlated with failure of NOM, and care beyond these thresholds should be individualized.', '', NULL);
INSERT INTO `recommendation` VALUES (53, 1, 'Hemodynamic status at presentation may be used as a determinant for ICU admission regardless of grade, with the exception of Grade 5 injuries, which require ICU.', '', NULL);
INSERT INTO `recommendation` VALUES (54, 1, 'AE may be used in the NOM of children with BLSI to improve splenic salvage and possibly complement available treatments of hepatic injury, but not all children with contrast extravasation need AE.', '', NULL);
INSERT INTO `recommendation` VALUES (55, 1, 'Clinical determination of recent or ongoing bleeding in children requires integration of multiple factors to determine the relative importance of SOI bleeding. Important factors to consider are listed on the algorithm instructions to assist in the determination recent bleeding significant enough to suggest shock.', '', NULL);
INSERT INTO `recommendation` VALUES (56, 1, 'Consider use of 1:1:1 transfusion ratios early in resuscitation.', '', NULL);
INSERT INTO `recommendation` VALUES (57, 1, 'Consideration for TEG-directed therapy may be given based on adult data.', '', NULL);
INSERT INTO `recommendation` VALUES (58, 1, 'Limiting crystalloid volume and early use of transfusion in children with significant bleeding should be considered based on the adult literature.', '', NULL);
INSERT INTO `recommendation` VALUES (59, 1, 'A pediatric PMG may be used for all children < 18 years of age, but a caution about the use of the algorithm for children > 16 of age may be appropriate.', '', NULL);
INSERT INTO `recommendation` VALUES (60, 1, 'While routine reimaging in all children with BLSI is not indicated, some cases may benefit from reimaging. Patients who might benefit have not been defined, but patients with high-grade injuries near the hilum seem to be at the greatest risk of developing pseudoaneurysms based on the reported cases of relevant pseudoaneurysms.', '', NULL);
INSERT INTO `recommendation` VALUES (61, 1, 'ERCP can be considered as an adjunct in the management of blunt hepatic injury with biloma or ductal injury.', '', NULL);
INSERT INTO `recommendation` VALUES (62, 1, 'Management of late-presenting liver or spleen injury beyond 24 hours of injury is at the discretion of the treating surgeon. Patient care should be based predominantly on the reason for finally seeking care (pain, ileus, etc.) rather than on the initial injury.', '', NULL);
INSERT INTO `recommendation` VALUES (63, 1, '8% of population; 52.6 risk of IAI; 11.9% risk of IAI intervention', '', NULL);
INSERT INTO `recommendation` VALUES (64, 1, 'Additional 38% of the population; 12.6% risk of IAI; 4.0% risk of IAI -intervention', '', NULL);
INSERT INTO `recommendation` VALUES (65, 1, 'Additional 2% of the population; 6.7% risk of IAI; 0.0% risk of IAI -intervention', '', NULL);
INSERT INTO `recommendation` VALUES (66, 1, 'Additional 2% of the population; 2.3% risk of IAI; 0.0% risk of IAI -intervention', '', NULL);
INSERT INTO `recommendation` VALUES (67, 1, 'Additional 17% of the population; 1.5% risk of IAI; 0.0% risk of IAI -intervention', '', NULL);
INSERT INTO `recommendation` VALUES (68, 1, 'A hemoglobin drop of 0.5 g/dL the day of admission is expected form a 20-mL/kg bolus of crystalloid in a patient receiving maintenance and does not represent ongoing bleeding.', '', NULL);
INSERT INTO `recommendation` VALUES (69, 1, 'Very Low Risk - 33% of the population; 0.7% risk of IAI; 0.0% risk of IAI -intervention', '', NULL);
INSERT INTO `recommendation` VALUES (70, 1, 'Checking Hb at 24 hours post injury is optional unless clinically indicated by vitals or exam.', '', NULL);
INSERT INTO `recommendation` VALUES (71, 1, 'This algorithm is not recommended for use with peritonitis.', '', NULL);

-- ----------------------------
-- Table structure for release
-- ----------------------------
DROP TABLE IF EXISTS `release`;
CREATE TABLE `release`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `algorithm_id` int(10) UNSIGNED NOT NULL,
  `version_number` float(8, 2) NOT NULL,
  `algorithm_json` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `attribute_json` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  PRIMARY KEY (`id`, `version_number`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  INDEX `algorithm_id`(`algorithm_id`) USING BTREE,
  CONSTRAINT `release_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of release
-- ----------------------------
INSERT INTO `release` VALUES (4, 'NOM BLSI', 1, 0.00, '{\"id\":1,\"name\":\"NOM BLSI\",\"version_number\":0,\"state_id_start\":1,\"description\":null,\"short_description\":null,\"date_modified\":\"Mon Mar 04 2019\",\"date_created\":\"Mon Mar 04 2019\"}', '{\"questions\":[{\"id\":1,\"algorithm_id\":1,\"question\":\"Suspected liver or spleen injury without peritonitis?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":1,\"question_id\":1,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":2,\"question_id\":1,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":2,\"algorithm_id\":1,\"question\":\"Does surgeon suspect ongoing or very recent bleeding?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":3,\"question_id\":2,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":4,\"question_id\":2,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":3,\"algorithm_id\":1,\"question\":\"Aspartate aminotransferase greater than 200U/L?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":5,\"question_id\":3,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":6,\"question_id\":3,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":4,\"algorithm_id\":1,\"question\":\"Abdominal wall trauma, tenderness or distension?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":7,\"question_id\":4,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":8,\"question_id\":4,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":5,\"algorithm_id\":1,\"question\":\"Abnormal chest x-ray?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":9,\"question_id\":5,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":10,\"question_id\":5,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":6,\"algorithm_id\":1,\"question\":\"Patient complaining of abdominal pain?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":11,\"question_id\":6,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":12,\"question_id\":6,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":7,\"algorithm_id\":1,\"question\":\"Abnormal pancreatic enzymes?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":13,\"question_id\":7,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":14,\"question_id\":7,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":8,\"algorithm_id\":1,\"question\":\"Injury grade?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":15,\"question_id\":8,\"label\":\"Good\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":16,\"question_id\":8,\"label\":\"Bad\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":9,\"algorithm_id\":1,\"question\":\"Hb close to 7?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":17,\"question_id\":9,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":false},{\"id\":18,\"question_id\":9,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":true}]},{\"id\":10,\"algorithm_id\":1,\"question\":\"Patient symptomatic?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":19,\"question_id\":10,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":20,\"question_id\":10,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":11,\"algorithm_id\":1,\"question\":\"Patient Hb less than 7?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":39,\"question_id\":11,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":40,\"question_id\":11,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":12,\"algorithm_id\":1,\"question\":\"Hb stable?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":23,\"question_id\":12,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":false},{\"id\":24,\"question_id\":12,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":true}]},{\"id\":13,\"algorithm_id\":1,\"question\":\"Vitals normal?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":25,\"question_id\":13,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":false},{\"id\":26,\"question_id\":13,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":true}]},{\"id\":14,\"algorithm_id\":1,\"question\":\"Tolerating diet?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":27,\"question_id\":14,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":false},{\"id\":28,\"question_id\":14,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":true}]},{\"id\":15,\"algorithm_id\":1,\"question\":\"Minimal abdominal pain?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":29,\"question_id\":15,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":false},{\"id\":30,\"question_id\":15,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":true}]},{\"id\":16,\"algorithm_id\":1,\"question\":\"Sustained response to LR or NS?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":31,\"question_id\":16,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":false},{\"id\":32,\"question_id\":16,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":true}]},{\"id\":17,\"algorithm_id\":1,\"question\":\"Has the patient been given 40mgL/kg PRBCs? or 4 units PRBCs?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":43,\"question_id\":17,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":44,\"question_id\":17,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":18,\"algorithm_id\":1,\"question\":\"Recurrent hypotension?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":35,\"question_id\":18,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":true},{\"id\":36,\"question_id\":18,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":false}]},{\"id\":19,\"algorithm_id\":1,\"question\":\"Would you like to continue going through algorithm?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":37,\"question_id\":19,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":false},{\"id\":38,\"question_id\":19,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":true}]},{\"id\":20,\"algorithm_id\":1,\"question\":\"Has patient\'s Hb been stable for 24 hours?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":41,\"question_id\":20,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":false},{\"id\":42,\"question_id\":20,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":true}]},{\"id\":21,\"algorithm_id\":1,\"question\":\"Is there a sustained response to PRBCs?\",\"prompt\":\"\",\"type_key\":\"picklist\",\"question_options\":[{\"id\":45,\"question_id\":21,\"label\":\"No\",\"min_value\":0,\"max_value\":1,\"is_good\":false},{\"id\":46,\"question_id\":21,\"label\":\"Yes\",\"min_value\":0,\"max_value\":1,\"is_good\":true}]}],\"recommendations\":[{\"id\":1,\"algorithm_id\":1,\"title\":\"Admit to non-ICU\",\"description\":\"An abbreviated period of bed rest of one day or less for stable patients is unequivocally supported for children whose hemoglobin has been documented to be stable. The use of bed rest on the day of admission will be discretionary until data is available.\\nPatients not admitted to the ICU and without signs on ongoing bleeding may be allowed to drink and eat when comfortable and able.\",\"short_description\":null},{\"id\":2,\"algorithm_id\":1,\"title\":\"Take vitals every 2 hours 4 times, then every 4 hours\",\"description\":\"\",\"short_description\":null},{\"id\":3,\"algorithm_id\":1,\"title\":\"Type and screen blood.\",\"description\":\"No evidence in the literature suggests routinely performing a type and screen in a hemodynamically stable patient, without evidence of ongoing bleeding, and with a stable hemoglobin, above the transfusion threshold is necessary. There is evidence to suggest that eliminating a type and screen in stable patients could potentially reduce the cost of care.\",\"short_description\":null},{\"id\":4,\"algorithm_id\":1,\"title\":\"Bed-rest overnight\",\"description\":\"\",\"short_description\":null},{\"id\":5,\"algorithm_id\":1,\"title\":\"Check Hb at 6 hours\",\"description\":\"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\":null},{\"id\":6,\"algorithm_id\":1,\"title\":\"Check Hb at 12 hours\",\"description\":\"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\":null},{\"id\":7,\"algorithm_id\":1,\"title\":\"Check Hb at 24 hours\",\"description\":\"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\":null},{\"id\":8,\"algorithm_id\":1,\"title\":\"Admit to floor\",\"description\":\"\",\"short_description\":null},{\"id\":9,\"algorithm_id\":1,\"title\":\"Administer 20 mL/kg of LR (lacerated ringer) or NS (normal saline)\",\"description\":\"\",\"short_description\":null},{\"id\":10,\"algorithm_id\":1,\"title\":\"Give 10 mL/kg of PRBCs\",\"description\":\"Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.\",\"short_description\":null},{\"id\":11,\"algorithm_id\":1,\"title\":\"NPO\",\"description\":\"\",\"short_description\":null},{\"id\":12,\"algorithm_id\":1,\"title\":\"Bed-rest additional night\",\"description\":\"An abbreviated period of bed rest of one day or less for stable patients is unequivocally supported for children whose hemoglobin has been documented to be stable. The use of bed rest on the day of admission will be discretionary until data is available.\",\"short_description\":null},{\"id\":13,\"algorithm_id\":1,\"title\":\"Check Hb every 6 hours\",\"description\":\"The use of serial hemoglobin measurement every 6 hours is commonly used in all NOM studies, but no evidence supports a meaningful impact on management.\",\"short_description\":null},{\"id\":14,\"algorithm_id\":1,\"title\":\"Obtain abdominal CT scan\",\"description\":\"\",\"short_description\":null},{\"id\":15,\"algorithm_id\":1,\"title\":\"Admit to PICU\",\"description\":\"\",\"short_description\":null},{\"id\":16,\"algorithm_id\":1,\"title\":\"Bed-rest until Hb is stable\",\"description\":\"\",\"short_description\":null},{\"id\":17,\"algorithm_id\":1,\"title\":\"Consider embolization\",\"description\":\"\",\"short_description\":null},{\"id\":18,\"algorithm_id\":1,\"title\":\"Administer 10 - 20 ML/kg of PRBCs\",\"description\":\"Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.\",\"short_description\":null},{\"id\":19,\"algorithm_id\":1,\"title\":\"Consider other causes (head injury, tension pneumothorax, tamponade, pelvic hemorrhage)\",\"description\":\"Failure to stabilize as noted by persistent or recurrent hypotension cannot have NOM dictated by algorithm alone without taking into account local resources and other injuries. These patients should be considered for surgery, urgent embolization, or continued NOM, depending on other injuries and the center’s resources.\\nWhere not contraindicated, a NOM guideline may be applied to patients with multiple injuries. In patients with other intra-abdominal injuries, such as pancreatic trauma or small bowel injury, the other injuries may take priority over the liver or spleen injury.\",\"short_description\":null},{\"id\":20,\"algorithm_id\":1,\"title\":\"Consider massive transfusion protocol\",\"description\":\"\",\"short_description\":null},{\"id\":21,\"algorithm_id\":1,\"title\":\"Floor status for 18 hours\",\"description\":\"\",\"short_description\":null},{\"id\":22,\"algorithm_id\":1,\"title\":\"Give regular diet\",\"description\":\"\",\"short_description\":null},{\"id\":23,\"algorithm_id\":1,\"title\":\"Ambulate\",\"description\":\"\",\"short_description\":null},{\"id\":24,\"algorithm_id\":1,\"title\":\"Success of NOM by algorithm\",\"description\":\"\",\"short_description\":null},{\"id\":25,\"algorithm_id\":1,\"title\":\"Patient meets criteria for discharge\",\"description\":\"In children with isolated BLSI without signs of clinical bleeding at presentation and stable hemoglobin, discharge before 24 hours seems to be safe. Patients at risk for missed injury, need for operation, or recurrent bleeding are those with multiple identified abdominal injuries (especially pancreas), those with a contrast blush on CT scan, and those with bicycle handlebar injuries may not be candidates for early discharge. Since delayed bleeds have occurred (often outside of the APSA guideline period), standardized education remains an important component of discharge.\",\"short_description\":null},{\"id\":26,\"algorithm_id\":1,\"title\":\"Use caution if it was an abdominal wall injury (handlebar injury or seatbelt sign)\",\"description\":\"\",\"short_description\":null},{\"id\":27,\"algorithm_id\":1,\"title\":\"Provide discharge instructions\",\"description\":\"In children with isolated BLSI without signs of clinical bleeding at presentation and stable hemoglobin, discharge before 24 hours seems to be safe. Patients at risk for missed injury, need for operation, or recurrent bleeding are those with multiple identified abdominal injuries (especially pancreas), those with a contrast blush on CT scan, and those with bicycle handlebar injuries may not be candidates for early discharge. Since delayed bleeds have occurred (often outside of the APSA guideline period), standardized education remains an important component of discharge.\",\"short_description\":null},{\"id\":28,\"algorithm_id\":1,\"title\":\"No ibuprofen, naproxen, or other drug store pain medications\",\"description\":\"Children are advised to avoid nonsteroidal anti-inflammatory drugs at the time of the discharge until follow-up is complete.\",\"short_description\":null},{\"id\":29,\"algorithm_id\":1,\"title\":\"Acetaminophen (tylenol) is okay\",\"description\":\"\",\"short_description\":null},{\"id\":30,\"algorithm_id\":1,\"title\":\"May go back to school when off narcotic pain medicines\",\"description\":\"\",\"short_description\":null},{\"id\":31,\"algorithm_id\":1,\"title\":\"Restricted activity per APSA Guidelines for injury grade + 2 weeks\",\"description\":\"\",\"short_description\":null},{\"id\":32,\"algorithm_id\":1,\"title\":\"No gym class\",\"description\":\"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\":null},{\"id\":33,\"algorithm_id\":1,\"title\":\"No sports\",\"description\":\"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\":null},{\"id\":34,\"algorithm_id\":1,\"title\":\"No rough play\",\"description\":\"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\":null},{\"id\":35,\"algorithm_id\":1,\"title\":\"No recreational activities with wheels\",\"description\":\"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\":null},{\"id\":36,\"algorithm_id\":1,\"title\":\"No activities where both feet leave the ground at the same time\",\"description\":\"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\":null},{\"id\":37,\"algorithm_id\":1,\"title\":\"Trauma service will provide medical permission for early class change for students at risk of reinjury between classes\",\"description\":\"Children may return to school when comfortable and able to comply with ongoing sports and contact restrictions. Modifications to allow children to change class early should be used if there is concern about injury occurring between classes or elsewhere, depending on the child’s environment.\",\"short_description\":null},{\"id\":38,\"algorithm_id\":1,\"title\":\"Return to emergency department for increasing pain, paleness, dizziness, shortness of breath, vomiting, worsening shoulder pain, intestinal bleeding, or black tarry stools\",\"description\":\"Parents and patients are instructed to return to the emergency department for increasing pain, pallor, dizziness, difficulty breathing, vomiting, worsening shoulder pain, jaundice, gastrointestinal bleeding, or black tarry stools.\",\"short_description\":null},{\"id\":39,\"algorithm_id\":1,\"title\":\"Grade 1 – 2 injury: phone call follow-up at 2 weeks\",\"description\":\"Grade 1 – 2 injuries receive telephone follow-up at 2 weeks, and Grade 3 – 5 injuries receive office visit at 2 weeks.\",\"short_description\":null},{\"id\":40,\"algorithm_id\":1,\"title\":\"Grade 3 – 5 injury: office visit at 2 weeks\",\"description\":\"Grade 1 – 2 injuries receive telephone follow-up at 2 weeks, and Grade 3 – 5 injuries receive office visit at 2 weeks.\",\"short_description\":null},{\"id\":41,\"algorithm_id\":1,\"title\":\"No routine follow-up imaging is required unless symptoms develop\",\"description\":\"\",\"short_description\":null},{\"id\":42,\"algorithm_id\":1,\"title\":\"Remain in PICU\",\"description\":\"\",\"short_description\":null},{\"id\":43,\"algorithm_id\":1,\"title\":\"Administer 10 - 30 mL/kg of PRBCs\",\"description\":\"Transfusion of red blood cells in response to shock is recommended, but no studies have evaluated if transfusion before surgery would improve the success rates of NOM.\",\"short_description\":null},{\"id\":44,\"algorithm_id\":1,\"title\":\"Bed-rest\",\"description\":\"\",\"short_description\":null},{\"id\":45,\"algorithm_id\":1,\"title\":\"Failure of NOM by algorithm\",\"description\":\"\",\"short_description\":null},{\"id\":46,\"algorithm_id\":1,\"title\":\"Angiography and embolization\",\"description\":\"\",\"short_description\":null},{\"id\":47,\"algorithm_id\":1,\"title\":\"Surgery\",\"description\":\"\",\"short_description\":null},{\"id\":48,\"algorithm_id\":1,\"title\":\"NOM at surgeon’s discretion\",\"description\":\"\",\"short_description\":null},{\"id\":49,\"algorithm_id\":1,\"title\":\"NOM in the face of peritonitis should be excluded from a PMG for SOI.\",\"description\":\"\",\"short_description\":null},{\"id\":50,\"algorithm_id\":1,\"title\":\"A transfusion threshold of 7.0 g/dL is safe and reasonable for children undergoing NOM for BLSI.\",\"description\":\"\",\"short_description\":null},{\"id\":51,\"algorithm_id\":1,\"title\":\"Management of pediatric BLSI may be based on hemodynamic status, rather than grade.\",\"description\":\"\",\"short_description\":null},{\"id\":52,\"algorithm_id\":1,\"title\":\"Transfusion beyond 40 mL/kg or >4 U in pediatric trauma seems to be highly correlated with failure of NOM, and care beyond these thresholds should be individualized.\",\"description\":\"\",\"short_description\":null},{\"id\":53,\"algorithm_id\":1,\"title\":\"Hemodynamic status at presentation may be used as a determinant for ICU admission regardless of grade, with the exception of Grade 5 injuries, which require ICU.\",\"description\":\"\",\"short_description\":null},{\"id\":54,\"algorithm_id\":1,\"title\":\"AE may be used in the NOM of children with BLSI to improve splenic salvage and possibly complement available treatments of hepatic injury, but not all children with contrast extravasation need AE.\",\"description\":\"\",\"short_description\":null},{\"id\":55,\"algorithm_id\":1,\"title\":\"Clinical determination of recent or ongoing bleeding in children requires integration of multiple factors to determine the relative importance of SOI bleeding. Important factors to consider are listed on the algorithm instructions to assist in the determination recent bleeding significant enough to suggest shock.\",\"description\":\"\",\"short_description\":null},{\"id\":56,\"algorithm_id\":1,\"title\":\"Consider use of 1:1:1 transfusion ratios early in resuscitation.\",\"description\":\"\",\"short_description\":null},{\"id\":57,\"algorithm_id\":1,\"title\":\"Consideration for TEG-directed therapy may be given based on adult data.\",\"description\":\"\",\"short_description\":null},{\"id\":58,\"algorithm_id\":1,\"title\":\"Limiting crystalloid volume and early use of transfusion in children with significant bleeding should be considered based on the adult literature.\",\"description\":\"\",\"short_description\":null},{\"id\":59,\"algorithm_id\":1,\"title\":\"A pediatric PMG may be used for all children < 18 years of age, but a caution about the use of the algorithm for children > 16 of age may be appropriate.\",\"description\":\"\",\"short_description\":null},{\"id\":60,\"algorithm_id\":1,\"title\":\"While routine reimaging in all children with BLSI is not indicated, some cases may benefit from reimaging. Patients who might benefit have not been defined, but patients with high-grade injuries near the hilum seem to be at the greatest risk of developing pseudoaneurysms based on the reported cases of relevant pseudoaneurysms.\",\"description\":\"\",\"short_description\":null},{\"id\":61,\"algorithm_id\":1,\"title\":\"ERCP can be considered as an adjunct in the management of blunt hepatic injury with biloma or ductal injury.\",\"description\":\"\",\"short_description\":null},{\"id\":62,\"algorithm_id\":1,\"title\":\"Management of late-presenting liver or spleen injury beyond 24 hours of injury is at the discretion of the treating surgeon. Patient care should be based predominantly on the reason for finally seeking care (pain, ileus, etc.) rather than on the initial injury.\",\"description\":\"\",\"short_description\":null},{\"id\":63,\"algorithm_id\":1,\"title\":\"8% of population; 52.6 risk of IAI; 11.9% risk of IAI intervention\",\"description\":\"\",\"short_description\":null},{\"id\":64,\"algorithm_id\":1,\"title\":\"Additional 38% of the population; 12.6% risk of IAI; 4.0% risk of IAI -intervention\",\"description\":\"\",\"short_description\":null},{\"id\":65,\"algorithm_id\":1,\"title\":\"Additional 2% of the population; 6.7% risk of IAI; 0.0% risk of IAI -intervention\",\"description\":\"\",\"short_description\":null},{\"id\":66,\"algorithm_id\":1,\"title\":\"Additional 2% of the population; 2.3% risk of IAI; 0.0% risk of IAI -intervention\",\"description\":\"\",\"short_description\":null},{\"id\":67,\"algorithm_id\":1,\"title\":\"Additional 17% of the population; 1.5% risk of IAI; 0.0% risk of IAI -intervention\",\"description\":\"\",\"short_description\":null},{\"id\":68,\"algorithm_id\":1,\"title\":\"A hemoglobin drop of 0.5 g/dL the day of admission is expected form a 20-mL/kg bolus of crystalloid in a patient receiving maintenance and does not represent ongoing bleeding.\",\"description\":\"\",\"short_description\":null},{\"id\":69,\"algorithm_id\":1,\"title\":\"Very Low Risk - 33% of the population; 0.7% risk of IAI; 0.0% risk of IAI -intervention\",\"description\":\"\",\"short_description\":null},{\"id\":70,\"algorithm_id\":1,\"title\":\"Checking Hb at 24 hours post injury is optional unless clinically indicated by vitals or exam.\",\"description\":\"\",\"short_description\":null},{\"id\":71,\"algorithm_id\":1,\"title\":\"This algorithm is not recommended for use with peritonitis.\",\"description\":\"\",\"short_description\":null}],\"states\":[{\"id\":1,\"algorithm_id\":1,\"state_id_next_good\":12,\"state_id_next_bad\":2,\"question_ids\":[1],\"recommendation_ids\":[]},{\"id\":2,\"algorithm_id\":1,\"state_id_next_good\":3,\"state_id_next_bad\":14,\"question_ids\":[2],\"recommendation_ids\":[]},{\"id\":3,\"algorithm_id\":1,\"state_id_next_good\":4,\"state_id_next_bad\":19,\"question_ids\":[3],\"recommendation_ids\":[]},{\"id\":4,\"algorithm_id\":1,\"state_id_next_good\":5,\"state_id_next_bad\":20,\"question_ids\":[4],\"recommendation_ids\":[]},{\"id\":5,\"algorithm_id\":1,\"state_id_next_good\":6,\"state_id_next_bad\":22,\"question_ids\":[5],\"recommendation_ids\":[]},{\"id\":6,\"algorithm_id\":1,\"state_id_next_good\":7,\"state_id_next_bad\":23,\"question_ids\":[6],\"recommendation_ids\":[]},{\"id\":7,\"algorithm_id\":1,\"state_id_next_good\":8,\"state_id_next_bad\":24,\"question_ids\":[7],\"recommendation_ids\":[]},{\"id\":8,\"algorithm_id\":1,\"state_id_next_good\":9,\"state_id_next_bad\":21,\"question_ids\":[9],\"recommendation_ids\":[69,1,4]},{\"id\":9,\"algorithm_id\":1,\"state_id_next_good\":10,\"state_id_next_bad\":25,\"question_ids\":[11,10],\"recommendation_ids\":[3,5,6,7,70,2]},{\"id\":10,\"algorithm_id\":1,\"state_id_next_good\":11,\"state_id_next_bad\":27,\"question_ids\":[12,13,14,15,8],\"recommendation_ids\":[21,22,23]},{\"id\":11,\"algorithm_id\":1,\"state_id_next_good\":null,\"state_id_next_bad\":null,\"question_ids\":[],\"recommendation_ids\":[24,26,27]},{\"id\":12,\"algorithm_id\":1,\"state_id_next_good\":2,\"state_id_next_bad\":13,\"question_ids\":[19],\"recommendation_ids\":[71]},{\"id\":13,\"algorithm_id\":1,\"state_id_next_good\":null,\"state_id_next_bad\":null,\"question_ids\":[],\"recommendation_ids\":[45]},{\"id\":14,\"algorithm_id\":1,\"state_id_next_good\":15,\"state_id_next_bad\":28,\"question_ids\":[16],\"recommendation_ids\":[9]},{\"id\":15,\"algorithm_id\":1,\"state_id_next_good\":18,\"state_id_next_bad\":16,\"question_ids\":[10,11],\"recommendation_ids\":[14,15,11,13,16,17]},{\"id\":16,\"algorithm_id\":1,\"state_id_next_good\":26,\"state_id_next_bad\":17,\"question_ids\":[10,11],\"recommendation_ids\":[43,11,16,13,17]},{\"id\":17,\"algorithm_id\":1,\"state_id_next_good\":16,\"state_id_next_bad\":27,\"question_ids\":[17],\"recommendation_ids\":[]},{\"id\":18,\"algorithm_id\":1,\"state_id_next_good\":11,\"state_id_next_bad\":27,\"question_ids\":[12,13,14,15,8],\"recommendation_ids\":[21,22,23]},{\"id\":19,\"algorithm_id\":1,\"state_id_next_good\":9,\"state_id_next_bad\":21,\"question_ids\":[9],\"recommendation_ids\":[63,14,1,4]},{\"id\":20,\"algorithm_id\":1,\"state_id_next_good\":9,\"state_id_next_bad\":21,\"question_ids\":[9],\"recommendation_ids\":[64,14,1,4]},{\"id\":21,\"algorithm_id\":1,\"state_id_next_good\":10,\"state_id_next_bad\":25,\"question_ids\":[11,10],\"recommendation_ids\":[2,13,70]},{\"id\":22,\"algorithm_id\":1,\"state_id_next_good\":9,\"state_id_next_bad\":21,\"question_ids\":[9],\"recommendation_ids\":[65,14,1,4]},{\"id\":23,\"algorithm_id\":1,\"state_id_next_good\":9,\"state_id_next_bad\":21,\"question_ids\":[9],\"recommendation_ids\":[66,14,1,4]},{\"id\":24,\"algorithm_id\":1,\"state_id_next_good\":9,\"state_id_next_bad\":21,\"question_ids\":[9],\"recommendation_ids\":[67,14,1,4]},{\"id\":25,\"algorithm_id\":1,\"state_id_next_good\":26,\"state_id_next_bad\":17,\"question_ids\":[10,11],\"recommendation_ids\":[10,11,12,13]},{\"id\":26,\"algorithm_id\":1,\"state_id_next_good\":10,\"state_id_next_bad\":27,\"question_ids\":[20],\"recommendation_ids\":[42]},{\"id\":27,\"algorithm_id\":1,\"state_id_next_good\":null,\"state_id_next_bad\":null,\"question_ids\":[],\"recommendation_ids\":[45,46,47,48]},{\"id\":28,\"algorithm_id\":1,\"state_id_next_good\":15,\"state_id_next_bad\":27,\"question_ids\":[18,21],\"recommendation_ids\":[18,19,20]}]}');

-- ----------------------------
-- Table structure for state
-- ----------------------------
DROP TABLE IF EXISTS `state`;
CREATE TABLE `state`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `algorithm_id` int(10) UNSIGNED NOT NULL,
  `state_id_next_good` int(10) UNSIGNED NULL DEFAULT NULL,
  `state_id_next_bad` int(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE,
  INDEX `algorithm_id`(`algorithm_id`) USING BTREE,
  CONSTRAINT `state_ibfk_1` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of state
-- ----------------------------
INSERT INTO `state` VALUES (1, 1, 12, 2);
INSERT INTO `state` VALUES (2, 1, 3, 14);
INSERT INTO `state` VALUES (3, 1, 4, 19);
INSERT INTO `state` VALUES (4, 1, 5, 20);
INSERT INTO `state` VALUES (5, 1, 6, 22);
INSERT INTO `state` VALUES (6, 1, 7, 23);
INSERT INTO `state` VALUES (7, 1, 8, 24);
INSERT INTO `state` VALUES (8, 1, 9, 21);
INSERT INTO `state` VALUES (9, 1, 10, 25);
INSERT INTO `state` VALUES (10, 1, 11, 27);
INSERT INTO `state` VALUES (11, 1, NULL, NULL);
INSERT INTO `state` VALUES (12, 1, 2, 13);
INSERT INTO `state` VALUES (13, 1, NULL, NULL);
INSERT INTO `state` VALUES (14, 1, 15, 28);
INSERT INTO `state` VALUES (15, 1, 18, 16);
INSERT INTO `state` VALUES (16, 1, 26, 17);
INSERT INTO `state` VALUES (17, 1, 16, 27);
INSERT INTO `state` VALUES (18, 1, 11, 27);
INSERT INTO `state` VALUES (19, 1, 9, 21);
INSERT INTO `state` VALUES (20, 1, 9, 21);
INSERT INTO `state` VALUES (21, 1, 10, 25);
INSERT INTO `state` VALUES (22, 1, 9, 21);
INSERT INTO `state` VALUES (23, 1, 9, 21);
INSERT INTO `state` VALUES (24, 1, 9, 21);
INSERT INTO `state` VALUES (25, 1, 26, 17);
INSERT INTO `state` VALUES (26, 1, 10, 27);
INSERT INTO `state` VALUES (27, 1, NULL, NULL);
INSERT INTO `state` VALUES (28, 1, 15, 27);

-- ----------------------------
-- Table structure for state_question
-- ----------------------------
DROP TABLE IF EXISTS `state_question`;
CREATE TABLE `state_question`  (
  `state_id` int(10) UNSIGNED NOT NULL,
  `question_id` int(10) UNSIGNED NOT NULL,
  INDEX `state_id`(`state_id`) USING BTREE,
  CONSTRAINT `state_question_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of state_question
-- ----------------------------
INSERT INTO `state_question` VALUES (1, 1);
INSERT INTO `state_question` VALUES (12, 19);
INSERT INTO `state_question` VALUES (2, 2);
INSERT INTO `state_question` VALUES (15, 10);
INSERT INTO `state_question` VALUES (15, 11);
INSERT INTO `state_question` VALUES (3, 3);
INSERT INTO `state_question` VALUES (4, 4);
INSERT INTO `state_question` VALUES (5, 5);
INSERT INTO `state_question` VALUES (6, 6);
INSERT INTO `state_question` VALUES (7, 7);
INSERT INTO `state_question` VALUES (20, 9);
INSERT INTO `state_question` VALUES (19, 9);
INSERT INTO `state_question` VALUES (22, 9);
INSERT INTO `state_question` VALUES (23, 9);
INSERT INTO `state_question` VALUES (24, 9);
INSERT INTO `state_question` VALUES (8, 9);
INSERT INTO `state_question` VALUES (21, 11);
INSERT INTO `state_question` VALUES (21, 10);
INSERT INTO `state_question` VALUES (25, 10);
INSERT INTO `state_question` VALUES (25, 11);
INSERT INTO `state_question` VALUES (17, 17);
INSERT INTO `state_question` VALUES (16, 10);
INSERT INTO `state_question` VALUES (16, 11);
INSERT INTO `state_question` VALUES (26, 20);
INSERT INTO `state_question` VALUES (9, 11);
INSERT INTO `state_question` VALUES (9, 10);
INSERT INTO `state_question` VALUES (14, 16);
INSERT INTO `state_question` VALUES (28, 18);
INSERT INTO `state_question` VALUES (28, 21);
INSERT INTO `state_question` VALUES (18, 12);
INSERT INTO `state_question` VALUES (18, 13);
INSERT INTO `state_question` VALUES (18, 14);
INSERT INTO `state_question` VALUES (18, 15);
INSERT INTO `state_question` VALUES (18, 8);
INSERT INTO `state_question` VALUES (10, 12);
INSERT INTO `state_question` VALUES (10, 13);
INSERT INTO `state_question` VALUES (10, 14);
INSERT INTO `state_question` VALUES (10, 15);
INSERT INTO `state_question` VALUES (10, 8);

-- ----------------------------
-- Table structure for state_recommendation
-- ----------------------------
DROP TABLE IF EXISTS `state_recommendation`;
CREATE TABLE `state_recommendation`  (
  `state_id` int(10) UNSIGNED NOT NULL,
  `recommendation_id` int(10) UNSIGNED NOT NULL,
  INDEX `state_id`(`state_id`) USING BTREE,
  CONSTRAINT `state_recommendation_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of state_recommendation
-- ----------------------------
INSERT INTO `state_recommendation` VALUES (11, 24);
INSERT INTO `state_recommendation` VALUES (11, 26);
INSERT INTO `state_recommendation` VALUES (11, 27);
INSERT INTO `state_recommendation` VALUES (13, 45);
INSERT INTO `state_recommendation` VALUES (12, 71);
INSERT INTO `state_recommendation` VALUES (15, 14);
INSERT INTO `state_recommendation` VALUES (15, 15);
INSERT INTO `state_recommendation` VALUES (15, 11);
INSERT INTO `state_recommendation` VALUES (15, 13);
INSERT INTO `state_recommendation` VALUES (15, 16);
INSERT INTO `state_recommendation` VALUES (15, 17);
INSERT INTO `state_recommendation` VALUES (20, 64);
INSERT INTO `state_recommendation` VALUES (20, 14);
INSERT INTO `state_recommendation` VALUES (20, 1);
INSERT INTO `state_recommendation` VALUES (20, 4);
INSERT INTO `state_recommendation` VALUES (19, 63);
INSERT INTO `state_recommendation` VALUES (19, 14);
INSERT INTO `state_recommendation` VALUES (19, 1);
INSERT INTO `state_recommendation` VALUES (19, 4);
INSERT INTO `state_recommendation` VALUES (22, 65);
INSERT INTO `state_recommendation` VALUES (22, 14);
INSERT INTO `state_recommendation` VALUES (22, 1);
INSERT INTO `state_recommendation` VALUES (22, 4);
INSERT INTO `state_recommendation` VALUES (23, 66);
INSERT INTO `state_recommendation` VALUES (23, 14);
INSERT INTO `state_recommendation` VALUES (23, 1);
INSERT INTO `state_recommendation` VALUES (23, 4);
INSERT INTO `state_recommendation` VALUES (24, 67);
INSERT INTO `state_recommendation` VALUES (24, 14);
INSERT INTO `state_recommendation` VALUES (24, 1);
INSERT INTO `state_recommendation` VALUES (24, 4);
INSERT INTO `state_recommendation` VALUES (8, 69);
INSERT INTO `state_recommendation` VALUES (8, 1);
INSERT INTO `state_recommendation` VALUES (8, 4);
INSERT INTO `state_recommendation` VALUES (21, 2);
INSERT INTO `state_recommendation` VALUES (21, 13);
INSERT INTO `state_recommendation` VALUES (21, 70);
INSERT INTO `state_recommendation` VALUES (25, 10);
INSERT INTO `state_recommendation` VALUES (25, 11);
INSERT INTO `state_recommendation` VALUES (25, 12);
INSERT INTO `state_recommendation` VALUES (25, 13);
INSERT INTO `state_recommendation` VALUES (27, 45);
INSERT INTO `state_recommendation` VALUES (27, 46);
INSERT INTO `state_recommendation` VALUES (27, 47);
INSERT INTO `state_recommendation` VALUES (27, 48);
INSERT INTO `state_recommendation` VALUES (16, 43);
INSERT INTO `state_recommendation` VALUES (16, 11);
INSERT INTO `state_recommendation` VALUES (16, 16);
INSERT INTO `state_recommendation` VALUES (16, 13);
INSERT INTO `state_recommendation` VALUES (16, 17);
INSERT INTO `state_recommendation` VALUES (26, 42);
INSERT INTO `state_recommendation` VALUES (9, 3);
INSERT INTO `state_recommendation` VALUES (9, 5);
INSERT INTO `state_recommendation` VALUES (9, 6);
INSERT INTO `state_recommendation` VALUES (9, 7);
INSERT INTO `state_recommendation` VALUES (9, 70);
INSERT INTO `state_recommendation` VALUES (9, 2);
INSERT INTO `state_recommendation` VALUES (14, 9);
INSERT INTO `state_recommendation` VALUES (28, 18);
INSERT INTO `state_recommendation` VALUES (28, 19);
INSERT INTO `state_recommendation` VALUES (28, 20);
INSERT INTO `state_recommendation` VALUES (18, 21);
INSERT INTO `state_recommendation` VALUES (18, 22);
INSERT INTO `state_recommendation` VALUES (18, 23);
INSERT INTO `state_recommendation` VALUES (10, 21);
INSERT INTO `state_recommendation` VALUES (10, 22);
INSERT INTO `state_recommendation` VALUES (10, 23);

SET FOREIGN_KEY_CHECKS = 1;
