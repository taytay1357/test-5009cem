import { get_stock, add_stock } from './modules/stock.js'
import { assertEquals, fail, assertThrows } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
import { db } from './modules/db.js'

const records_select = db['SELECT']
const records_insert = db['INSERT']
const records_update = db['UPDATE']

// function get_stock

Deno.test('selected data matches the test data', () =>{
    // ARRANGE
    let obj = {book_title: "Harry Potter", author: "J.K.Rowling", publication_date: "19/06/1972", isbn: 83974893749, description: "Fantasy Novel", filepath: "./uploads/harry.jpg", trade_price: 21, retail_price: 21, quantity: 10}
    // ACT
    let outcome = get_stock(obj, records_select.stock)
    // ASSERT
    assertEquals(outcome, true, 'values do not match')
})  

Deno.test('selected data does not match the test data', () =>{
    // ARRANGE
    let obj = {book_title: "Pride and Prejudice", author: "Jane Austen", publication_date: "19/06/1972", isbn: 83873893749, description: "History", filepath: "./uploads/pride.jpg", trade_price: 11, retail_price: 11, quantity: 10}
    // ACT
    let outcome = get_stock(obj, records_select.stock)
    // ASSERT
    assertEquals(outcome, false, 'values match')
}) 

Deno.test('throws an exception if argument type string', () => {
    try {
        get_stock("nijwad", "dwadawd")
        fail('the function does not throw an exception')
    } catch(err){
        assertEquals(err.message, 'nijwad or dwadawd are not objects')
    }
})

Deno.test('throws an exception if argument type number', () => {
    try {
        get_stock(1, 2)
        fail('the function does not throw an exception')
    } catch(err){
        assertEquals(err.message, '1 or 2 are not objects')
    }
})

Deno.test('throws an exception if function is passed 3 arguments', () => {
    let obj7 = {book_title: "Pride and Prejudice", author: "Jane Austen", publication_date: "19/06/1972", isbn: 83873893749, description: "History", filepath: "./uploads/pride.jpg", trade_price: 11, retail_price: 11, quantity: 10}
    let obj8 = {book_title: "Harry Potter", author: "J.K.Rowling", publication_date: "19/06/1972", isbn: 83974893749, description: "Fantasy Novel", filepath: "./uploads/harry.jpg", trade_price: 21, retail_price: 21, quantity: 10}
    try {
        get_stock(obj8, records_select.accounts, obj7)
        fail('the function does not throw an error')
    } catch(err){
        assertEquals(err.message, `function doesn't receive correct number of arguments`)
    }
})

Deno.test('throws an exception if function is passed 1 argument', () => {
    let obj7 = {book_title: "Harry Potter", author: "J.K.Rowling", publication_date: "19/06/1972", isbn: 83974893749, description: "Fantasy Novel", filepath: "./uploads/harry.jpg", trade_price: 21, retail_price: 21, quantity: 10}
    try {
        get_stock(obj7)
        fail('the function does not throw an error')
    } catch(err){
        assertEquals(err.message, `function doesn't receive correct number of arguments`)
    }
})


// function add_stock

Deno.test('test data is equal to the select data and test data equal to update data', () => {
    // ARRANGE
    let obj_test1 =  {
    book_title: "Harry Potter", 
    author: "J.K.Rowling", 
    publication_date: "19/06/1972", 
    isbn: 83974893749, 
    description: "Fantasy Novel", 
    filepath: "./uploads/harry.jpg", 
    trade_price: 21, 
    retail_price: 21, 
    quantity: 10
    }
    let obj_test2 = {
    book_title: "Pride and Prejudice", 
    author: "Jane Austen", 
    publication_date: "19/06/1972", 
    isbn: 5355252525, 
    description: "History", 
    filepath: "./uploads/pride.jpg", 
    trade_price: 11, 
    retail_price: 11, 
    quantity: 10
    } 
    // ACT
    let outcome = add_stock(obj_test1, obj_test2, records_insert.stock, records_update.stock, records_select.stock)

    // ASSERT
    assertEquals(outcome, true, 'values do not match' )
})

