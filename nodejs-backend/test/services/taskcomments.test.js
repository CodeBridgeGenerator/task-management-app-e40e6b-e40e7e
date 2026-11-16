const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("taskcomments service", async () => {
  let thisService;
  let taskcommentCreated;
  let usersServiceResults;
  let users;

  const projectsCreated = await app.service("projects").Model.create({"taskId":"parentObjectId","title":"new value","description":"new value","projectId":"parentObjectId","name":"new value","status":"new value","startDate":"2026-11-16T19:14:04.203Z","dueDate":"2026-11-16T19:14:04.203Z","managerId":"parentObjectId","memberIds":"parentObjectId","progress":23});
const tasksCreated = await app.service("tasks").Model.create({"taskId":"parentObjectId","title":"new value","description":"new value","projectId":`${projectsCreated._id}`,"name":"new value","status":"new value","startDate":"2026-11-16T19:14:04.203Z","dueDate":"2026-11-16T19:14:04.203Z","managerId":"parentObjectId","memberIds":"parentObjectId","progress":23,"assigneeId":"parentObjectId","priority":"new value","tags":"new value","estimatedHours":23,"completedAt":"2026-11-16T19:14:04.203Z"});

  beforeEach(async () => {
    thisService = await app.service("taskcomments");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (taskcomments)");
  });

  describe("#create", () => {
    const options = {"taskId":`${tasksCreated._id}`,"title":"new value","description":"new value","projectId":`${projectsCreated._id}`,"name":"new value","status":"new value","startDate":"2026-11-16T19:14:04.203Z","dueDate":"2026-11-16T19:14:04.203Z","managerId":"parentObjectId","memberIds":"parentObjectId","progress":23,"assigneeId":"parentObjectId","priority":"new value","tags":"new value","estimatedHours":23,"completedAt":"2026-11-16T19:14:04.203Z","userId":"parentObjectId","comment":"new value"};

    beforeEach(async () => {
      taskcommentCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new taskcomment", () => {
      assert.strictEqual(taskcommentCreated.taskId.toString(), options.taskId.toString());
assert.strictEqual(taskcommentCreated.userId.toString(), options.userId.toString());
assert.strictEqual(taskcommentCreated.comment, options.comment);
    });
  });

  describe("#get", () => {
    it("should retrieve a taskcomment by ID", async () => {
      const retrieved = await thisService.Model.findById(taskcommentCreated._id);
      assert.strictEqual(retrieved._id.toString(), taskcommentCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"taskId":`${tasksCreated._id}`,"userId":`${usersCreated._id}`,"comment":"updated value"};

    it("should update an existing taskcomment ", async () => {
      const taskcommentUpdated = await thisService.Model.findByIdAndUpdate(
        taskcommentCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(taskcommentUpdated.taskId.toString(), options.taskId.toString());
assert.strictEqual(taskcommentUpdated.userId.toString(), options.userId.toString());
assert.strictEqual(taskcommentUpdated.comment, options.comment);
    });
  });

  describe("#delete", async () => {
    it("should delete a taskcomment", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);
await app.service("tasks").Model.findByIdAndDelete(tasksCreated._id);;

      const taskcommentDeleted = await thisService.Model.findByIdAndDelete(taskcommentCreated._id);
      assert.strictEqual(taskcommentDeleted._id.toString(), taskcommentCreated._id.toString());
    });
  });
});