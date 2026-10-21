CREATE TABLE `torpetarna`.`kozetek` ( `id` INT(3) NOT NULL AUTO_INCREMENT , `nev` VARCHAR(20) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `torpetarna`.`torpek` ( `id` INT(3) NOT NULL AUTO_INCREMENT , `nev` VARCHAR(30) NOT NULL , `klan` VARCHAR(30) NOT NULL , `nem` VARCHAR(1) NOT NULL , `suly` INT(3) NOT NULL , `magassag` INT(3) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `torpetarna`.`tarnak` ( `id` INT(3) NOT NULL AUTO_INCREMENT , `nev` VARCHAR(30) NOT NULL , `kozet_id` INT(3) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `torpetarna`.`kihol` ( `torpe_id` INT(3) NOT NULL , `tarna_id` INT(3) NOT NULL , `kitermelt_mennyiseg` INT(3) NOT NULL ) ENGINE = InnoDB;

ALTER TABLE `kihol` ADD PRIMARY KEY( `torpe_id`, `tarna_id`);