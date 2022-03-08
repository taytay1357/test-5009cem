
-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS stock;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL
);

CREATE TABLE IF NOT EXISTS stock (
  isbn MEDIUMINT PRIMARY KEY,
  book_title VARCHAR(50) NOT NULL,
  author VARCHAR(75) NOT NULL,
  publication_data DATE NOT NULL,
  description VARCHAR(200),
  trade_price MEDIUMINT NOT NULL,
  retail_price MEDIUMINT NOT NULL,
  quantity MEDIUMINT NOT NULL
);

INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");
