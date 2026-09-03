let url = "https://catfact.ninja/fact";

fetch(url)
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((data) => {
    console.log(data);
    console.log(data.fact);
  })
  .catch((err) => {
    console.log("ERROR-", err);
  });

console.log("async using");

async function getFact() {
  let res = await fetch(url);
  let data = await res.json();
  console.log(data.fact);
}

getFact();

setTimeout(function () {
  console.log("using axios to get direct data no need to parse");
}, 1000);

async function getFact2() {
  let res = await axios.get(url);
  console.log(res.data.fact);
}

getFact2();

let btn = document.querySelector("button");
let url2 = "https://dog.ceo/api/breeds/image/random";

let p = document.querySelector("p");

btn.addEventListener("click", async function () {
  let res = await axios.get(url);

  btn.nextElementSibling.innerText = res.data.fact;
  getImage();
});

async function getImage() {
  let photo = await axios.get(url2);
  console.log(photo);
  console.log(photo.data.message);
  let oldimg = document.querySelector("img");
  if (oldimg != null) {
    oldimg.remove();
  }
  let img = document.createElement("img");
  img.setAttribute("src", photo.data.message);
  img.setAttribute("width", "400px");
  p.insertAdjacentElement("afterend", img);
}

/* -------------------Headers passing in Axios--------------------------------- */
let url3 = " https://icanhazdadjoke.com/";

async function passingHeaders() {
  let config = { headers: { Accept: "application/json" } };
  let res = await axios.get(url3, config);
  console.log(res.data.joke);
}

/* -----------------updating Quary String --------------------- */
let url4 = "http://universities.hipolabs.com/search?name=";

let btn2 = document.querySelector(".collageBtn");

async function getcollages(country) {
  let res = await axios.get(url4 + country); // this nahi lagana
  console.log(res.data);
  return res.data;
}

btn2.addEventListener("click", async function () {
  let country = document.querySelector("input");
  let state = document.querySelector("#state");
  console.log(country.value);
  let colarr = await getcollages(country.value);
  if (state.value.trim() === "") {
    show(colarr);
  } else {
    showState(colarr, state.value);
  }
});

function show(colarr) {
  let ul = document.querySelector("#list");
  ul.innerHTML = "";
  for (col of colarr) {
    console.log(col.name);
    let li = document.createElement("li");
    li.innerText = col.name;
    ul.appendChild(li);
  }
}

function showState(colarr, state) {
  let ul = document.querySelector("#list");
  ul.innerHTML = "";

  for (col of colarr) {
    if (col["state-province"] === state) {
      // === for strict equality
      console.log(col.name);
      let li = document.createElement("li");
      li.innerText = col.name;
      ul.appendChild(li);
    }
  }
}
