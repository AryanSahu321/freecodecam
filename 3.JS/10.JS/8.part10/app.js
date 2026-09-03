let name = document.querySelector("#name");

name.addEventListener("mouseout", function (e) {
  e.preventDefault();
  console.log(name.value);
});

let pass = document.querySelector("#pass");

pass.addEventListener("keypress", function (e) {
  e.preventDefault();
  console.log(pass.value);
});

let form = document.querySelector("form");
form.addEventListener("scroll", (e) => {
  e.preventDefault();
  console.log("scrolling");
});

window.addEventListener("load", (e) => {
  console.log("paage is loaded");
});

let btn = document.querySelector("button");

btn.addEventListener("click", function (e) {
  e.preventDefault();
  this.style.backgroundColor = "green";
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(this); // in arrow function this refer to window
  //this.style.backgroundColor = "green";
});

let username = document.querySelector("#username");
let h1 = document.querySelector(".heading");

username.addEventListener("input", function () {
  console.log(username.value);
  let filter = username.value.replace(/[^a-zA-Z\s]/g, "");
  this.value = filter;

  h1.innerText = filter;
});
