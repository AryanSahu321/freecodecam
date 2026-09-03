let btn = document.querySelector("button");

// pointerEvent
/* btn.addEventListener("click", function (event) {
  console.log(event);
  console.log("button pressed");
}); */
//mouseEvent
btn.addEventListener("dblclick", function (event) {
  console.log(event);
  console.log("button pressed");
});

//keyboardevent-keydown
let inp = document.querySelector("input");
inp.addEventListener("keydown", function (event) {
  console.log(event);
  console.log("key=" + event.key);
  console.log("code=" + event.code);
  console.log("keyCode=" + event.keyCode);
});

//keyup
let inp1 = document.querySelector("input");
inp1.addEventListener("keyup", function (event) {
  console.log(event);
});
