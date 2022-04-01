import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
const url = "https://camera-initial-8080.codio-box.uk/";

// Scenario: Checking the "admin account" is created
//     Given: I am on the "login" page
//     When: I enter the admin login details
//         And: I click the login button
//     Then: I should see the "Stock Levels" tab on the "Homepage"

Deno.test("checking if the admin account is created", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    const button = await pageNew.$$eval("a", (nodes) => {
        for (const node of nodes) if(node.innerText.includes('Stock Levels')) return true
        return false
    })
    await assertEquals(button, true, "admin account not created")
    })
})


// Scenario: Checking the "Stock Levels" tab
//     Given: I am logged into the "admin" account
//         And: I am on the "Home" page
//     When: I click the "Stock Levels" tab
//     Then: I should see the "Stock Levels" top-level heading
//         And: I should see an "Add Stock" button

Deno.test("can navigate to the Stock Levels screen from the homepage", async (test) => {
    // LAUNCH BROWSER AND LOGIN INTO ADMIN ACCOUNT
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // NAVIGATE TO STOCK LEVELS screen
    await pageNew.click('a[href="/stock"]')
    const heading = await pageNew.$eval("h1", (node) => {
        node.innerText
    })
    await assertEquals(heading, "Stock Levels", "system didn't navigate to stock levels screen")
})


// Scenario: Checking the "Add Stock" button
//     Given: I am logged into the "admin" account
//         And: I am on the "Stock Levels" page
//     When: I click the "Add Stock" button
//     Then: I should see the "Add Stock" top-level heading
//         And: I should see a form with multiple input fields

Deno.test("checking you can navigate to the add stock page from stock levels page", async (test) => {
    // LAUNCH BROWSER AND LOGIN INTO ADMIN ACCOUNT
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // NAVIGATE TO STOCK LEVELS SCREEN
    await pageNew.click('a[href="/stock"]')
    // NAVIGATE TO ADD STOCK SCREEN
    await pageNew.click('a[href="/add_stock"]')
    const heading = await pageNew.$eval("h1", (node) => {
        node.innerText
    })
    await assertEquals(heading, "Add Stock", "system did not navigate to add stock page")
})

// Scenario: Checking the correct input for "Add Stock" form fields
//     Given: I am logged into the "admin" account
//         And: I am on the "Add Stock" page
//     When: I enter <data> into <fieldname>
//     Then: I should see the "Stock Levels" top-level heading

//     Examples:
//     | fieldname | data |
//     ---------------------
//     | book_name | "Harry Potter and the Philosophers Stone"|
//     | author    | "J.K.Rowling" |
//     | date      | "19-04-2012"  |
//     | isbn_13   | 98097897823   |
//     | description| "Fantasy Novel" |
//     | thumbnail | "./uploads/harry.jpg" |
//     | retail_price | 12 |
//     | trade_price  | 12 |
//     | quantity     | 3  |

Deno.test("user enters all correct data into the form field", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // NAVIGATE TO STOCK LEVELS SCREEN
    await pageNew.click('a[href="/stock"]')
    // NAVIGATE TO ADD STOCK SCREEN
    await pageNew.click('a[href="/add_stock"]')
    // ENTERING THE FORM DATA
    await pageNew.type('input[name="title"]', "Harry Potter and the Philosophers Stone", { delay: 100 });
    await pageNew.type('input[name="author"]', "J.K.Rowling", { delay: 100 });
    await pageNew.type('input[name="publication_date"]', "06-03-2022", { delay: 100 });
    await pageNew.type('input[name="isbn"]', "375489738957385", { delay: 100 });
    await pageNew.type('input[name="description"]', "Fantasy Novel", { delay: 100 });
    const fileChooser = await Promise.all([
        pageNew.waitForFileChooser(),
        pageNew.click('input[name="thumbnail"]')
    ])
    await fileChooser[0].accept(['C:/Users/Josh_2/Desktop/hazza.jpg'])
    await pageNew.click('input[name="trade_price"]')
    await pageNew.click('input[name="retail_price"]')
    await pageNew.click('input[name="quantity"]')
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    const heading = await pageNew.$eval("h1", (node) =>{
        node.innerText
    })
    await assertEquals(heading, "Stock Levels", "form data not entered correctly or in bad form")
})