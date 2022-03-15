import { db } from './db.js'

export async function addCart(data) {
    let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
    const records = await db.query(sql)
    console.log(data, "here")
    Number(data.isbn)
    const userId = records[0].id
    console.log("hi")
    sql = `INSERT INTO cart(FK_user_id, FK_isbn) VALUES ("${userId}", "${data.isbn}")`
    await db.query(sql)
    console.log(sql)
}

export async function getCart(user){
    if (user === undefined){
        return false
    } else {
    let sql = `SELECT id FROM accounts WHERE user="${user}"`
    const records = await db.query(sql)
    console.log(user)
    sql = `SELECT * FROM cart WHERE FK_user_id="${records[0].id}"`
    const actual = await db.query(sql)
    return actual
    }
}

export async function deleteCart(data){
    console.log(data)
    let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
    const record = await db.query(sql)
    console.log(sql)
    const userId = record[0].id
    if (data.record === "*"){
        sql = `DELETE FROM cart WHERE FK_user_id="${userId}"`
        await db.query(sql)
        console.log(sql)
    } else {
        sql = `DELETE FROM cart WHERE FK_isbn="${data.record}" AND FK_user_id="${user_id}"`
        await db.query(sql)
        console.log(sql)
    }
    return true
}