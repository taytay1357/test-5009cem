
// function that selects all of the accounts records from db.js and checks if the username exists and if so pulls the password from that username and then checks it against the one entered.
export function login(...data) {
    const argument_length = data.length
    const test = data[0]
    const records = data[1]
    console.log(data)
    if (argument_length < 2 || argument_length > 2){
        throw new Error(`function doesn't receive correct number of arguments`)
    }
    if( typeof test !== 'object' || typeof records !== 'object') {
        throw new Error(`${test} or ${records} are not objects`)
    }
    if (test.user === records[0].user){
        if (test.pass === records[0].pass){
            return true
        }
    }
    return false
}


export function register(...data){
    // function to register a user into db.js using INSERT
    const argument_length = data.length
    const test = data[0]
    const records = data[1]
    if (argument_length < 2 || argument_length > 2){
        throw new Error(`function doesn't receive correct number of arguments`)
    }
    if( typeof test !== 'object' || typeof records !== 'object') {
        throw new Error(`${test} or ${records} are not objects`)
    }
    if (test.id === records[0].id) { //i.e. id already in the database
        return false
    } 
    return true
}