import { addStock, getStock } from './stock.js'
import { assertEquals, fail, assertThrows } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { db } from './db.js'


// function addStock

Deno.test({
    name: 'there is no current record that matches the isbn given',
    fn: async () => {
        // ARRANGE
        const data = 
        {
            fields: {
                title: "Lolita",
                author: "Vladimir Nabokov",
                publication_date: "1955-09-01",
                isbn: "976242406354",
                description: "History",
                trade_price: "20",
                retail_price: "20",
                quantity: 5
            },
            files: [
                {
                    content: undefined,
                    contentType: "image/jpeg",
                    name: "thumbnail",
                    filename: "/uploads/lolita.jpg"
                }
            ]
        }
        let sql = `SELECT * FROM stock WHERE isbn="${data.fields.isbn}"`
        const records = await db.query(sql)
        if (records.length > 0) {
            sql = `DELETE FROM stock WHERE isbn="${data.fields.isbn}"`
            await db.query(sql)
        }
        // ACT
        const outcome = await addStock(data)
        const outcomes = outcome.split(" ")
        const assertionData = outcomes[0]
        if (assertionData == "INSERT") {
            sql = `DELETE FROM stock WHERE isbn="${data.fields.isbn}"`
            await db.query(sql)
        }
        // ASSERT
        assertEquals(assertionData, "INSERT", 'there is a record of this isbn')
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})



Deno.test({
    name: 'there is a record of the isbn and it matches the record of the database',
    fn: async () => {
        // ARRANGE 
        const data = 
        {
            fields: {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                publication_date: "1925-04-10",
                isbn: "9780020198819",
                description: "Fantasy",
                trade_price: "25",
                retail_price: "25",
                quantity: "8"
            },
            files: [
                {
                content: undefined,
                contentType: "image/jpeg",
                name: "thumbnail",
                filename: "/uploads/gatsby.jpg",
                originalName: "gatsby.jpg"
                }
            ]
        }
        // ACT 
        const outcome = await addStock(data)
        const outcomes = outcome.split(" ")
        const assertionData = outcomes[0]
        console.log(assertionData)
        // ARRANGE 
        assertEquals(assertionData, "UPDATE", 'isbn must not have a record in the database')
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})

// function getStock()

Deno.test({
    name: 'checking that the function returns the right type of data',
    fn: async () => {
        // ARRANGE - function doesn't take any arguments so just need to import the function
        // ACT
        const outcome = await getStock()
        const outcomeType = typeof (outcome)
        console.log(outcomeType)
        // ASSERT
        assertEquals(outcomeType, 'object', 'outcome type incorrect')
    },
    sanitizeResources: false,
    sanitizeOps: false,
    sanitizeExit: false
})