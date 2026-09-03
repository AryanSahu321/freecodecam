const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

/* app.use((req, res, next) => {
  // Ignore requests for /favicon.ico
  if (req.url === "/favicon.ico") {
    return res.status(204).end();
  }
  console.log("Middleware 1 executed");
  next();
});
app.use((req, res, next) => {
  console.log("Middleware 2 executed");

  next();
}); */

/* // Middleware to log request details
app.use((req, res, next) => {
  req.responseTime = new Date(Date.now()).toISOString();
  console.log(req.method, req.url, req.path, req.responseTime);
  next();
});
 */

// Middleware for api routes to check token ==="giveaccess"
//http://localhost:8080/api?token=giveaccess
/* app.use("/api", (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}); */

// check token function
function checkToken(req, res, next) {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

app.get("/api", checkToken, (req, res) => {
  res.send("API route accessed successfully");
});

//
app.get("/", (req, res) => {
  res.send("Page found");
});

// error handling middleware
app.get("/error", (req, res) => {
  throw new ExpressError("An error occurred", 505);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  next(err);
});
app.use((err, req, res, next) => {
  console.error(err.status);
  let{ status =  500, message = "Something went wrong" } = err;
  res.status(status).send(message);
  //next(); //callnext non error handling middleware
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
