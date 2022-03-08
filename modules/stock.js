import { db } from './db.js'

export async function add_stock(data){
    console.log(data)
    let sql = `INSERT INTO stock(isbn, book_title, author, publication_date, description, trade_price, retail_price, quantity) VALUES (`
}