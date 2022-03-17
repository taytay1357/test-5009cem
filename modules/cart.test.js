import { addCart, getCart, deleteCart } from './cart.js'
import { assertEquals, fail, assertThrows } from 'https://deno.land/std@0.120.0/testing/asserts.ts'
import { db } from './db.js'

// function addCart
let step

Deno.test({
    name: 'there is a record for the authorised user in the database [1]', 
    fn: async () => {
            // ARRANGE
            const data = {authorised: "testdummy", isbn: "9780060276362"}
            // ACT
            const outcome = await addCart(data)
            const sql = `DELETE FROM cart WHERE FK_isbn="${data.isbn}" AND FK_user_id="${data.authorised}"`
            await db.query(sql)
            // ASSERT
            assertEquals(outcome, true, 'there is no record for that username')
            },
            ignore: false,
            sanitizeResources: false,
            sanitizeOps: false ,
            sanitizeExit: false,
    });

Deno.test({
    name: 'there is a record for the authorised user in the database [2]', 
    fn: async () => {
            // ARRANGE
            const data = {authorised: "testdummy2", isbn: "9788854172388"}
            // ACT
            const outcome = await addCart(data)
            const sql = `DELETE FROM cart WHERE FK_isbn="${data.isbn}" AND FK_user_id="${data.authorised}"`
            await db.query(sql)
            // ASSERT
            assertEquals(outcome, true, 'there is no record for that username')
            },
            ignore: false,
            sanitizeResources: false,
            sanitizeOps: false ,
            sanitizeExit: false,
    });

Deno.test({
    name: 'there is a record for the authorised user in the database [3]', 
    fn: async () => {
            // ARRANGE
            const data = {authorised: "testdummy3", isbn: "9783806741360"}
            // ACT
            const outcome = await addCart(data)
            const sql = `DELETE FROM cart WHERE FK_isbn="${data.isbn}" AND FK_user_id="${data.authorised}"`
            await db.query(sql)
            // ASSERT
            assertEquals(outcome, true, 'there is no record for that username')
            },
            ignore: false,
            sanitizeResources: false,
            sanitizeOps: false ,
            sanitizeExit: false,
    });


