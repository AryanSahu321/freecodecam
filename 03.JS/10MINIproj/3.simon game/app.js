let gameSeq = [];
let userSeq = [];

let h2 = document.querySelector("h2");
let level = 0;
let highestScore = [];

let start = false;
let btns = ["red", "green", "blue", "orange"];

document.addEventListener("keypress", function () {
  if (start == false) {
    console.log("game start");
    start = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let btnindex = Math.floor(Math.random() * 3);
  let randColor = btns[btnindex];
  let randbtn = document.querySelector(`.${randColor}`);
  flash(randbtn);

  gameSeq.push(randColor);
  console.log(gameSeq);
}
function flash(btn) {
  console.log("flash  ", btn.innerText);
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function checkAns(idx) {
  console.log("curr level ", level);
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerText = `Game Over! Your score is ${level} Press any key to start`;
    highestScore.push(level);
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
    let ul = document.createElement("ul");

    for (score of highestScore.toSorted((a, b) => b - a)) {
      console.log(score);
      let li = document.createElement("li");
      li.innerText = score;
      ul.appendChild(li);
    }
    let div = document.querySelector(".score");
    console.log(ul);
    div.innerHTML = "";
    div.appendChild(ul);
  }
}

function btnPress(e) {
  console.log("button was pressed");
  console.log(e.target.innerText);
  /* console.log(this.innerText); */
  flash(e.target);

  let userColor = e.target.getAttribute("id");
  console.log(userColor);
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".box-inner");

for (btn of allbtns) {
  btn.addEventListener("click", function (e) {
    if (start == true) {
      btnPress(e);
    }
  });
}

function reset() {
  userSeq = [];
  gameSeq = [];
  level = 0;
  start = false;
}
