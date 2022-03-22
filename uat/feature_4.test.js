import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
const url = "https://camera-initial-8080.codio-box.uk/";

// Scenario: Checking that the user can navigate to the homepage from the cart page
//     Given: I am logged into a "user" account
//         And: I am on the "cart" page
//     When: I click on the "home" page link
//     Then: I should see the "Home" top-level heading

Deno.test("checking that user can navigate to home page from their cart", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // GO TO CART
    await pageNew.click('a[href="/cart"]')
    // GO TO HOME SCREEN
    await pageNew.click('a[href="/"]')
    const heading = await pageNew.$eval("h1", node => {
        node.innerText
    })
    await assertEquals(heading, "Home", 'heading with home not found')
})

// Scenario: Checking that the cart page displays the correct data
//     Given: I am logged into a "user" account
//         And: I am on the cart page
//     When: I view the page
//     Then: I should see <data_name> for all books added.
//         And: I should see the "total cost" inside the cart

//     Examples:
//         | data_name |
//         --------------
//         | book_name |
//         | thumbnail |
//         | unit_price|
//         | quantity  |

Deno.test("checking cart page displays correct data", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // GO TO CART
    await pageNew.click('a[href="/cart"]')
    const data = await pageNew.$$eval('p', nodes => {
        for(const node of nodes) if(node.innerText.includes('e') || node.innerText.includes('a')) return  true
        return false
    })
    await assertEquals(data, true, 'wrong data on the cart page')
})

// Scenario: Checking that each book added has a delete button alongside items
//     Given: I am logged into a "user" account
//         And: I am on the cart screen
//     When: I view the page
//     Then: I should see a "delete" button next to each record added to the cart

Deno.test("checking for the existence of a delete button", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // GO TO CART
    await pageNew.click('a[href="/cart"]')
    const button = await pageNew.$$eval('input', nodes => {
        for(const node of nodes) if(node.value === "DELETE") return true
        return false
    })
    await assertEquals(button, true, 'delete button does not exist')
})

// Scenario: Checking that the delete button works
//     Given: I am logged into a "user" account
//         And: I am on the cart page
//     When: I click the "delete" button
//     Then: The record should no longer shows

Deno.test("checking the delete button works", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // GO TO CART
    await pageNew.click('a[href="/cart"]')
    await pageNew.click('input[value="DELETE"]')
    const value = await pageNew.$$eval("p", nodes  => {
        for(const node of nodes) if(node.innerText.includes('£0.00')) return true
        return false
    })
    await assertEquals(value, true, 'delete button does not work')
})

// Scenario: Checking that the cancel cart button exists
//     Given: I am logged into a "user" account
//         And: I am on the cart page
//     When: I view the page
//     Then: I should see the "Cancel Cart" button

Deno.test("checking if cancel cart button exists", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // GO TO CART
    await pageNew.click('a[href="/cart"]')
    const button = await pageNew.$$eval('input', nodes => {
        for(const node of nodes) if(node.value === "CANCEL CART") return true
        return false
    })
    await assertEquals(button, true, 'cancel cart button does not exist')
})

// Scenario: Checking that the cancel cart button works
//     Given: I am logged into a "user" account
//         And: I am on the cart page
//     When: I click on the "Cancel Cart" button
//     Then: I should see the "Home" top-level heading
//         And: The records in the cart should dissapear

Deno.test("checking if cancel cart button works", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', "admin", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // GO TO CART
    await pageNew.click('a[href="/cart"]')
    await pageNew.click('input[value="CANCEL CART"]')
    const heading = await pageNew.$eval("h1", node => {
        node.innerText
    })
    await assertEquals(heading, "Home", 'top level heading is not home')
})


