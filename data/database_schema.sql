# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: blsi
# Generation Time: 2019-01-20 03:55:09 +0000
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
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` longtext CHARACTER SET latin1 NOT NULL,
  `version_number` int(11) NOT NULL,
  `short_description` longtext CHARACTER SET latin1,
  `description` longblob,
  `state_id_start` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_1` (`state_id_start`),
  CONSTRAINT `algorithm_ibfk_1` FOREIGN KEY (`state_id_start`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;



# Dump of table question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `question` longblob NOT NULL,
  `prompt` longtext CHARACTER SET utf8mb4,
  `type_key` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_key` (`type_key`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`type_key`) REFERENCES `question_type` (`key`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;

INSERT INTO `question` (`id`, `question`, `prompt`, `type_key`)
VALUES
	(1,X'446F65732073757267656F6E2073757370656374206F6E676F696E67206F72207665727920726563656E7420626C656564696E673F',NULL,'binary'),
	(2,X'41737061727461746520616D696E6F7472616E736665726173652067726561746572207468616E20323030552F4C3F',NULL,'binary'),
	(3,X'4162646F6D696E616C2077616C6C20747261756D612C2074656E6465726E657373206F722064697374656E73696F6E3F',NULL,'binary'),
	(4,X'41626E6F726D616C20636865737420782D7261793F',NULL,'binary'),
	(5,X'50617469656E7420636F6D706C61696E696E67206F66206162646F6D696E616C207061696E3F',NULL,'binary'),
	(6,X'41626E6F726D616C2070616E6372656174696320656E7A796D65733F',NULL,'binary'),
	(7,X'496E6A7572792067726164653F',NULL,'number'),
	(8,X'486220636C6F736520746F20373F',NULL,'binary'),
	(9,X'50617469656E742073796D70746F6D617469633F',NULL,'binary'),
	(10,X'50617469656E74204862206C657373207468616E20373F',NULL,'binary'),
	(11,X'486220737461626C653F',NULL,'binary'),
	(12,X'566974616C73206E6F726D616C3F',NULL,'binary'),
	(13,X'546F6C65726174696E6720646965743F',NULL,'binary'),
	(14,X'4D696E696D616C206162646F6D696E616C207061696E3F',NULL,'binary'),
	(15,X'5375737461696E656420726573706F6E736520746F204C52206F72204E533F',NULL,'binary'),
	(16,X'486173207468652070617469656E74206265656E20676976656E2034306D674C2F6B672050524243733F206F72203420756E6974732050524243733F',NULL,'binary'),
	(17,X'526563757272656E74206879706F74656E73696F6E3F',NULL,'binary');

/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table question_option
# ------------------------------------------------------------

DROP TABLE IF EXISTS `question_option`;

CREATE TABLE `question_option` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `question_id` int(11) unsigned NOT NULL,
  `label` longtext CHARACTER SET utf8mb4,
  `min_value` double DEFAULT NULL,
  `max_value` double DEFAULT NULL,
  `is_good` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `question_option_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;



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
	('binary'),
	('number'),
	('select');

/*!40000 ALTER TABLE `question_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table recommendation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `recommendation`;

CREATE TABLE `recommendation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` longblob NOT NULL,
  `description` longblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

LOCK TABLES `recommendation` WRITE;
/*!40000 ALTER TABLE `recommendation` DISABLE KEYS */;

INSERT INTO `recommendation` (`id`, `title`, `description`)
VALUES
	(1,X'54616B6520766974616C73206576657279203220686F75727320342074696D65732C207468656E206576657279203420686F757273',''),
	(2,X'5479706520616E642073637265656E20696620486220697320636C6F736520746F20372E30',X'4E6F2065766964656E636520696E20746865206C69746572617475726520737567676573747320726F7574696E656C7920706572666F726D696E672061207479706520616E642073637265656E20696E20612068656D6F64796E616D6963616C6C7920737461626C652070617469656E742C20776974686F75742065766964656E6365206F66206F6E676F696E6720626C656564696E672C20616E642077697468206120737461626C652068656D6F676C6F62696E2C2061626F766520746865207472616E73667573696F6E207468726573686F6C64206973206E65636573736172792E2054686572652069732065766964656E636520746F2073756767657374207468617420656C696D696E6174696E672061207479706520616E642073637265656E20696E20737461626C652070617469656E747320636F756C6420706F74656E7469616C6C79207265647563652074686520636F7374206F6620636172652E'),
	(3,X'4265642D72657374206F7665726E69676874',''),
	(4,X'436865636B204862206174203620686F757273',X'54686520757365206F662073657269616C2068656D6F676C6F62696E206D6561737572656D656E74206576657279203620686F75727320697320636F6D6D6F6E6C79207573656420696E20616C6C204E4F4D20737475646965732C20627574206E6F2065766964656E636520737570706F7274732061206D65616E696E6766756C20696D70616374206F6E206D616E6167656D656E742E'),
	(5,X'436865636B20486220617420313220686F757273',X'54686520757365206F662073657269616C2068656D6F676C6F62696E206D6561737572656D656E74206576657279203620686F75727320697320636F6D6D6F6E6C79207573656420696E20616C6C204E4F4D20737475646965732C20627574206E6F2065766964656E636520737570706F7274732061206D65616E696E6766756C20696D70616374206F6E206D616E6167656D656E742E'),
	(6,X'436865636B20486220617420323420686F757273',X'54686520757365206F662073657269616C2068656D6F676C6F62696E206D6561737572656D656E74206576657279203620686F75727320697320636F6D6D6F6E6C79207573656420696E20616C6C204E4F4D20737475646965732C20627574206E6F2065766964656E636520737570706F7274732061206D65616E696E6766756C20696D70616374206F6E206D616E6167656D656E742E'),
	(7,X'41646D697420746F20666C6F6F72',''),
	(8,X'41646D696E6973746572203230206D4C2F6B67206F66204C5220286C61636572617465642072696E67657229206F72204E5320286E6F726D616C2073616C696E6529',''),
	(9,X'47697665203130206D4C2F6B67206F66205052424373',X'5472616E73667573696F6E206F662072656420626C6F6F642063656C6C7320696E20726573706F6E736520746F2073686F636B206973207265636F6D6D656E6465642C20627574206E6F20737475646965732068617665206576616C7561746564206966207472616E73667573696F6E206265666F7265207375726765727920776F756C6420696D70726F7665207468652073756363657373207261746573206F66204E4F4D2E'),
	(10,X'4E504F',''),
	(11,X'4265642D72657374206164646974696F6E616C206E69676874',X'416E20616262726576696174656420706572696F64206F66206265642072657374206F66206F6E6520646179206F72206C65737320666F7220737461626C652070617469656E747320697320756E65717569766F63616C6C7920737570706F7274656420666F72206368696C6472656E2077686F73652068656D6F676C6F62696E20686173206265656E20646F63756D656E74656420746F20626520737461626C652E2054686520757365206F66206265642072657374206F6E2074686520646179206F662061646D697373696F6E2077696C6C2062652064697363726574696F6E61727920756E74696C206461746120697320617661696C61626C652E'),
	(12,X'436865636B204862206576657279203620686F757273',X'54686520757365206F662073657269616C2068656D6F676C6F62696E206D6561737572656D656E74206576657279203620686F75727320697320636F6D6D6F6E6C79207573656420696E20616C6C204E4F4D20737475646965732C20627574206E6F2065766964656E636520737570706F7274732061206D65616E696E6766756C20696D70616374206F6E206D616E6167656D656E742E'),
	(13,X'4F627461696E206162646F6D696E616C204354207363616E',''),
	(14,X'41646D697420746F2050494355',''),
	(15,X'4265642D7265737420756E74696C20486220697320737461626C65',''),
	(16,X'436F6E736964657220656D626F6C697A6174696F6E',''),
	(17,X'41646D696E6973746572203130202D203230204D4C2F6B67206F66205052424373',X'5472616E73667573696F6E206F662072656420626C6F6F642063656C6C7320696E20726573706F6E736520746F2073686F636B206973207265636F6D6D656E6465642C20627574206E6F20737475646965732068617665206576616C7561746564206966207472616E73667573696F6E206265666F7265207375726765727920776F756C6420696D70726F7665207468652073756363657373207261746573206F66204E4F4D2E'),
	(18,X'436F6E7369646572206F746865722063617573657320286865616420696E6A7572792C2074656E73696F6E20706E65756D6F74686F7261782C2074616D706F6E6164652C2070656C7669632068656D6F72726861676529',X'4661696C75726520746F2073746162696C697A65206173206E6F7465642062792070657273697374656E74206F7220726563757272656E74206879706F74656E73696F6E2063616E6E6F742068617665204E4F4D20646963746174656420627920616C676F726974686D20616C6F6E6520776974686F75742074616B696E6720696E746F206163636F756E74206C6F63616C207265736F757263657320616E64206F7468657220696E6A75726965732E2054686573652070617469656E74732073686F756C6420626520636F6E7369646572656420666F7220737572676572792C20757267656E7420656D626F6C697A6174696F6E2C206F7220636F6E74696E756564204E4F4D2C20646570656E64696E67206F6E206F7468657220696E6A757269657320616E64207468652063656E746572E2809973207265736F75726365732E205768657265206E6F7420636F6E747261696E646963617465642C2061204E4F4D2067756964656C696E65206D6179206265206170706C69656420746F2070617469656E74732077697468206D756C7469706C6520696E6A75726965732E20496E2070617469656E74732077697468206F7468657220696E7472612D6162646F6D696E616C20696E6A75726965732C20737563682061732070616E6372656174696320747261756D61206F7220736D616C6C20626F77656C20696E6A7572792C20746865206F7468657220696E6A7572696573206D61792074616B65207072696F72697479206F76657220746865206C69766572206F722073706C65656E20696E6A7572792E'),
	(19,X'436F6E7369646572206D617373697665207472616E73667573696F6E2070726F746F636F6C',''),
	(20,X'466C6F6F722073746174757320666F7220313820686F757273',''),
	(21,X'4769766520726567756C61722064696574',''),
	(22,X'416D62756C617465',''),
	(23,X'53756363657373206F66204E4F4D20627920616C676F726974686D',''),
	(24,X'50617469656E74206D6565747320637269746572696120666F7220646973636861726765',X'496E206368696C6472656E20776974682069736F6C6174656420424C534920776974686F7574207369676E73206F6620636C696E6963616C20626C656564696E672061742070726573656E746174696F6E20616E6420737461626C652068656D6F676C6F62696E2C20646973636861726765206265666F726520323420686F757273207365656D7320746F20626520736166652E2050617469656E7473206174207269736B20666F72206D697373656420696E6A7572792C206E65656420666F72206F7065726174696F6E2C206F7220726563757272656E7420626C656564696E67206172652074686F73652077697468206D756C7469706C65206964656E746966696564206162646F6D696E616C20696E6A75726965732028657370656369616C6C792070616E6372656173292C2074686F73652077697468206120636F6E747261737420626C757368206F6E204354207363616E2C20616E642074686F736520776974682062696379636C652068616E646C6562617220696E6A7572696573206D6179206E6F742062652063616E6469646174657320666F72206561726C79206469736368617267652E2053696E63652064656C6179656420626C656564732068617665206F6363757272656420286F6674656E206F757473696465206F662074686520415053412067756964656C696E6520706572696F64292C207374616E64617264697A656420656475636174696F6E2072656D61696E7320616E20696D706F7274616E7420636F6D706F6E656E74206F66206469736368617267652E'),
	(25,X'5573652063617574696F6E2069662069742077617320616E206162646F6D696E616C2077616C6C20696E6A757279202868616E646C6562617220696E6A757279206F72207365617462656C74207369676E29',''),
	(26,X'50726F766964652064697363686172676520696E737472756374696F6E73',X'496E206368696C6472656E20776974682069736F6C6174656420424C534920776974686F7574207369676E73206F6620636C696E6963616C20626C656564696E672061742070726573656E746174696F6E20616E6420737461626C652068656D6F676C6F62696E2C20646973636861726765206265666F726520323420686F757273207365656D7320746F20626520736166652E2050617469656E7473206174207269736B20666F72206D697373656420696E6A7572792C206E65656420666F72206F7065726174696F6E2C206F7220726563757272656E7420626C656564696E67206172652074686F73652077697468206D756C7469706C65206964656E746966696564206162646F6D696E616C20696E6A75726965732028657370656369616C6C792070616E6372656173292C2074686F73652077697468206120636F6E747261737420626C757368206F6E204354207363616E2C20616E642074686F736520776974682062696379636C652068616E646C6562617220696E6A7572696573206D6179206E6F742062652063616E6469646174657320666F72206561726C79206469736368617267652E2053696E63652064656C6179656420626C656564732068617665206F6363757272656420286F6674656E206F757473696465206F662074686520415053412067756964656C696E6520706572696F64292C207374616E64617264697A656420656475636174696F6E2072656D61696E7320616E20696D706F7274616E7420636F6D706F6E656E74206F66206469736368617267652E'),
	(27,X'4E6F2069627570726F66656E2C206E6170726F78656E2C206F72206F7468657220647275672073746F7265207061696E206D656469636174696F6E73',X'4368696C6472656E20617265206164766973656420746F2061766F6964206E6F6E737465726F6964616C20616E74692D696E666C616D6D61746F7279206472756773206174207468652074696D65206F66207468652064697363686172676520756E74696C20666F6C6C6F772D757020697320636F6D706C6574652E'),
	(28,X'41636574616D696E6F7068656E202874796C656E6F6C29206973206F6B6179',''),
	(29,X'4D617920676F206261636B20746F207363686F6F6C207768656E206F6666206E6172636F746963207061696E206D65646963696E6573',''),
	(30,X'526573747269637465642061637469766974792070657220415053412047756964656C696E657320666F7220696E6A757279206772616465202B2032207765656B73',''),
	(31,X'4E6F2067796D20636C617373',X'4368696C6472656E206D61792072657475726E20746F207363686F6F6C207768656E20636F6D666F727461626C6520616E642061626C6520746F20636F6D706C792077697468206F6E676F696E672073706F72747320616E6420636F6E74616374207265737472696374696F6E732E204D6F64696669636174696F6E7320746F20616C6C6F77206368696C6472656E20746F206368616E676520636C617373206561726C792073686F756C64206265207573656420696620746865726520697320636F6E6365726E2061626F757420696E6A757279206F6363757272696E67206265747765656E20636C6173736573206F7220656C736577686572652C20646570656E64696E67206F6E20746865206368696C64E280997320656E7669726F6E6D656E742E'),
	(32,X'4E6F2073706F727473',X'4368696C6472656E206D61792072657475726E20746F207363686F6F6C207768656E20636F6D666F727461626C6520616E642061626C6520746F20636F6D706C792077697468206F6E676F696E672073706F72747320616E6420636F6E74616374207265737472696374696F6E732E204D6F64696669636174696F6E7320746F20616C6C6F77206368696C6472656E20746F206368616E676520636C617373206561726C792073686F756C64206265207573656420696620746865726520697320636F6E6365726E2061626F757420696E6A757279206F6363757272696E67206265747765656E20636C6173736573206F7220656C736577686572652C20646570656E64696E67206F6E20746865206368696C64E280997320656E7669726F6E6D656E742E'),
	(33,X'4E6F20726F75676820706C6179',X'4368696C6472656E206D61792072657475726E20746F207363686F6F6C207768656E20636F6D666F727461626C6520616E642061626C6520746F20636F6D706C792077697468206F6E676F696E672073706F72747320616E6420636F6E74616374207265737472696374696F6E732E204D6F64696669636174696F6E7320746F20616C6C6F77206368696C6472656E20746F206368616E676520636C617373206561726C792073686F756C64206265207573656420696620746865726520697320636F6E6365726E2061626F757420696E6A757279206F6363757272696E67206265747765656E20636C6173736573206F7220656C736577686572652C20646570656E64696E67206F6E20746865206368696C64E280997320656E7669726F6E6D656E742E'),
	(34,X'4E6F2072656372656174696F6E616C2061637469766974696573207769746820776865656C73',X'4368696C6472656E206D61792072657475726E20746F207363686F6F6C207768656E20636F6D666F727461626C6520616E642061626C6520746F20636F6D706C792077697468206F6E676F696E672073706F72747320616E6420636F6E74616374207265737472696374696F6E732E204D6F64696669636174696F6E7320746F20616C6C6F77206368696C6472656E20746F206368616E676520636C617373206561726C792073686F756C64206265207573656420696620746865726520697320636F6E6365726E2061626F757420696E6A757279206F6363757272696E67206265747765656E20636C6173736573206F7220656C736577686572652C20646570656E64696E67206F6E20746865206368696C64E280997320656E7669726F6E6D656E742E'),
	(35,X'4E6F206163746976697469657320776865726520626F74682066656574206C65617665207468652067726F756E64206174207468652073616D652074696D65',X'4368696C6472656E206D61792072657475726E20746F207363686F6F6C207768656E20636F6D666F727461626C6520616E642061626C6520746F20636F6D706C792077697468206F6E676F696E672073706F72747320616E6420636F6E74616374207265737472696374696F6E732E204D6F64696669636174696F6E7320746F20616C6C6F77206368696C6472656E20746F206368616E676520636C617373206561726C792073686F756C64206265207573656420696620746865726520697320636F6E6365726E2061626F757420696E6A757279206F6363757272696E67206265747765656E20636C6173736573206F7220656C736577686572652C20646570656E64696E67206F6E20746865206368696C64E280997320656E7669726F6E6D656E742E'),
	(36,X'547261756D6120736572766963652077696C6C2070726F76696465206D65646963616C207065726D697373696F6E20666F72206561726C7920636C617373206368616E676520666F722073747564656E7473206174207269736B206F66207265696E6A757279206265747765656E20636C6173736573',X'4368696C6472656E206D61792072657475726E20746F207363686F6F6C207768656E20636F6D666F727461626C6520616E642061626C6520746F20636F6D706C792077697468206F6E676F696E672073706F72747320616E6420636F6E74616374207265737472696374696F6E732E204D6F64696669636174696F6E7320746F20616C6C6F77206368696C6472656E20746F206368616E676520636C617373206561726C792073686F756C64206265207573656420696620746865726520697320636F6E6365726E2061626F757420696E6A757279206F6363757272696E67206265747765656E20636C6173736573206F7220656C736577686572652C20646570656E64696E67206F6E20746865206368696C64E280997320656E7669726F6E6D656E742E'),
	(37,X'52657475726E20746F20656D657267656E6379206465706172746D656E7420666F7220696E6372656173696E67207061696E2C2070616C656E6573732C2064697A7A696E6573732C2073686F72746E657373206F66206272656174682C20766F6D6974696E672C20776F7273656E696E672073686F756C646572207061696E2C20696E74657374696E616C20626C656564696E672C206F7220626C61636B2074617272792073746F6F6C73',X'506172656E747320616E642070617469656E74732061726520696E737472756374656420746F2072657475726E20746F2074686520656D657267656E6379206465706172746D656E7420666F7220696E6372656173696E67207061696E2C2070616C6C6F722C2064697A7A696E6573732C20646966666963756C747920627265617468696E672C20766F6D6974696E672C20776F7273656E696E672073686F756C646572207061696E2C206A61756E646963652C2067617374726F696E74657374696E616C20626C656564696E672C206F7220626C61636B2074617272792073746F6F6C732E'),
	(38,X'4772616465203120E28093203220696E6A7572793A2070686F6E652063616C6C20666F6C6C6F772D75702061742032207765656B73',X'4772616465203120E28093203220696E6A757269657320726563656976652074656C6570686F6E6520666F6C6C6F772D75702061742032207765656B732C20616E64204772616465203320E28093203520696E6A75726965732072656365697665206F66666963652076697369742061742032207765656B732E'),
	(39,X'4772616465203320E28093203520696E6A7572793A206F66666963652076697369742061742032207765656B73',X'4772616465203120E28093203220696E6A757269657320726563656976652074656C6570686F6E6520666F6C6C6F772D75702061742032207765656B732C20616E64204772616465203320E28093203520696E6A75726965732072656365697665206F66666963652076697369742061742032207765656B732E'),
	(40,X'4E6F20726F7574696E6520666F6C6C6F772D757020696D6167696E6720697320726571756972656420756E6C6573732073796D70746F6D7320646576656C6F70',''),
	(41,X'52656D61696E20696E2050494355',''),
	(42,X'41646D696E6973746572203130202D203330206D4C2F6B67206F66205052424373',X'5472616E73667573696F6E206F662072656420626C6F6F642063656C6C7320696E20726573706F6E736520746F2073686F636B206973207265636F6D6D656E6465642C20627574206E6F20737475646965732068617665206576616C7561746564206966207472616E73667573696F6E206265666F7265207375726765727920776F756C6420696D70726F7665207468652073756363657373207261746573206F66204E4F4D2E'),
	(43,X'4265642D72657374',''),
	(44,X'4661696C757265206F66204E4F4D20627920616C676F726974686D',''),
	(45,X'416E67696F67726170687920616E6420656D626F6C697A6174696F6E',''),
	(46,X'53757267657279',''),
	(47,X'4E4F4D2061742073757267656F6EE28099732064697363726574696F6E',''),
	(48,X'4E4F4D20696E207468652066616365206F662070657269746F6E697469732073686F756C64206265206578636C756465642066726F6D206120504D4720666F7220534F492E',''),
	(49,X'41207472616E73667573696F6E207468726573686F6C64206F6620372E3020672F644C206973207361666520616E6420726561736F6E61626C6520666F72206368696C6472656E20756E646572676F696E67204E4F4D20666F7220424C53492E',''),
	(50,X'4D616E6167656D656E74206F662070656469617472696320424C5349206D6179206265206261736564206F6E2068656D6F64796E616D6963207374617475732C20726174686572207468616E2067726164652E',''),
	(51,X'5472616E73667573696F6E206265796F6E64203430206D4C2F6B67206F72203E34205520696E2070656469617472696320747261756D61207365656D7320746F20626520686967686C7920636F7272656C617465642077697468206661696C757265206F66204E4F4D2C20616E642063617265206265796F6E64207468657365207468726573686F6C64732073686F756C6420626520696E646976696475616C697A65642E',''),
	(52,X'48656D6F64796E616D6963207374617475732061742070726573656E746174696F6E206D6179206265207573656420617320612064657465726D696E616E7420666F72204943552061646D697373696F6E207265676172646C657373206F662067726164652C20776974682074686520657863657074696F6E206F66204772616465203520696E6A75726965732C2077686963682072657175697265204943552E',''),
	(53,X'4145206D6179206265207573656420696E20746865204E4F4D206F66206368696C6472656E207769746820424C534920746F20696D70726F76652073706C656E69632073616C7661676520616E6420706F737369626C7920636F6D706C656D656E7420617661696C61626C652074726561746D656E7473206F66206865706174696320696E6A7572792C20627574206E6F7420616C6C206368696C6472656E207769746820636F6E74726173742065787472617661736174696F6E206E6565642041452E',''),
	(54,X'436C696E6963616C2064657465726D696E6174696F6E206F6620726563656E74206F72206F6E676F696E6720626C656564696E6720696E206368696C6472656E20726571756972657320696E746567726174696F6E206F66206D756C7469706C6520666163746F727320746F2064657465726D696E65207468652072656C617469766520696D706F7274616E6365206F6620534F4920626C656564696E672E20496D706F7274616E7420666163746F727320746F20636F6E736964657220617265206C6973746564206F6E2074686520616C676F726974686D20696E737472756374696F6E7320746F2061737369737420696E207468652064657465726D696E6174696F6E20726563656E7420626C656564696E67207369676E69666963616E7420656E6F75676820746F20737567676573742073686F636B2E',''),
	(55,X'436F6E736964657220757365206F6620313A313A31207472616E73667573696F6E20726174696F73206561726C7920696E2072657375736369746174696F6E2E',''),
	(56,X'436F6E73696465726174696F6E20666F72205445472D64697265637465642074686572617079206D617920626520676976656E206261736564206F6E206164756C7420646174612E',''),
	(57,X'4C696D6974696E67206372797374616C6C6F696420766F6C756D6520616E64206561726C7920757365206F66207472616E73667573696F6E20696E206368696C6472656E2077697468207369676E69666963616E7420626C656564696E672073686F756C6420626520636F6E73696465726564206261736564206F6E20746865206164756C74206C6974657261747572652E',''),
	(58,X'412070656469617472696320504D47206D6179206265207573656420666F7220616C6C206368696C6472656E203C203138207965617273206F66206167652C2062757420612063617574696F6E2061626F75742074686520757365206F662074686520616C676F726974686D20666F72206368696C6472656E203E203136206F6620616765206D617920626520617070726F7072696174652E',''),
	(59,X'5768696C6520726F7574696E65207265696D6167696E6720696E20616C6C206368696C6472656E207769746820424C5349206973206E6F7420696E646963617465642C20736F6D65206361736573206D61792062656E656669742066726F6D207265696D6167696E672E2050617469656E74732077686F206D696768742062656E656669742068617665206E6F74206265656E20646566696E65642C206275742070617469656E7473207769746820686967682D677261646520696E6A7572696573206E656172207468652068696C756D207365656D20746F20626520617420746865206772656174657374207269736B206F6620646576656C6F70696E672070736575646F616E65757279736D73206261736564206F6E20746865207265706F72746564206361736573206F662072656C6576616E742070736575646F616E65757279736D732E',''),
	(60,X'455243502063616E20626520636F6E7369646572656420617320616E2061646A756E637420696E20746865206D616E6167656D656E74206F6620626C756E74206865706174696320696E6A75727920776974682062696C6F6D61206F722064756374616C20696E6A7572792E',''),
	(61,X'4D616E6167656D656E74206F66206C6174652D70726573656E74696E67206C69766572206F722073706C65656E20696E6A757279206265796F6E6420323420686F757273206F6620696E6A757279206973206174207468652064697363726574696F6E206F6620746865207472656174696E672073757267656F6E2E2050617469656E7420636172652073686F756C6420626520626173656420707265646F6D696E616E746C79206F6E2074686520726561736F6E20666F722066696E616C6C79207365656B696E67206361726520287061696E2C20696C6575732C206574632E2920726174686572207468616E206F6E2074686520696E697469616C20696E6A7572792E',''),
	(62,X'3825206F6620706F70756C6174696F6E3B2035322E36207269736B206F66204941493B2031312E3925207269736B206F662049414920696E74657276656E74696F6E',''),
	(63,X'4164646974696F6E616C20333825206F662074686520706F70756C6174696F6E3B2031322E3625207269736B206F66204941493B20342E3025207269736B206F6620494149202D696E74657276656E74696F6E',''),
	(64,X'4164646974696F6E616C203225206F662074686520706F70756C6174696F6E3B20362E3725207269736B206F66204941493B20302E3025207269736B206F6620494149202D696E74657276656E74696F6E',''),
	(65,X'4164646974696F6E616C203225206F662074686520706F70756C6174696F6E3B20322E3325207269736B206F66204941493B20302E3025207269736B206F6620494149202D696E74657276656E74696F6E',''),
	(66,X'4164646974696F6E616C20313725206F662074686520706F70756C6174696F6E3B20312E3525207269736B206F66204941493B20302E3025207269736B206F6620494149202D696E74657276656E74696F6E',''),
	(67,X'412068656D6F676C6F62696E2064726F70206F6620302E3520672F644C2074686520646179206F662061646D697373696F6E20697320657870656374656420666F726D20612032302D6D4C2F6B6720626F6C7573206F66206372797374616C6C6F696420696E20612070617469656E7420726563656976696E67206D61696E74656E616E636520616E6420646F6573206E6F7420726570726573656E74206F6E676F696E6720626C656564696E672E',NULL);

/*!40000 ALTER TABLE `recommendation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table state
# ------------------------------------------------------------

DROP TABLE IF EXISTS `state`;

CREATE TABLE `state` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `state_id_next_good` int(11) unsigned DEFAULT NULL,
  `state_id_next_bad` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `state_id_next_good` (`state_id_next_good`),
  KEY `state_id_next_bad` (`state_id_next_bad`),
  CONSTRAINT `state_ibfk_1` FOREIGN KEY (`state_id_next_good`) REFERENCES `state` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `state_ibfk_2` FOREIGN KEY (`state_id_next_bad`) REFERENCES `state` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;



# Dump of table state_question
# ------------------------------------------------------------

DROP TABLE IF EXISTS `state_question`;

CREATE TABLE `state_question` (
  `state_id` int(11) unsigned NOT NULL,
  `question_id` int(11) unsigned NOT NULL,
  KEY `state_id` (`state_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `state_question_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `state_question_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;



# Dump of table state_recommendation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `state_recommendation`;

CREATE TABLE `state_recommendation` (
  `state_id` int(11) unsigned NOT NULL,
  `recommendation_id` int(11) unsigned NOT NULL,
  KEY `state_id` (`state_id`),
  KEY `recommendation_id` (`recommendation_id`),
  CONSTRAINT `state_recommendation_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `state_recommendation_ibfk_2` FOREIGN KEY (`recommendation_id`) REFERENCES `recommendation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
