import { db } from '/home/codio/workspace/modules/db.js'
// function that selects all of the accounts records from db.js and checks if the username exists and if so pulls the password from that username and then checks it against the one entered.
    // let sql = `SELECT count(id) AS count FROM accounts WHERE user="${data.username}";
export function login(data) {
    const records = db['SELECT'].accounts //get all accounts record from the db.js
    console.log(records)
    console.log(data)
    let password        
    for (let i=0; i<records.length; i++){
        if (data.user === records[i].user){
            password = records[i].pass
            if (data.pass === password){
                return data.user
            } else {
                return false
            }
        }
        continue
    }
    return false
}

export function clear_insert () {
    db['INSERT'].accounts = 0
    return true
}

export function register(data){
    // function to register a user into db.js using INSERT
    db['INSERT'].accounts = data
    console.log(db['INSERT'], data)
    return true
}