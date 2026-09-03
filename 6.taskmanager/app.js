const cors = require("cors"); // use it before app istallation
const TaskController = require("./controllers/TaskController");

const express = require("express");
const path = require("path"); // use it before app istallation

const app = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public"))); // set the public folder path for static files

app.set("views", path.join(__dirname, "/views")); // set the views folder path for ejs files

app.set("view engine", "ejs"); // set the view engine to ejs
//Cannot find module 'ejs' => npm install ejs

app.get("/api/task", (req, res) => {
  let tasks = TaskController.getAllTask(req, res);
  res.status(200).json(tasks);
});

app.post("/api/task", (req, res) => {
  TaskController.createNewTask(req, res);
});

app.get("/", (req, res) => {
  let tasks = TaskController.getAllTask(req, res);
  res.render("home", { tasks: tasks });
});

module.exports = app;
