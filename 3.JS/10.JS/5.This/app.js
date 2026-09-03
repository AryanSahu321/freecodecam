let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let p = document.querySelector("p");
let btn = document.querySelector("button");

function color() {
  console.log(this.innerText);
  this.style.backgroundColor = "yellow";
}

h1.addEventListener("click", color);
h3.addEventListener("click", color);
p.addEventListener("click", color);
btn.addEventListener("click", color);
