export function get_stock(...data) {
    const test = data[0]
    const records = data[1]
    const argument_length = data.length
    if (argument_length < 2 || argument_length > 2){
        throw new Error(`function doesn't receive correct number of arguments`)
    }
    if( typeof test !== 'object' || typeof records !== 'object') {
        throw new Error(`${test} or ${records} are not objects`)
    }
    if (test.isbn === records[0].isbn){
        return true
    }
    return false
}


export function add_stock(...data){
    const test1 = data[0]
    const test2 = data[1]
    const insert_records = data[2]
    const update_records = data[3]
    const select_records = data[4]
    const argument_length = data.length
     if (argument_length < 5 || argument_length > 5){
        throw new Error(`function doesn't receive correct number of arguments`)
    }
    if( typeof test1 !== 'object' || typeof test2 !== 'object' || typeof insert_records !== 'object' || typeof update_records !== 'object' || typeof select_records !== 'object') {
        throw new Error(`${test1}, ${test2}, ${insert_records}, ${update_records}, ${select_records} are not objects`)
    }
    if (test1.isbn === select_records[0].isbn ){
        if ( test1.isbn === update_records[0].isbn){
            return true
        } 
    } else {
    if ( test2.isbn === insert_records[0].isbn){
        return true
    }
    }
    return false
}