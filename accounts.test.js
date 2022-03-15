import { login, register } from './modules/accounts.js'
import { assertEquals, fail, assertThrows } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { db } from './modules/db.js'

// setting a object of preset value to assert against

const records_select = db['SELECT']
const records_insert = db['INSERT']

// function login()

Deno.test('username == username in db.js AND password == password in db.js', () => {
    let obj = {id: 1, user: "user1", pass: "p455w0rd"}
    // arrange - imported the function at the top
    // act - calling the function with sample object defined above
    const outcome = login(obj, records_select.accounts)
    console.log(outcome)
    // assert - checking the return value against what it should be in this case it should return the username
    assertEquals(outcome, true, 'username or password is not equal to one of db.js')
})

Deno.test('username == username in db.js AND password != password in db.js', () => {
    let obj2 = {id: 1, user: "user1", pass: "p455word"}
    // arrange - imported the function at the top
    // act - calling the function with sample object defined above
    const outcome = login(obj2 ,records_select.accounts)
    console.log(outcome)
    // assert - checking the return value against what it should be in this case it should return false
    assertEquals(outcome, false, 'username and password must be equal to values of db.js')
})

Deno.test('username != username in db.js ', () => {
    let obj3 = {id: 1, user: "user2", pass: "p455w0rd"}
    // arrange - imported the function at the top
    // act - calling the function with sample object defined above
    const outcome = login(obj3, records_select.accounts)
    console.log(outcome)
    // assert - checking the return value against what it should be in this case it should return false
    assertEquals(outcome, false , 'username must be equal to value of db.js')
})

Deno.test('throws an exception if argument type string', () => {
    try {
        register("nijwad", "dwadawd")
        fail('the function does not throw an exception')
    } catch(err){
        assertEquals(err.message, 'nijwad or dwadawd are not objects')
    }
})

Deno.test('throws an exception if argument type number', () => {
    try {
        register(1, 2)
        fail('the function does not throw an exception')
    } catch(err){
        assertEquals(err.message, '1 or 2 are not objects')
    }
})

Deno.test('throws an exception if function is passed 3 arguments', () => {
    let obj7 = {id: 1, user: "user3", pass: "p455w0rd"}
    let obj8 = {id: 2, user: "user5", pass: "p455w0rd"}
    try {
        register(obj8, records_select.accounts, obj7)
        fail('the function does not throw an error')
    } catch(err){
        assertEquals(err.message, `function doesn't receive correct number of arguments`)
    }
})

Deno.test('throws an exception if function is passed 1 argument', () => {
    let obj7 = {id: 1, user: "user3", pass: "p455w0rd"}
    try {
        register(obj7)
        fail('the function does not throw an error')
    } catch(err){
        assertEquals(err.message, `function doesn't receive correct number of arguments`)
    }
})



// Deno.test('function loops through all of the data in db.js', () => {
//     // ARRANGE - need to get the length of accounts and define a random object that is not in db.js
//     const records = db['INSERT'].accounts
//     let record_length = records_select.accounts.length
//     let obj4 = {id: 6, user: "admin", pass: "p455w0rd"}
//     // ACT - now call the login function
//     const outcome = login(obj4 ,records_select.accounts, record_length)
//     // ASSERT - check if the return is the same length as record_length
//     assertEquals(outcome[1], record_length, 'function did not go through all data in db.js')
// })

// function register

Deno.test('inserted data already in db.js', () => {
    // arrange - imported the function at the top we ALSO need to clear the INSERT property of the db object
    let obj5 = {id: 2, user: "user2", pass: "p455w0rd"}
    // act - calling the function with sample object defined above
    const outcome = register(obj5, records_insert.accounts)
    // assert - now we try to find the record in db.js and assert the two
    // each user has a unique id so we will choose to assert the id
    assertEquals(outcome, false, 'record is not displaying in db.js')
})


Deno.test('inserted data not already in db.js', () => {
    // arrange - imported the function at the top we ALSO need to clear the INSERT property of the db object
    let obj6 = {id: 3, user: "user3", pass: "p455w0rd"}
    // act - calling the function with sample object defined above
    const outcome = register(obj6, records_insert.accounts)
    // assert - now we try to find the record in db.js and assert the two
    // each user has a unique id so we will choose to assert the id
    assertEquals(outcome, true, 'record is displaying in db.js')
})

Deno.test('throws an exception if argument type string', () => {
    try {
        register("hello", "goodbye")
        fail('the function does not throw an exception')
    } catch(err){
        assertEquals(err.message, 'hello or goodbye are not objects')
    }
})

Deno.test('throws an exception if argument type number', () => {
    try {
        register(1, 2)
        fail('the function does not throw an exception')
    } catch(err){
        assertEquals(err.message, '1 or 2 are not objects')
    }
})

Deno.test('throws an exception if function is passed 3 arguments', () => {
    let obj7 = {id: 1, user: "user3", pass: "p455w0rd"}
    let obj8 = {id: 2, user: "user5", pass: "p455w0rd"}
    try {
        register(obj8, records_select.accounts, obj7)
        fail('the function does not throw an error')
    } catch(err){
        assertEquals(err.message, `function doesn't receive correct number of arguments`)
    }
})

Deno.test('throws an exception if function is passed 1 argument', () => {
    let obj7 = {id: 1, user: "user3", pass: "p455w0rd"}
    try {
        register(obj7)
        fail('the function does not throw an error')
    } catch(err){
        assertEquals(err.message, `function doesn't receive correct number of arguments`)
    }
})


