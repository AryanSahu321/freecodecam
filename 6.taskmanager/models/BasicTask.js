class BasicTAsk {
  constructor(title, description, dueDate) {
    this.id = Date.now();
    this.isCompleted = false;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
}

module.exports = BasicTAsk;

//Note: Do not use new here, because you want
// to export the blueprint so your service can create multiple tasks later.

// date.now() is used to generate a unique id for each task.
//id = 1785588002511 milliseconds since 1970-01-01T00:00:00.000Z
//new Date(task.id) returns the date object for the given timestamp.
// Sat Aug 01 2026 18:10:02 (plus your local time zone).
