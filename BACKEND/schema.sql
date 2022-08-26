-- # create the books tables (if it does not exist)
CREATE TABLE IF NOT EXISTS `reddit`.`posts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(64) NOT NULL,
   `url` VARCHAR(64) NOT NULL,
  `timestamp` BIGINT UNSIGNED NOT NULL,
  `score` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`));

  INSERT INTO `reddit`.`posts` (id, title, url, timestamp, score) VALUES
  (25, "Dear JavaScript", "http://9gag.com", 1494339525, 791),
  (74, "Crockford", "http://9gag.com", 1494138425, 567)
;
