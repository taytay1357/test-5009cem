import puppeteer from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
const url = "https://camera-initial-8080.codio-box.uk/";

// Scenario: Checking the Home Screen displays the correct data
//     Given: I am logged into a "user" account
//         And: I am on the "Home" page
//     When: I view the page
//     Then: I should see <data_name> for each book

//     Examples:
//         | data_name |
//         -------------
//         | thumbnail |
//         | book_name |

Deno.test("checking the home screen displays correct data", async (test) => {
  const browser = await puppeteer.launch({ headless: false });
  const pageNew = await browser.newPage();
  await pageNew.goto(url, { waitUntil: "networkidle0" });
  await pageNew.click('a[href="/login"]');
  await pageNew.type('input[name="username"]', "user1", { delay: 100 });
  await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
  await pageNew.keyboard.press("Tab");
  await pageNew.keyboard.press("Enter");
  const data = await pageNew.$$eval("p", (nodes) => {
    for (const node of nodes) {
      if (
        node.innerText.includes("a") || node.innerText.includes("A") ||
        node.innerText.includes("e") || node.innerText.includes("E")
      ) {
        return true;
      }
    }
    return false;
  });
  const image = await pageNew.click('img[alt="Book Cover"]');
  const path = image.getAttribute("src");
  const real = path.exists();
  await assertEquals(data, true, "wrong data displayed");
  await assertEquals(real, true, "book thumbnail not displayed");
});

// Scenario: Checking that each book has an add to cart button
//     Given: I am logged into a "user" account
//         And: I am on the "Home" page
//     When: I view each book
//     Then: I should see an "add to cart" button

Deno.test("checking that all books have an add cart button", async (test) => {
  const browser = await puppeteer.launch({ headless: false });
  const pageNew = await browser.newPage();
  await pageNew.goto(url, { waitUntil: "networkidle0" });
  await pageNew.click('a[href="/login"]');
  await pageNew.type('input[name="username"]', "user1", { delay: 100 });
  await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
  await pageNew.keyboard.press("Tab");
  await pageNew.keyboard.press("Enter");
  const button = await pageNew.$$eval("input", (nodes) => {
    for (const node of nodes) {
      if (node.innerText.includes("Add to cart")) return true;
    }
    return false;
  });
  await assertEquals(button, true, "add cart does not exist for all records");
});

// Scenario: Checking that the number of items in the users cart is displayed
//     Given: I am logged into the "user" account
//         And: I am on the "Home" page
//     When: I view the page
//     Then: I should see "number of items" in the users cart

Deno.test("checking that the number of items in the cart is displayed", async (
  test,
) => {
  const browser = await puppeteer.launch({ headless: false });
  const pageNew = await browser.newPage();
  await pageNew.goto(url, { waitUntil: "networkidle0" });
  await pageNew.click('a[href="/login"]');
  await pageNew.type('input[name="username"]', "user1", { delay: 100 });
  await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
  await pageNew.keyboard.press("Tab");
  await pageNew.keyboard.press("Enter");
  const value = await pageNew.$$eval("p", (nodes) => {
    for (const node of nodes) {
      if (typeof node.innerText === "number") return true;
    }
    break;
    return false;
  });
  await assertEquals(value, true, "number of items is not displayed");
});

// Scenario: Checking that the total cost of the users cart is displayed on the homepage
//     Given: I am logged into the "user" account
//         And: I am on the "home" page
//     When: I view the page
//     Then: I should see the "total cost" displayed next to the cart icon

Deno.test("checking that the total cost of cart is displayed", async (test) => {
  const browser = await puppeteer.launch({ headless: false });
  const pageNew = await browser.newPage();
  await pageNew.goto(url, { waitUntil: "networkidle0" });
  await pageNew.click('a[href="/login"]');
  await pageNew.type('input[name="username"]', "user1", { delay: 100 });
  await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
  await pageNew.keyboard.press("Tab");
  await pageNew.keyboard.press("Enter");
  const value = await pageNew.$$eval("p", (nodes) => {
    for (const node of nodes) if (node.innerText.includes("£")) return true;
    break;
    return false;
  });
  await assertEquals(value, true, "value is not displayed");
});

// Scenario: Checking that there is a cart icon on the homepage
//     Given: I am logged into a "user" account
//         And: I am on the "Home" page
//     When: I view the page
//     Then: I should see a cart icon

Deno.test("checking that there is a cart icon on the users page", async (
  test,
) => {
  const browser = await puppeteer.launch({ headless: false });
  const pageNew = await browser.newPage();
  await pageNew.goto(url, { waitUntil: "networkidle0" });
  await pageNew.click('a[href="/login"]');
  await pageNew.type('input[name="username"]', "user1", { delay: 100 });
  await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
  await pageNew.keyboard.press("Tab");
  await pageNew.keyboard.press("Enter");
  const actual = await pageNew.$eval("img", (node) => {
    const path = node.getAttribute("src");
    const real = path.exists();
  });
  await assertEquals(real, true, "cart thumbnail not displayed");
});

// Scenario: Checking that the add to cart button works
//     Given: I have pressed the "add cart" button
//         And: I am logged into a "user" account
//     When: I navigate to the "Your Cart" screen
//     Then: I should see <data_name> for each book added.

//     Examples:
//         | data_name |
//         -------------
//         | book_name |
//         | thumbnail |
//         | unit_price|
//         | quantity  |

Deno.test("checking that the add cart button works", async (test) => {
  const browser = await puppeteer.launch({ headless: false });
  const pageNew = await browser.newPage();
  await pageNew.goto(url, { waitUntil: "networkidle0" });
  await pageNew.click('a[href="/login"]');
  await pageNew.type('input[name="username"]', "user1", { delay: 100 });
  await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
  await pageNew.keyboard.press("Tab");
  await pageNew.keyboard.press("Enter");
  await pageNew.click('input[value="Add to cart"]');
  const heading = await pageNew.$eval("h1", (node) => {
    node.innerText;
  });
  const data = await pageNew.$eval("p", (nodes) => {
    for (const node of nodes) {
      if (node.innerText.includes("a") || node.innerText.includes("e")) {
        return true;
      }
    }
    break;
    return false;
  });
  await assertEquals(
    heading,
    "Your Cart",
    "does not redirect you to correct page",
  ); // THIS ASSERTS WHETHER IT SENDS YOU TO CORRECT PAGE
  await assertEquals(data, true, "add cart button does not work"); //THIS ASSERTS WHETHER IS ALSO POSTS DATA TO THAT PAGE
});

// Scenario: Checking that the user can navigate to their cart
//     Given: I am logged into a "user" account
//         And: I am on the homepage
//     When: I click on the "Cart Icon"
//     Then: I should see the "Your Cart" top-level heading

Deno.test("checking that user can navigate to their cart", async (test) => {
  const browser = await puppeteer.launch({ headless: false });
  const pageNew = await browser.newPage();
  await pageNew.goto(url, { waitUntil: "networkidle0" });
  await pageNew.click('a[href="/login"]');
  await pageNew.type('input[name="username"]', "user1", { delay: 100 });
  await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
  await pageNew.keyboard.press("Tab");
  await pageNew.keyboard.press("Enter");
  await pageNew.click('a[href="/cart"]');
  const heading = await pageNew.$eval("h1", (node) => {
    node.innerText;
  });
  await assertEquals(
    heading,
    "Your Cart",
    "system does not send you to correct page",
  );
});
