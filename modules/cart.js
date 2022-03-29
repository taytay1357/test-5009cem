import { db } from "./db.js";

/**
 * Adds a record to users cart.
 * @param {number} cart_id
 * @param {number} FK_user_id
 * @param {number} FK_isbn
 * @returns {boolean} boolean to determine whether add was successful
 */

export async function addCart(data) {
  let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`;
  const records = await db.query(sql);
  if (records.length > 0) {
    Number(data.isbn);
    const userId = records[0].id;
    console.log("hi");
    sql =
      `INSERT INTO cart(FK_user_id, FK_isbn) VALUES ("${userId}", "${data.isbn}")`;
    await db.query(sql);
    console.log(sql);
    return true;
  } else {
    return false;
  }
}

/**
 * Gets users cart.
 * @param {string} username
 * @returns {boolean} boolean to determine whether there are records for that username
 */

export async function getCart(user) {
  if (user === undefined) {
    return false;
  } else {
    let sql = `SELECT id FROM accounts WHERE user="${user}"`;
    const records = await db.query(sql);
    console.log(user);
    if (records.length > 0) {
      sql = `SELECT * FROM cart WHERE FK_user_id="${records[0].id}"`;
      const actual = await db.query(sql);
      console.log(actual);
      return actual;
    } else {
      return false;
    }
  }
}

/**
 * Adds a record to users cart.
 * @param {number} record
 * @param {string} authorised
 * @returns {boolean} boolean to determine whether delete was successful
 */

export async function deleteCart(data) {
  console.log(data);
  let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`;
  const record = await db.query(sql);
  console.log(sql);
  const userId = record[0].id;
  if (data.record === "*") {
    sql = `DELETE FROM cart WHERE FK_user_id="${userId}"`;
    await db.query(sql);
    console.log(sql);
    return false;
  } else {
    sql =
      `DELETE FROM cart WHERE FK_isbn="${data.record}" AND FK_user_id="${userId}"`;
    await db.query(sql);
    console.log(sql);
    return true;
  }
}
