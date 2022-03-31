/* main.js */

// deno-lint-ignore-file

import { file2DataURI } from "./util.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
});
try {
  let trade_slider = document.querySelector("input.trade_price");
  console.log(trade_slider, trade_value_slider);
  let trade_value_slide = document.querySelector(
    "body > main > form > p.trade_value",
  );
  trade_value_slide.innerHTML = trade_slider.value;

  trade_slider.oninput = function () {
    trade_value_slide.innerHTML = this.value;
  };
} catch (err) {
  console.log(err.message);
}

try {
  let retail_slider = document.querySelector("input.retail_price");
  let retail_value_slide = document.querySelector(
    "body > main > form > p.retail_value",
  );
  retail_value_slide.innerHTML = retail_slider.value;

  retail_slider.oninput = function () {
    retail_value_slide.innerHTML = this.value;
  };
} catch (err) {
  console.log(err.message);
}

try {
  let quantity_slider = document.querySelector("input.quantity");
  let quantity_value_slide = document.querySelector(
    "body > main > form > p.quantity",
  );
  quantity_value_slide.innerHTML = quantity_slider.value;

  quantity_slider.oninput = function () {
    quantity_value_slide.innerHTML = this.value;
  };
} catch (err) {
  console.log(err.message);
}

try {
  let cookie_policy = document.getElementById("cookie_policy_select");
  let cookie_holder = document.getElementsByClassName("policy_container")[0];
  let privacy = document.getElementsByClassName("privacy")[0]
  let cookie_exit = document.getElementsByClassName("cookie_exit")[0];
  let terms = document.getElementsByClassName("terms")[0]
  let terms_of_use = document.getElementsByClassName("terms_container")[0]
  let cookie_actual = document.getElementsByClassName("cookie_container")[0]
  let privacy_policy = document.getElementsByClassName("privacy_container")[0]
  console.log(cookie_policy, cookie_holder, cookie_exit, terms)
  
  if(cookie_policy != null) {
    cookie_policy.addEventListener("click", () => {
    console.log(cookie_holder.style);
    cookie_holder.style.display = "block";
    cookie_exit.style.display = "block";
    cookie_actual.style.display = "block"
  });
  }
  
  cookie_exit.addEventListener("click", () => {
    cookie_holder.style.display = "none";
    cookie_exit.style.display = "none";
    
  });

  if(terms != null) {
    terms.addEventListener('click', () => {
    cookie_holder.style.display = "block"
    cookie_exit.style.display = "block"
    terms_of_use.style.block = "block"
  })
  }
  
  if (privacy != null){
    privacy.addEventListener('click', () => {
    cookie_holder.style.display = "block"
    cookie_exit.style.display = "block"
    privacy_policy.style.display = "block"
  })
  }
  

} catch (err) {
  console.log(err.message);
}
