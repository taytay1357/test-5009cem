
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


INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9780020198819","The Great Gatsby","F. Scott Fitzgerald","1925-04-10","/uploads/gatsby.jpg","Fantasy",25,25, 8);
INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9780060276362","The Lion, The Witch and The Wardrobe","C.S.Lewis","1950-08-19","/uploads/narnia.jpg","Narnia",25,25,5);
INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9780099549482","To Kill A Mockingbird","Harper Lee","1960-07-11","/uploads/mocking.jpg","Classic Novel",30,30,8);
INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9780099579939","Fifty Shades of Grey","E.L.James","2011-05-25","/uploads/fifty.jpg","Fantasy",10,10,14);
INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9780140430721","Pride and Prejudice","Jane Austen","1813-01-28","/uploads/pride.jpg","History", 30,30,5);
INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9780261103689","The Lord of The Rings","J.R.R.Tolkein","1955-08-20","/uploads/rings.jpg","Fantasy",20, 20,4);
INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9780563403067","Pingu in Trouble","BBC Children's Books","2004-05-27","/uploads/pingu.jpg","Children", 3, 3,7);
INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9780747532743","Harry Potter and The Philosophers Stone","J.K.Rowling","1997-06-26","/uploads/harry.jpg","harry potter book",40, 40, 10);
INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9783806741360","The Very Hungry Catepillar","Eric Carle","1969-06-03","/uploads/hungry.jpg", "Children", 8,8,20);
INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("9788854172388","The Little Prince","Antoine de Saint-Exupéry","1943-04-06", "/uploads/prince.jpg", "Children",8, 8,3);