Deno.test('test data equal to the insert data', () => {
    // ARRANGE
    let obj_test1 =  {
    book_title: "Pride and Prejudice", 
    author: "Jane Austen", 
    publication_date: "19/06/1972", 
    isbn: 83873893749, 
    description: "History", 
    filepath: "./uploads/pride.jpg", 
    trade_price: 11, 
    retail_price: 11, 
    quantity: 10
    }
    let obj_test2 = {
    book_title: "Pride and Prejudice", 
    author: "Jane Austen", 
    publication_date: "19/06/1972", 
    isbn: 5355252525, 
    description: "History", 
    filepath: "./uploads/pride.jpg", 
    trade_price: 11, 
    retail_price: 11, 
    quantity: 10
    } 
    // ACT
    let outcome = add_stock(obj_test1, obj_test2, records_insert.stock, records_update.stock, records_select.stock)

    // ASSERT
    assertEquals(outcome, true, 'values do not match' )
})

Deno.test('test data not equal to any of the db data', () =>{
    // ARRANGE

    let obj_test1 = {
    isbn: 584397589375893,
    book_title: "Nineteen Eighty-Four",
    author: "George Orwell",
    publication_date: "1949-06-08T00:00:00.000Z",
    filepath: "/uploads/1984.jpg",
    description: "History",
    trade_price: 26,
    retail_price: 26,
    quantity: 11
  }
  let obj_test2 = {
    book_title: "Pride and Prejudice", 
    author: "Jane Austen", 
    publication_date: "19/06/1972", 
    isbn: 534534535353453535354, 
    description: "History", 
    filepath: "./uploads/pride.jpg", 
    trade_price: 11, 
    retail_price: 11, 
    quantity: 10
    } 

    // ACT
    let outcome = add_stock(obj_test1, obj_test2, records_insert.stock, records_update.stock, records_select.stock)

    // ASSERT
    assertEquals(outcome, false, 'data matches some sort of data')
})

Deno.test('throws an exception if argument type string', () => {
    try {
        add_stock("nijwad", "dwadawd", "oiamdia", "admiawmd", "duiawndiaw")
        fail('the function does not throw an exception')
    } catch(err){
        assertEquals(err.message, 'nijwad, dwadawd, oiamdia, admiawmd, duiawndiaw are not objects')
    }
})

Deno.test('throws an exception if argument type number', () => {
    try {
        add_stock(1, 2, 3, 4,5)
        fail('the function does not throw an exception')
    } catch(err){
        assertEquals(err.message, '1, 2, 3, 4, 5 are not objects')
    }
})

Deno.test('throws an exception if function is passed 5 arguments', () => {
    let obj7 = {book_title: "Pride and Prejudice", author: "Jane Austen", publication_date: "19/06/1972", isbn: 83873893749, description: "History", filepath: "./uploads/pride.jpg", trade_price: 11, retail_price: 11, quantity: 10}
    let obj8 = {book_title: "Harry Potter", author: "J.K.Rowling", publication_date: "19/06/1972", isbn: 83974893749, description: "Fantasy Novel", filepath: "./uploads/harry.jpg", trade_price: 21, retail_price: 21, quantity: 10}
    let obj9 = {book_title: "Harry Potter", author: "J.K.Rowling", publication_date: "19/06/1972", isbn: 83974893749, description: "Fantasy Novel", filepath: "./uploads/harry.jpg", trade_price: 21, retail_price: 21, quantity: 10}
    try {
        add_stock(obj8, records_select.accounts, obj7, records_update.stock, records_insert.stock, obj9)
        fail('the function does not throw an error')
    } catch(err){
        assertEquals(err.message, `function doesn't receive correct number of arguments`)
    }
})

Deno.test('throws an exception if function is passed 1 argument', () => {
    let obj7 = {book_title: "Harry Potter", author: "J.K.Rowling", publication_date: "19/06/1972", isbn: 83974893749, description: "Fantasy Novel", filepath: "./uploads/harry.jpg", trade_price: 21, retail_price: 21, quantity: 10}
    try {
        add_stock(obj7)
        fail('the function does not throw an error')
    } catch(err){
        assertEquals(err.message, `function doesn't receive correct number of arguments`)
    }
})
