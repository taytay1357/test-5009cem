/* routes.js */

import { Router } from "https://deno.land/x/oak@v6.5.1/mod.ts";
import { Handlebars } from "https://deno.land/x/handlebars/mod.ts";
// import { upload } from 'https://cdn.deno.land/oak_upload_middleware/versions/v2/raw/mod.ts'
// import { parse } from 'https://deno.land/std/flags/mod.ts'

import { login, register } from "./modules/accounts.js";
import { addStock, getStock } from "./modules/stock.js";
import { addCart, deleteCart, getCart } from "./modules/cart.js";

const handle = new Handlebars({ defaultLayout: "" });

const router = new Router();

// the routes defined here
router.get("/", async (context) => {
  const authorised = context.cookies.get("authorised");
  const admin = context.cookies.get("admin");
  const cookie_status = context.cookies.get("cookie_status");
  console.log(cookie_status);
  if (cookie_status === undefined) {
    context.response.redirect("/cookie");
  }
  let cookie_accept;
  let cookie_decline;
  if (cookie_status === "Accept") {
    cookie_accept = cookie_status;
    cookie_decline = undefined;
  } else {
    cookie_accept = undefined;
    cookie_decline = cookie_status;
  }
  let records = [];
  let cart_data = [];
  if (authorised === undefined) {
    records = [];
    cart_data = [];
  } else if (admin === undefined) {
    records = await getStock();
    cart_data = await getCart(authorised);
  }
  let counter = 0;
  let price = 0;
  let FK_isbn = 0;
  let record_isbn = 0;
  for (let i = 0; i < cart_data.length; i++) {
    FK_isbn = cart_data[i].FK_isbn;
    for (let j = 0; j < records.length; j++) {
      record_isbn = records[j].isbn;
      if (FK_isbn === record_isbn) {
        price = price + records[j].retail_price;
      } else {
        continue;
      }
      counter += 1;
    }
  }
  const data = {
    authorised,
    admin,
    counter,
    price,
    cookie_accept,
    cookie_decline,
    sub_data: records,
  };
  const body = await handle.renderView("home", data);
  context.response.body = body;
});

router.post("/", async (context) => {
  const body = context.request.body({ type: "form" });
  const authorised = context.cookies.get("authorised");
  const value = await body.value;
  const obj = Object.fromEntries(value);
  obj.authorised = authorised;
  console.log(obj);
  // now we need to update the cart with the new item
  await addCart(obj);
  context.response.redirect("/cart");
});

router.get("/terms", async (context) => {
  const body = await handle.renderView("terms");
  context.response.body = body;
})

router.get("/privacy", async (context) => {
  const body = await handle.renderView("privacy");
  context.response.body = body;
})

router.get("/cookie", async (context) => {
  const body = await handle.renderView("cookie");
  context.response.body = body;
});

router.post("/cookie", async (context) => {
  const data_body = context.request.body({ type: "form" });
  const value = await data_body.value;
  const obj = Object.fromEntries(value);
  console.log(obj);
  const cookie_status = obj.cookie_status;
  context.cookies.set("cookie_status", cookie_status);
  context.response.redirect("/");
});

router.get("/cart", async (context) => {
  const authorised = context.cookies.get("authorised");
  const cart_data = await getCart(authorised);
  const records = await getStock();
  console.log(cart_data);
  console.log(records);
  let sub_data;
  const selected_records = [];
  let current;
  for (let i = 0; i < cart_data.length; i++) {
    if (selected_records.length == 0) {
      selected_records.push({ isbn: cart_data[0].FK_isbn, quantity: 1 });
    } else {
      for (let j = 0; j < selected_records.length; j++) {
        if (cart_data[i].FK_isbn == selected_records[j].isbn) {
          selected_records[j].quantity += 1;
          break;
        } else {
          if (j == selected_records.length - 1) {
            selected_records.push({ isbn: cart_data[i].FK_isbn, quantity: 1 });
            break;
          } else {
            continue;
          }
        }
      }
    }
  }
  for (let m = 0; m < selected_records.length; m++) {
    for (let n = 0; n < records.length; n++) {
      if (selected_records[m].isbn === records[n].isbn) {
        selected_records[m].book_title = records[n].book_title;
        selected_records[m].filepath = records[n].filepath;
        selected_records[m].retail_price = records[n].retail_price;
      } else {
        continue;
      }
    }
  }
  // WORK OUT THE PRICE
  let price = 0;
  let temp;
  for (let x = 0; x < selected_records.length; x++) {
    temp = selected_records[x].retail_price * selected_records[x].quantity;
    price = price + temp;
  }
  const data = { authorised, price, record_data: selected_records };
  const body = await handle.renderView("cart", data);
  context.response.body = body;
});

router.post("/cart", async (context) => {
  const authorised = context.cookies.get("authorised");
  const body = context.request.body({ type: "form" });
  const value = await body.value;
  const obj = Object.fromEntries(value);
  console.log(obj);
  obj.authorised = authorised;
  await deleteCart(obj);
  if (obj.record === "*") {
    context.response.redirect("/random");
  } else {
    context.response.redirect("cart");
  }
});

router.get("/random", async (context) => {
  const body = await handle.renderView("cart");
  context.response.body = body;
  context.response.redirect("/");
});

router.get("/login", async (context) => {
  const body = await handle.renderView("login");
  context.response.body = body;
});

router.get("/register", async (context) => {
  const body = await handle.renderView("register");
  context.response.body = body;
});

router.post("/register", async (context) => {
  console.log("POST /register");
  const body = context.request.body({ type: "form" });
  const value = await body.value;
  const obj = Object.fromEntries(value);
  console.log(obj);
  await register(obj);
  context.response.redirect("/login");
});

router.get("/logout", (context) => {
  // context.cookies.set('authorised', null) // this does the same
  const admin = context.cookies.get("admin");
  context.cookies.delete("authorised");
  if (admin) {
    context.cookies.delete("admin");
  }
  context.response.redirect("/");
});

router.get("/stock", async (context) => {
  const authorised = context.cookies.get("authorised");
  const admin = context.cookies.get("admin");
  const records = await getStock();
  const data = { authorised, admin, sub_data: records };
  console.log(data);
  const body = await handle.renderView("stock", data);
  context.response.body = body;
});

router.get("/add_stock", async (context) => {
  const authorised = context.cookies.get("authorised");
  const admin = context.cookies.get("admin");
  const data = { authorised, admin };
  const body = await handle.renderView("add_stock", data);
  context.response.body = body;
});

router.post("/add_stock", async (context) => {
  const body = context.request.body({ type: "form-data" });
  const value = await body.value.read();
  const file = value.files[0];
  let { originalName, filename } = file;
  await Deno.rename(filename, `${Deno.cwd()}/public/uploads/${originalName}`);
  file.filename = `/uploads/${originalName}`;
  console.log(value);
  await addStock(value);
  context.response.redirect("/stock");
});

router.post("/login", async (context) => {
  console.log("POST /login");
  const body = context.request.body({ type: "form" });
  const value = await body.value;
  const obj = Object.fromEntries(value);
  console.log(obj);
  try {
    const username = await login(obj);
    if (username === "admin") {
      context.cookies.set("admin", username);
    } else {
      context.cookies.set("authorised", username);
    }
    context.response.redirect("/");
  } catch (err) {
    console.log(err);
    context.response.redirect("/login");
  }
});

router.get("/foo", async (context) => {
  const authorised = context.cookies.get("authorised");
  if (authorised === undefined) context.response.redirect("/");
  const data = { authorised };
  const body = await handle.renderView("foo", data);
  context.response.body = body;
});

export default router;
