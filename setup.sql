
-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS cart;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL
);

CREATE TABLE IF NOT EXISTS stock (
  isbn BIGINT PRIMARY KEY,
  book_title VARCHAR(50) NOT NULL,
  author VARCHAR(75) NOT NULL,
  publication_date DATE NOT NULL,
  filepath VARCHAR(200) NOT NULL,
  description VARCHAR(200),
  trade_price MEDIUMINT NOT NULL,
  retail_price MEDIUMINT NOT NULL,
  quantity MEDIUMINT NOT NULL
);

CREATE TABLE IF NOT EXISTS cart (
  cart_id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  FK_user_id MEDIUMINT UNSIGNED,
  FK_isbn BIGINT,
  FOREIGN KEY (FK_user_id) REFERENCES accounts(id),
  FOREIGN KEY (FK_isbn) REFERENCES stock(isbn)
);
INSERT INTO accounts(user, pass)
	VALUES("user1", "p455w0rd");

INSERT INTO accounts(user, pass)
	VALUES("user2", "p455w0rd");

INSERT INTO accounts(user, pass)
	VALUES("admin", "p455w0rd");
