const BasicTask = require("../models/BasicTask");
const OverdueTask = require("../models/OverdueTask"); // to find BAsicTask and OverdueTask class
// go out of services folder using ../ and then go to models folder.

class TaskService {
  constructor() {
    this.tasks = []; // work as a database for now, but later we will use a real database
  }
  createNewTask(title, description, dueDate, assignedManager, escalationLevel) {
    const taskDate = new Date(dueDate); // string date to date object
    if (taskDate < new Date()) {
      const newTask = new OverdueTask(
        title,
        description,
        dueDate,
        assignedManager,
        escalationLevel,
      );
      this.tasks.push(newTask);
      return newTask;
    } else {
      const newTask = new BasicTask(title, description, dueDate);
      this.tasks.push(newTask);
      return newTask;
    }
  }

  getAllTask() {
    return this.tasks;
  }
}

module.exports = new TaskService();
