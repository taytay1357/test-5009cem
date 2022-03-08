import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts'
import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts'
const url = 'https://camera-initial-8080.codio-box.uk/'


// Scenario: Checking that you can navigate to login page from homepage
//     Given: I am on the "homepage"
//     When: I click the "Login"
//     Then: I should see the Log In top level heading

Deno.test('access login page from homepage   ', async test => {
    const browser = await puppeteer.launch({ headless:false })
    const pageNew = await browser.newPage(); // Launch browser
    console.log('Step1 - Open Browser'); //Display message
    await pageNew .goto(url, { waitUntil : 'networkidle0'}); //Open LambdaGeeks
    await pageNew.click('a[href="/login"]')
    const heading = await pageNew.$eval('h1', node => { node.innerText })
    await assertEquals(heading, 'Log In', 'heading with login not found')
    await browser.close()
})

// Scenario: Checking that the user can login
//     Given: I am on the "Login" page
//     When: I enter <username> into <fieldname> 
//         And: I enter <password> into <fieldname>
//     Then: I should see the Homepage
//     But: Not see the login page

Deno.test('user enters a correct username/password', async test => {
    // SETTING UP BROWSER 
    const browser = await puppeteer.launch({ headless: false })
    const pageNew = await browser.newPage()
    await pageNew.goto(url, {waitUntil : 'networkidle0'})
    // ENTERING DATA INTO FIELDS
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', 'doej', { delay : 100 })
    await pageNew.type('input[name="password"]', 'p455w0rd', { delay : 100 })
    await pageNew.keyboard.press('Tab')
    await pageNew.keyboard.press('Enter')
    const heading = await pageNew.$eval('h1', node => { node.innerText })
    await assertEquals(heading, 'Foo Bar', 'top level heading not Foo bar so incorrect credentials')
    await browser.close()
})

// Scenario: user logs in with incorrect username/password
//     Given: I am on the "Login" page
//     When: I enter <username> into <fieldname>
//         And: I enter <password> into <fieldname>
//     Then: I should see the Log In top level heading

Deno.test('user enters an incorrect username/password', async test => {
    const browser = await puppeteer.launch({ headless: false })
    const pageNew = await browser.newPage()
    await pageNew.goto(url, {waitUntil : 'networkidle0'})
    await pageNew.click('a[href="/login"]')
    await pageNew.type('input[name="username"]', 'uiwndouianwd', { delay : 100 })
    await pageNew.type('input[name="password"]', 'juiawnduinaowid', { delay : 100 })
    await pageNew.keyboard.press('Tab')
    await pageNew.keyboard.press('Enter')
    const heading = await pageNew.$eval('h1', node => { node.innerText })
    await assertEquals(heading, 'Log In', 'top level heading not Log In so correct credentials')
    await browser.close()
})