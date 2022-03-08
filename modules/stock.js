import { db } from './db.js'

export async function add_stock(data){
    let sql = `INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("${data.fields.isbn}", "${data.fields.title}", "${data.fields.author}", "${data.fields.publication_date}", "${data.files[0].filename}","${data.fields.description}", "${data.fields.trade_price}", "${data.fields.retail_price}", "${data.fields.quantity}")`
    console.log(sql)
    await db.query(sql)
    return true
}