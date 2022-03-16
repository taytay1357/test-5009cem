import { login, register } from './accounts.js'
import { assertEquals, fail, assertThrows } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { db } from './db.js'

// function login

Deno.test({
    name: 'username exists but password does not match one of the database',
    fn: async () => {
        // ARRANGE - define an object to pass and import the module
        let data = {id: 7, username: "testdummy", password: "dawdawdad" }
        // ACT - call the module with the object
        try {
            let outcome = await login(data)
            fail('function does not throw an exception')
            console.log(outcome)
        } catch(err) {
            console.log(err.message)
            assertEquals(err.message, "invalid password for account testdummy")  // ASSERT
        }
    
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
}) 


Deno.test({
    name:'username doesnt exist in the database', 
    fn: async () => {
        // ARRANGE - define an object that uses a username not registered
        const obj = {id: 13, username: "diuwan", password: "idamwidma" }
        // ACT - call the function with the object
        try {
            const outcome = await login(obj)
            fail('function does not throw an exception')
        } catch(err) {
            assertEquals(err.message, `username "diuwan" not found`)  //ASSERT
        }
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

Deno.test({
    name: 'username exists in database and password matches',
    fn: async () => {
        // ARRANGE 
        const obj2 = {id: 1, username: "testdummy", password: "p455w0rd"}
        // ACT
        const outcome = await login(obj2)
        // ASSERT
        assertEquals(outcome, obj2.username, 'either username or password doesnt check out')
    }, 
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

// function register

Deno.test({
    name: 'data has no record in database and can be inserted',
    fn: async () => {
        // ARRANGE - define an object to pass into the function
        const data = {id: 1, username: "user7", password: "p455w0rd"}
        const username = data.username
        let sql = `SELECT * FROM accounts WHERE user="${username}"`
        const records = await db.query(sql)
        if (records.length > 0) {
            sql = `DELETE FROM accounts WHERE user="${username}"`
            await db.query(sql)
        }
        // ACT
        const outcome = await register(data)
        // ASSERT
        assertEquals(outcome, true, 'something wrong with data entered')
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

Deno.test({
    name: 'data has a record in database and cannot be inserted',
    fn: async () => {
        // ARRANGE - define an object to pass into the function and delete the records from the database
        const data2 = {id: 55, username: "testuser", password: "p455w0rd"}
        // ACT
        const outcome = await register(data2)
        console.log(outcome)
        // ASSERT
        assertEquals(outcome, false, 'data doesnt have a record in database')
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})
