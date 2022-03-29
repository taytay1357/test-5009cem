// Scenario: Checking that the "Stock Levels" screen shows correct data
//     Given: I am logged into the "admin" account
//     When: I navigate to the "Stock Levels" screen
//     Then: I should see the "Stock Levels" top-level heading
//         And: I should see <data_name> for each book.

//     Examples:
//         | data_name |
//         -------------
//         | thumbnail |
//         | book_name |
//         | isbn_13   |
//         | quantity  |

Deno.test("checking that stock levels screen displays correct data", async (
  test,
) => {
  const browser = await puppeteer.launch({ headless: false });
  const pageNew = await browser.newPage();
  await pageNew.goto(url, { waitUntil: "networkidle0" });
  await pageNew.click('a[href="/login"]');
  await pageNew.type('input[name="username"]', "admin", { delay: 100 });
  await pageNew.type('input[name="password"]', "p455w0rd", { delay: 100 });
  await pageNew.keyboard.press("Tab");
  await pageNew.keyboard.press("Enter");
  // NAVIGATE TO STOCK LEVELS SCREEN
  await pageNew.click('a[href="/stock"]');
  const data = await pageNew.$$eval("p", (nodes) => {
    for (const node of nodes) {
      if (
        node.innerText.includes("NAME") || node.innerText.includes("ISBN") ||
        node.innerText.includes("QUANTITY")
      ) {
        return true;
      }
    }
    return false;
  });
  const actual = await pageNew.$eval("img", (node) => {
    const path = node.getAttribute("src");
    const real = path.exists();
  });

  await assertEquals(data, true, "wrong data displayed");
  await assertEquals(real, true, "book thumbnail not displayed");
});
