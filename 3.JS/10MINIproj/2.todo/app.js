let inp = document.querySelector("input");
let ul = document.querySelector("ul");
let btn = document.querySelector("button");

btn.addEventListener("click", function (e) {
  let item = document.createElement("li");
  item.innerText = inp.value;

  let delbtn = document.createElement("button");
  delbtn.innerText = "delete";
  delbtn.classList.add("delete");

  item.appendChild(delbtn);
  ul.appendChild(item);
  console.log(inp.value);
  inp.value = "";
});

/* let delbtns = document.querySelectorAll(".delete");

for (delbtn2 of delbtns) {
  delbtn2.addEventListener("click", function () {
    let par = this.parentElement;
    par.remove();
    console.log(par);
  });
}
 */

ul.addEventListener("click", function (e) {
  console.log(e.target.nodeName);
  if (e.target.nodeName == "BUTTON") {
    let listitem = e.target.parentElement;
    console.log(listitem);
    console.log("button clicked");
    listitem.remove();
  }
});
