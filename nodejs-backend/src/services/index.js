const tasks = require("./tasks/tasks.service.js");
const projects = require("./projects/projects.service.js");
const taskcomments = require("./taskcomments/taskcomments.service.js");
const taskattachments = require("./taskattachments/taskattachments.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(tasks);
  app.configure(projects);
  app.configure(taskcomments);
  app.configure(taskattachments);
    // ~cb-add-configure-service-name~
};