Deno.test({
    name: 'there is no record for the username in the database [1]',
    fn: async () => {
        // ARRANGE
        const data = {authorised: "dawnudnawuidnadn", isbn: "9780060276362"}
        // ACT
        const outcome = await addCart(data)
        // ASSERT
        assertEquals(outcome, false, 'there must be a record for the username')
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

Deno.test({
    name: 'there is no record for the username in the database [2]',
    fn: async () => {
        // ARRANGE
        const data = {authorised: "faewdawdawda", isbn: "9783806741360"}
        // ACT
        const outcome = await addCart(data)
        // ASSERT
        assertEquals(outcome, false, 'there must be a record for the username')
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

Deno.test({
    name: 'there is no record for the username in the database [3]',
    fn: async () => {
        // ARRANGE
        const data = {authorised: "ggfefesafafs", isbn: "9783806741360"}
        // ACT
        const outcome = await addCart(data)
        // ASSERT
        assertEquals(outcome, false, 'there must be a record for the username')
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})
// function getCart

Deno.test({
    name: 'data passed is undefined',
    fn: async () => {
        // ARRANGE
        const data = undefined
        // ACT
        const outcome = await getCart(data)
        // ASSERT
        assertEquals(outcome, false, 'argument passed is not undefined')
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

Deno.test({
    name: 'data passed is not undefined and there is a record for the username [1]',
    fn: async () => {
        // ARRANGE 
        const data = "testdummy"
        // ACT
        const outcome = await getCart(data)
        const outcomeType = typeof outcome
        console.log(outcomeType)
        // ASSERT
        assertEquals(outcomeType, 'object', 'getCart doesnt return the correct type')
    }, 
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

Deno.test({
    name: 'data passed is not undefined and there is a record for the username [2]',
    fn: async () => {
        // ARRANGE 
        const data = "testdummy2"
        // ACT
        const outcome = await getCart(data)
        const outcomeType = typeof outcome
        console.log(outcomeType)
        // ASSERT
        assertEquals(outcomeType, 'object', 'getCart doesnt return the correct type')
    }, 
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

Deno.test({
    name: 'data passed is not undefined and there is a record for the username [3]',
    fn: async () => {
        // ARRANGE 
        const data = "testdummy3"
        // ACT
        const outcome = await getCart(data)
        const outcomeType = typeof outcome
        console.log(outcomeType)
        // ASSERT
        assertEquals(outcomeType, 'object', 'getCart doesnt return the correct type')
    }, 
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

// function deleteCart

Deno.test({
        name: 'record is isbn number and not a * and wants to delete that specific isbn [1]',
        fn: async () => {
            // ARRANGE
            const data = {record: "9780099549482", authorised: "testdummy"}
            let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
            const records = await db.query(sql)
            const username = records[0].id
            sql = `INSERT INTO cart (FK_user_id, FK_isbn) VALUES ("${username}","${data.record}")`
            await db.query(sql)
            // ACT
            const outcome = await deleteCart(data)
            // ASSERT
            assertEquals(outcome, true, 'record is not an isbn number')
            },
            sanitizeResources: false,
            sanitizeOps: false,
            sanitizeExit: false
    });


Deno.test({
        name: 'record is isbn number and not a * and wants to delete that specific isbn [2]',
        fn: async () => {
            // ARRANGE
            const data = {record: "9780747532743", authorised: "testdummy2"}
            let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
            const records = await db.query(sql)
            const username = records[0].id
            sql = `INSERT INTO cart (FK_user_id, FK_isbn) VALUES ("${username}","${data.record}")`
            await db.query(sql)
            // ACT
            const outcome = await deleteCart(data)
            // ASSERT
            assertEquals(outcome, true, 'record is not an isbn number')
            },
            sanitizeResources: false,
            sanitizeOps: false,
            sanitizeExit: false
    });

Deno.test({
        name: 'record is isbn number and not a * and wants to delete that specific isbn [3]',
        fn: async () => {
            // ARRANGE
            const data = {record: "9780747532743", authorised: "testdummy3"}
            let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
            const records = await db.query(sql)
            const username = records[0].id
            sql = `INSERT INTO cart (FK_user_id, FK_isbn) VALUES ("${username}","${data.record}")`
            await db.query(sql)
            // ACT
            const outcome = await deleteCart(data)
            // ASSERT
            assertEquals(outcome, true, 'record is not an isbn number')
            },
            sanitizeResources: false,
            sanitizeOps: false,
            sanitizeExit: false
    });

Deno.test({
    name: 'record is a * and not an isbn number and wants to delete all cart [1]',
    fn: async () => {
        // ARRANGE
        const data = {isbn: "9780099549482", record: "*" , authorised: "testdummy"}
        let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
        const records = await db.query(sql)
        const username = records[0].id
        sql = `INSERT INTO cart (FK_user_id, FK_isbn) VALUES ("${username}","${data.isbn}")`
        await db.query(sql)
        // ACT
        const outcome = await deleteCart(data)
        // ASSERT
        assertEquals(outcome, false, 'record is an isbn number')
        
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

Deno.test({
    name: 'record is a * and not an isbn number and wants to delete all cart [2]',
    fn: async () => {
        // ARRANGE
        const data = {isbn: "9780099549482", record: "*" , authorised: "testdummy2"}
        let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
        const records = await db.query(sql)
        const username = records[0].id
        sql = `INSERT INTO cart (FK_user_id, FK_isbn) VALUES ("${username}","${data.isbn}")`
        await db.query(sql)
        // ACT
        const outcome = await deleteCart(data)
        // ASSERT
        assertEquals(outcome, false, 'record is an isbn number')
        
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

Deno.test({
    name: 'record is a * and not an isbn number and wants to delete all cart [3]',
    fn: async () => {
        // ARRANGE
        const data = {isbn: "9780099549482", record: "*" , authorised: "testdummy3"}
        let sql = `SELECT id FROM accounts WHERE user="${data.authorised}"`
        const records = await db.query(sql)
        const username = records[0].id
        sql = `INSERT INTO cart (FK_user_id, FK_isbn) VALUES ("${username}","${data.isbn}")`
        await db.query(sql)
        // ACT
        const outcome = await deleteCart(data)
        // ASSERT
        assertEquals(outcome, false, 'record is an isbn number')
        
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})
