const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("tasks service", async () => {
  let thisService;
  let taskCreated;
  let usersServiceResults;
  let users;

  const projectsCreated = await app.service("projects").Model.create({"title":"new value","description":"new value","projectId":"parentObjectId","name":"new value","status":"new value","startDate":"2026-11-16T19:14:04.176Z","dueDate":"2026-11-16T19:14:04.176Z","managerId":"parentObjectId","memberIds":"parentObjectId","progress":23});

  beforeEach(async () => {
    thisService = await app.service("tasks");

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
    assert.ok(thisService, "Registered the service (tasks)");
  });

  describe("#create", () => {
    const options = {"title":"new value","description":"new value","projectId":`${projectsCreated._id}`,"name":"new value","status":"new value","startDate":"2026-11-16T19:14:04.177Z","dueDate":"2026-11-16T19:14:04.177Z","managerId":"parentObjectId","memberIds":"parentObjectId","progress":23,"assigneeId":"parentObjectId","priority":"new value","tags":"new value","estimatedHours":23,"completedAt":"2026-11-16T19:14:04.177Z"};

    beforeEach(async () => {
      taskCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new task", () => {
      assert.strictEqual(taskCreated.title, options.title);
assert.strictEqual(taskCreated.description, options.description);
assert.strictEqual(taskCreated.projectId.toString(), options.projectId.toString());
assert.strictEqual(taskCreated.assigneeId.toString(), options.assigneeId.toString());
assert.strictEqual(taskCreated.priority, options.priority);
assert.strictEqual(taskCreated.status, options.status);
assert.strictEqual(taskCreated.dueDate.toISOString(), options.dueDate);
assert.strictEqual(taskCreated.startDate.toISOString(), options.startDate);
assert.strictEqual(taskCreated.tags, options.tags);
assert.strictEqual(taskCreated.estimatedHours, options.estimatedHours);
assert.strictEqual(taskCreated.completedAt.toISOString(), options.completedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a task by ID", async () => {
      const retrieved = await thisService.Model.findById(taskCreated._id);
      assert.strictEqual(retrieved._id.toString(), taskCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"title":"updated value","description":"updated value","projectId":`${projectsCreated._id}`,"assigneeId":`${usersCreated._id}`,"priority":"updated value","status":"updated value","dueDate":"2026-11-16T19:14:04.177Z","startDate":"2026-11-16T19:14:04.177Z","tags":"updated value","estimatedHours":100,"completedAt":"2026-11-16T19:14:04.177Z"};

    it("should update an existing task ", async () => {
      const taskUpdated = await thisService.Model.findByIdAndUpdate(
        taskCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(taskUpdated.title, options.title);
assert.strictEqual(taskUpdated.description, options.description);
assert.strictEqual(taskUpdated.projectId.toString(), options.projectId.toString());
assert.strictEqual(taskUpdated.assigneeId.toString(), options.assigneeId.toString());
assert.strictEqual(taskUpdated.priority, options.priority);
assert.strictEqual(taskUpdated.status, options.status);
assert.strictEqual(taskUpdated.dueDate.toISOString(), options.dueDate);
assert.strictEqual(taskUpdated.startDate.toISOString(), options.startDate);
assert.strictEqual(taskUpdated.tags, options.tags);
assert.strictEqual(taskUpdated.estimatedHours, options.estimatedHours);
assert.strictEqual(taskUpdated.completedAt.toISOString(), options.completedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a task", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);;

      const taskDeleted = await thisService.Model.findByIdAndDelete(taskCreated._id);
      assert.strictEqual(taskDeleted._id.toString(), taskCreated._id.toString());
    });
  });
});