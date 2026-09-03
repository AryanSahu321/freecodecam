const express = require("express");
const app = express();
const cors = require("cors");
const port = 8081;

app.use(cors());

app.listen(port, () => {
  console.log("server is started at 8081.");
});

app.get("/", (req, res) => {
  res.send("this is root");
});

/* app.get("/home", (req, res) => {
  res.send("this is home");
});

app.get("/profile", (req, res) => {
  res.send("this is profile");
});

app.post("/", (req, res) => {
  res.send("this is root from post");
});
 */

app.get("/:username/:color", (req, res) => {
  console.log(req.params);
  const { username, color } = req.params;
  res.send(`hello, ${username} ure favoraite color is ${color} `);
});

app.get("/search", (req, res) => {
  let { q } = req.query;
  if (!q) {
    res.send("nothing searched");
  } else {
    res.send(req.query);
  }
});

app.use((req, res) => {
  //res.send("server is started.");
  /* res.send({
    name: "aryan",
    marks: 90,
  }); */

  res.send("<h1>this is running well for all</h1><ul><li>mango</li></ul>");
  //console.log("Request received for path: " + req.url);
});
