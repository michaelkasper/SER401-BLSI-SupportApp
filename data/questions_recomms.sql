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

 Date: 04/03/2019 22:42:57
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
INSERT INTO `algorithm` VALUES (1, 'NOM BLSI', 0.00, NULL, NULL, NULL, 'Mon Mar 04 2019', 'Mon Mar 04 2019');

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
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `question_option` VALUES (21, 11, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (22, 11, 'Yes', 0, 1, 1);
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
INSERT INTO `question_option` VALUES (33, 17, 'No', 0, 1, 0);
INSERT INTO `question_option` VALUES (34, 17, 'Yes', 0, 1, 1);
INSERT INTO `question_option` VALUES (35, 18, 'No', 0, 1, 1);
INSERT INTO `question_option` VALUES (36, 18, 'Yes', 0, 1, 0);

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
) ENGINE = InnoDB AUTO_INCREMENT = 69 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recommendation
-- ----------------------------
INSERT INTO `recommendation` VALUES (1, 1, 'Admit to non-ICU', 'An abbreviated period of bed rest of one day or less for stable patients is unequivocally supported for children whose hemoglobin has been documented to be stable. The use of bed rest on the day of admission will be discretionary until data is available.\nPatients not admitted to the ICU and without signs on ongoing bleeding may be allowed to drink and eat when comfortable and able.', NULL);
INSERT INTO `recommendation` VALUES (2, 1, 'Take vitals every 2 hours 4 times, then every 4 hours', '', NULL);
INSERT INTO `recommendation` VALUES (3, 1, 'Type and screen if Hb is close to 7.0', 'No evidence in the literature suggests routinely performing a type and screen in a hemodynamically stable patient, without evidence of ongoing bleeding, and with a stable hemoglobin, above the transfusion threshold is necessary. There is evidence to suggest that eliminating a type and screen in stable patients could potentially reduce the cost of care.', NULL);
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
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of state
-- ----------------------------
INSERT INTO `state` VALUES (1, 1, NULL, NULL);

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
-- Table structure for state_recommendation
-- ----------------------------
DROP TABLE IF EXISTS `state_recommendation`;
CREATE TABLE `state_recommendation`  (
  `state_id` int(10) UNSIGNED NOT NULL,
  `recommendation_id` int(10) UNSIGNED NOT NULL,
  INDEX `state_id`(`state_id`) USING BTREE,
  CONSTRAINT `state_recommendation_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
