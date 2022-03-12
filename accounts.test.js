import { login, register, clear_insert } from './modules/accounts.js'
import { assertEquals, fail, assertThrows } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { db } from './modules/db.js'

// setting a object of preset value to assert against


// function login()

Deno.test('username == username in db.js AND password == password in db.js', () => {
    let obj = {id: 1, user: "user1", pass: "p455w0rd"}
    // arrange - imported the function at the top
    // act - calling the function with sample object defined above
    const outcome = login(obj)
    // assert - checking the return value against what it should be in this case it should return the username
    assertEquals(outcome, obj.user, 'username or password is not equal to one of db.js')
})

Deno.test('username == username in db.js AND password != password in db.js', () => {
    let obj2 = {id: 1, user: "user1", pass: "p455word"}
    // arrange - imported the function at the top
    // act - calling the function with sample object defined above
    const outcome = login(obj2)
    // assert - checking the return value against what it should be in this case it should return false
    assertEquals(outcome, false, 'username and password must be equal to values of db.js')
})

Deno.test('username != username in db.js ', (obj) => {
    let obj3 = {id: 1, user: "user2", pass: "p455w0rd"}
    // arrange - imported the function at the top
    // act - calling the function with sample object defined above
    const outcome = login(obj3)
    // assert - checking the return value against what it should be in this case it should return false
    assertEquals(outcome, false, 'username must be equal to value of db.js')
})

// function register

Deno.test('inserted data shows up in db.js', (obj) => {
    // arrange - imported the function at the top we ALSO need to clear the INSERT property of the db object
    clear_insert()
    let obj4 = {id: 2, user: "user2", pass: "p455w0rd"}
    // act - calling the function with sample object defined above
    const outcome = register(obj4)
    // assert - now we try to find the record in db.js and assert the two
    const records = db['INSERT'].accounts
    // each user has a unique id so we will choose to assert the id
    assertEquals(obj4.id, records.id, 'record is not displaying in db.js')
})

