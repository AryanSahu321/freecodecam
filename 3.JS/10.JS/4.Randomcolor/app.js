/* let colors=document.querySelectorAll('span'); */
/* function generate(){
    for(color of colors){
        let num=Math.floor(Math.random()*256);
        color.innerHTML()=num;
    }
} */

let btn = document.querySelector("button");

btn.addEventListener("click", () => {
  let h1 = document.querySelector("h1");
  let ransomcolor = randomColorGenerator();
  h1.innerText = ransomcolor;
  let box = document.querySelector(".box");
  box.style.backgroundColor = ransomcolor;
});

function randomColorGenerator() {
  let c1 = Math.floor(Math.random() * 256);
  let c2 = Math.floor(Math.random() * 256);
  let c3 = Math.floor(Math.random() * 256);

  let color = `rgb(${c1},${c2},${c2})`;
  return color;
}
