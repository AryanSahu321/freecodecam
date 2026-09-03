const TaskService = require("../services/taskService");

class TaskController {
  getAllTask(req, res) {
    let tasks = TaskService.getAllTask();
    return tasks;

    /* if(req.path == "/api/task"){
        res.status(200).json(tasks);
    }else{
      res.render("home", { tasks });
    } */
  }

  createNewTask(req, res) {
    const { title, description, dueDate, assignedManager, escalationLevel } =
      req.body;

    let task = TaskService.createNewTask(
      title,
      description,
      dueDate,
      assignedManager,
      escalationLevel,
    );
    res.redirect("/");
  }
}

module.exports = new TaskController();
