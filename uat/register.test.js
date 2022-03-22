import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
const url = "https://camera-initial-8080.codio-box.uk/";

// Scenario: Checking that you can navigate to register page from login page
//     Given: I am on the "login" page
//     When: I click the "Register" link
//     Then: I should see the Register top level heading

Deno.test("access register page from the login page", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0"})
    await pageNew.click('a[href="/login"]')
    await pageNew.click('a[href="/register"]')
    const heading = await pageNew.$eval("h1", (node) => {
        node.innerText
    })
    await assertEquals(heading, "Create an Account", 'heading with create an account not found')
    await browser.close()
});

// Scenario: user enters correct username/password
//     Given: I am on the "register" page
//     When: I enter <username> into <fieldname>
//         And: I enter <password> into <fieldname>
//     Then: I should see the Log In as top level heading
//     But: Not see the "Register" top level heading

Deno.test("user enters correct username/password", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0" });
    // ENTERING DATA INTO FIELDS
    await pageNew.click('a[href="/login"]');
    await pageNew.click('a[href="/register"]');
    await pageNew.type('input[name="username"]', "doej", { delay: 100 });
    await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
    await pageNew.type('input[name="password2"]', "p455w0rd", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");
    // ASSERTING 
    const heading = await pageNew.$eval("h1", (node) => {
        node.innerText
    })
    await assertEquals(heading, "Log In", 'something wrong with username or password')
});

// Scenario: user enters incorrect username/password
//     Given: I am on the "register" page
//     When: I enter <username> into <fieldname>
//         And: I enter <password> into <fieldname>
//     Then: I should see the Register top level heading

Deno.test("user enters an incorrect username/password", async (test) => {
    const browser = await puppeteer.launch({ headless: false });
    const pageNew = await browser.newPage();
    await pageNew.goto(url, { waitUntil: "networkidle0" });
    await pageNew.click('a[href="/login"]');
    await pageNew.click('a[href="/register"]');
    // ENTERING DATA
    await pageNew.type('input[name="username"]', "nd80n2dn98-mdi9ndn298dn$%%iodmwa0i9dma,p.////", { delay: 100 });
    await pageNew.type('input[name="password"]', "4y87uy3y03894y3y598374598347rhuesjhodiX<<DAWDAWMOIDWAD>>?{?@?@", { delay: 100 });
    await pageNew.type('input[name="password2"]', "nd80n2dn98-mdi9ndn298dn$%%iodmwa0i9dma,p.////", { delay: 100 });
    await pageNew.keyboard.press("Tab");
    await pageNew.keyboard.press("Enter");

    const heading = await pageNew.$eval("h1", (node) => {
        node.innerText
    })
    await assertEquals(heading, "Log In", "username and password must be correct")
});
