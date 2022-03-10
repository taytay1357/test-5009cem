import { db } from './db.js'

export async function add_cart(data) {
    let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
    const records = await db.query(sql)
    console.log(data, "here")
    Number(data.isbn)
    const user_id = records[0].id
    console.log("hi")
    sql = `INSERT INTO cart(FK_user_id, FK_isbn) VALUES ("${user_id}", "${data.isbn}")`
    await db.query(sql)
    console.log(sql)
}

export async function get_cart(user){
    let sql = `SELECT id FROM accounts WHERE user="${user}"`
    const records = await db.query(sql)
    console.log(records)
    sql = `SELECT * FROM cart WHERE FK_user_id="${records[0].id}"`
    const actual = await db.query(sql)
    return actual
}

export async function delete_cart(data){
    console.log(data)
    let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
    const record = await db.query(sql)
    console.log(sql)
    let user_id = record[0].id
    if (data.record === "*"){
        sql = `DELETE FROM cart WHERE FK_user_id="${user_id}"`
        await db.query(sql)
        console.log(sql)
    } else {
        sql = `DELETE FROM cart WHERE FK_isbn="${data.record}" AND FK_user_id="${user_id}"`
        await db.query(sql)
        console.log(sql)
    }
    return true
}