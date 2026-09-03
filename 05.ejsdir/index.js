const express = require("express");
const app = express();
const cors = require("cors");
const port = 8081;
const path = require("path");
app.use(cors());

// responce body format defination
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/public/css")));

app.set("views", path.join(__dirname, "/views"));

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log("server is started at 8081.");
});

app.get("/", (req, res) => {
  res.render("home");
  console.log(req.url);
});

app.get("/diceroll", (req, res) => {
  let dicevalue = Math.floor(Math.random() * 6) + 1;
  res.render("diceroll", { dicevalue });
  console.log(req.url);
});

app.get("/ig/:username", (req, res) => {
  // let followers = ["Aryan Sahu", "Joy Sahu"];
  const data = require("./data.json");
  let { username } = req.params;
  if (data[username]) {
    res.render("instagram", { username, data: data[username] });
  } else {
    res.render("error", { username });
  }
  console.log(req.url);
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/register", (req, res) => {
  let { name, password } = req.query;
  res.send(
    `welcome ${name} this is get request responce. ${req.query.password}`,
  );
});

app.post("/register", (req, res) => {
  let { name, password } = req.body;

  res.send(`welcome ${name} this is post request responce.`);
});
