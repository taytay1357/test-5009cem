import { db } from "./db.js";

/**
 * Adds stock to the system.
 * @param {string} data.fields.title
 * @param {string} data.fields.author
 * @param {date} data.fields.publication_date
 * @param {string} data.fields.description
 * @param {number} data.fields.trade_price
 * @param {number} data.fields.retail_price
 * @param {number} data.fields.quantity
 * @param {string} data.files.contentType
 * @param {string} data.files.name
 * @param {string} data.files.filename
 * @returns {string} the sql that is being performed
 */

export async function addStock(data) {
  console.log(data)
  let sql = `SELECT isbn FROM stock WHERE isbn="${data.fields.isbn}"`;
  const status = await db.query(sql);
  Number(data.fields.isbn);
  if (status.length > 0) {
      sql =
        `UPDATE stock SET book_title = "${data.fields.title}", author = "${data.fields.author}", publication_date = "${data.fields.publication_date}", filepath = "${
          data.files[0].filename
        }", description = "${data.fields.description}", trade_price = "${data.fields.trade_price}", retail_price = "${data.fields.retail_price}", quantity="${data.fields.quantity}" WHERE isbn = "${data.fields.isbn}";`;
  } else {
    sql =
      `INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("${data.fields.isbn}", "${data.fields.title}", "${data.fields.author}", "${data.fields.publication_date}", "${
        data.files[0].filename
      }","${data.fields.description}", "${data.fields.trade_price}", "${data.fields.retail_price}", "${data.fields.quantity}")`;
  }
  console.log(sql)
  await db.query(sql);
  return sql;
}

/**
 * @returns {object} the stock records
 */

export async function getStock() {
  const sql = `SELECT * FROM stock`;
  const records = await db.query(sql);
  console.log(sql);
  return records;
}
