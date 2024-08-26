-- Create the database
CREATE DATABASE IF NOT EXISTS `prod-tags`;

-- Use the newly created database
USE `prod-tags`;

-- Create the users table
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `username_encrypted` VARCHAR(512) NOT NULL,
    `last_request` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`)
);

-- Create the tags table
CREATE TABLE IF NOT EXISTS `tags` (
    `tag_id` INT NOT NULL AUTO_INCREMENT,
    `tag_user` INT NOT NULL,
    `tag_service` VARCHAR(255) NOT NULL,
    `tag_text` TEXT NOT NULL,
    `tag_addedby` VARCHAR(512) NOT NULL,
    `tag_addedon` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`tag_id`)
);
