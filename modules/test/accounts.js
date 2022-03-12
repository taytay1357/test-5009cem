import { db } from './db.js'
// function that selects all of the accounts records from db.js and checks if the username exists and if so pulls the password from that username and then checks it against the one entered.
    // let sql = `SELECT count(id) AS count FROM accounts WHERE user="${data.username}";
export function login(data) {
    const records = db['SELECT'].accounts //get all accounts record from the db.js
    let password        
    for (let i=0; i<records.length; i++){
        if (data.user === records[i].user){
            password = records[i].pass
            if (data.pass === password){
                return data.user
            } else {
                return false
            }
            break
        }
    }
    return false
}

export function clear_insert () {
    db['INSERT'] = []
    return true
}

export function register(data){
    // function to register a user into db.js using INSERT
    db['INSERT'].accounts.push(data)
    return true
}