let btns = document.querySelectorAll("button");
console.dir(btns);

/* btn.onclick = function () {
  console.log("button is clicked");
  alert("button is clicked");
}; */

for (btn of btns) {
  /* btn.onclick = sayhello;
  btn.onclick = sayname; */

  /* btn.addEventListener("click", sayhello);
  btn.addEventListener("click", sayname); */
  btn.addEventListener("dblclick", function () {
    console.log("double click");
  });

  btn.onmouseenter = function () {
    console.log("hover");
  };
}
function sayhello() {
  alert("hello");
}
function sayname() {
  alert("Aryan");
}
