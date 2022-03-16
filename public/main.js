/* main.js */

// deno-lint-ignore-file

import { file2DataURI } from "./util.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
});

let trade_slider = document.querySelector("input.trade_price");
let trade_value_slide = document.querySelector(
  "body > main > form > p.trade_value",
);
trade_value_slide.innerHTML = trade_slider.value;

trade_slider.oninput = function () {
  trade_value_slide.innerHTML = this.value;
};

let retail_slider = document.querySelector("input.retail_price");
let retail_value_slide = document.querySelector(
  "body > main > form > p.retail_value",
);
retail_value_slide.innerHTML = retail_slider.value;

retail_slider.oninput = function () {
  retail_value_slide.innerHTML = this.value;
};

let quantity_slider = document.querySelector("input.quantity");
let quantity_value_slide = document.querySelector(
  "body > main > form > p.quantity",
);
quantity_value_slide.innerHTML = quantity_slider.value;

quantity_slider.oninput = function () {
  quantity_value_slide.innerHTML = this.value;
};
