import { db } from './db.js'

export async function add_cart(data) {
    let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
    const records = await db.query(sql)
    console.log(records)
    Number(data.isbn)
    const user_id = records[0].id
    sql = `SELECT FK_isbn FROM cart WHERE FK_user_id="${user_id}"`
    const check = await db.query(sql)
    console.log(sql, check)
    if (check.length === 0) {
        console.log("hi")
        sql = `INSERT INTO cart(FK_user_id, FK_isbn) VALUES ("${user_id}", "${data.isbn}")`
        await db.query(sql)
        console.log(sql)
        return true
    } else {
        let test
        for (let i=0; i<check.length; i++){
            if (check[i].FK_isbn == data.isbn) {
                test = false
                break
            } else {
                test = true
            }
        }
        console.log(test)
        if (test === true){
            sql = `INSERT INTO cart(FK_user_id, FK_isbn) VALUES ("${user_id}", "${data.isbn}")`
            await db.query(sql)
            console.log(sql)
            return true
        } else {
            return false
        }
    }
}

export async function get_cart(user){
    let sql = `SELECT id FROM accounts WHERE user="${user}"`
    const records = await db.query(sql)
    console.log(records)
    sql = `SELECT * FROM cart WHERE FK_user_id="${records[0].id}"`
    const actual = await db.query(sql)
    return actual
}