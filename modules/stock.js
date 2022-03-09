import { db } from './db.js'

export async function add_stock(data){
    let sql = `SELECT isbn FROM stock WHERE isbn="${data.fields.isbn}"`
    let status = await db.query(sql)
    Number(data.fields.isbn)
    console.log(status[0].isbn, data.fields.isbn)
    sql = `UPDATE stock SET book_title = "${data.fields.title}", author = "${data.fields.author}", publication_date = "${data.fields.publication_date}", filepath = "${data.files[0].filename}", description = "${data.fields.description}", trade_price = "${data.fields.trade_price}", retail_price = "${data.fields.retail_price}", quantity="${data.fields.quantity}" WHERE isbn = "${data.fields.isbn}";`
    if ( data.fields.isbn != status[0].isbn){
        sql = `INSERT INTO stock(isbn, book_title, author, publication_date, filepath, description, trade_price, retail_price, quantity) VALUES ("${data.fields.isbn}", "${data.fields.title}", "${data.fields.author}", "${data.fields.publication_date}", "${data.files[0].filename}","${data.fields.description}", "${data.fields.trade_price}", "${data.fields.retail_price}", "${data.fields.quantity}")`
    } 
    console.log(sql)
    await db.query(sql)
    return true
}

export async function get_stock() {
    let sql = `SELECT * FROM stock`
    let records = await db.query(sql)
    console.log(sql)
    return records
}