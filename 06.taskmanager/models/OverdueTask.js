const BasicTask = require("./BasicTask");

class OverdueTask extends BasicTask {
  constructor(title, description, dueDate, assignedManager, escalationLevel) {
    super(title, description, dueDate);
    this.assignedManager = assignedManager;
    this.escalationLevel = escalationLevel;
  }
}

module.exports = OverdueTask;
