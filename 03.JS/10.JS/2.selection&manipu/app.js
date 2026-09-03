let div = document.querySelector("div");
let newp = document.createElement("p");
newp.innerHTML = "I am red";
newp.append(" well para");
newp.style.color = "red";
div.append(newp);
let h3 = document.createElement("h3");
h3.style.color = "blue";
h3.append("I'm a blue h3");
div.append(h3);

let div2 = document.createElement("div");
/* div2.classList.add("border"); */
div2.style.backgroundColor = "pink";
div2.style.border = "2px solid black";
let h1 = document.createElement("h1");
h1.append("I'm in a div");
let p2 = document.createElement("p2");
p2.append("ME TOO!");
div2.append(h1);
div2.append(p2);

div.prepend(div2);
/* ---------------------------------------assi---- */
let div3 = document.querySelector(".assi");
let inp = document.createElement("input");
inp.setAttribute("type", "text");
inp.setAttribute("placeholder", "username");

let btn = document.createElement("button");
btn.append("click me");
btn.setAttribute("id", "btn");

div3.append(inp);
div3.append(btn);

let btn1 = document.querySelector("#btn");

btn.style.backgroundColor = "blue";
btn.style.color = "white";

let head2 = document.createElement("h1");
head2.append("DOM preactice");
head2.classList.add("h1");
div3.append(head2);

let para2 = document.createElement("p");
para2.append("Apna College Delta Practice");
para2.style.fontWeight = "bold";
div3.append(para2);
