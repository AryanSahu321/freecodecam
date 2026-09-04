const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(cookieParser("secret"));

app.get("/cookie", (req, res) => {
  res.cookie("name", "Aryan");
  res.send("Hello World");
});

app.get("/signedCookie", (req, res) => {
  res.cookie("contry", "India", { signed: true });
  res.send("Hello World");
});

// varify cookie
app.get("/verifyCookie", (req, res) => {
  res.send([req.cookies, req.signedCookies]);
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

//if signed cookie is changed then it become unsigned
//if code remai then come false
