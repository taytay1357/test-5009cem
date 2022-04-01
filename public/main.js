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
  let cookie_holder =
    document.getElementsByClassName("cookie_policy_container")[0];
  let privacy_holder =
    document.getElementsByClassName("privacy_policy_container")[0];
  let terms_holder = document.getElementsByClassName("terms_container")[0];
  let privacy = document.getElementsByClassName("privacy")[0];
  let cookie_exit = document.getElementsByClassName("cookie_exit")[0];
  let privacy_exit = document.getElementsByClassName("privacy_exit")[0];
  let terms_exit = document.getElementsByClassName("terms_exit")[0];
  let terms = document.getElementsByClassName("terms")[0];
  let privacy_text = document.getElementsByClassName("privacy_policy_text");
  let cookie_text = document.getElementsByClassName("cookie_policy_text");
  let terms_text = document.getElementsByClassName("terms_policy_text");
  console.log(cookie_text);
  if (cookie_policy != null) {
    cookie_policy.addEventListener("click", () => {
      console.log(cookie_holder.style);
      cookie_holder.style.display = "block";
      cookie_exit.style.display = "block";
      for (let i = 0; i < cookie_text.length; i++) {
        cookie_text[i].style.display = "block";
      }
    });
  }
  if (cookie_exit != null) {
    cookie_exit.addEventListener("click", () => {
      cookie_holder.style.display = "none";
      cookie_exit.style.display = "none";
      for (let i = 0; i < cookie_text.length; i++) {
        cookie_text[i].style.display = "none";
      }
    });
  }

  if (privacy_exit != null) {
    privacy_exit.addEventListener("click", () => {
      privacy_holder.style.display = "none";
      privacy_exit.style.display = "none";
      for (let i = 0; i < privacy_text.length; i++) {
        privacy_text[i].style.display = "none";
      }
    });
  }

  if (terms_exit != null) {
    terms_exit.addEventListener("click", () => {
      terms_holder.style.display = "none";
      terms_exit.style.display = "none";
      terms_text.style.display = "none";
    });
  }
  if (terms != null) {
    terms.addEventListener("click", () => {
      terms_holder.style.display = "block";
      terms_exit.style.display = "block";
      terms_holder.style.block = "block";
      terms_text.style.display = "block";
    });
  }

  if (privacy != null) {
    privacy.addEventListener("click", () => {
      privacy_holder.style.display = "block";
      privacy_exit.style.display = "block";
      privacy_holder.style.display = "block";
      for (let i = 0; i < privacy_text.length; i++) {
        privacy_text[i].style.display = "block";
      }
    });
  }
} catch (err) {
  console.log(err.message);
}
