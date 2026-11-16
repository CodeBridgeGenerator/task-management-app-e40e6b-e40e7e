const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("taskattachments service", async () => {
  let thisService;
  let taskattachmentCreated;
  let usersServiceResults;
  let users;

  const projectsCreated = await app.service("projects").Model.create({"taskId":"parentObjectId","title":"new value","description":"new value","projectId":"parentObjectId","name":"new value","status":"new value","startDate":"2026-11-16T19:14:04.224Z","dueDate":"2026-11-16T19:14:04.224Z","managerId":"parentObjectId","memberIds":"parentObjectId","progress":23});
const tasksCreated = await app.service("tasks").Model.create({"taskId":"parentObjectId","title":"new value","description":"new value","projectId":`${projectsCreated._id}`,"name":"new value","status":"new value","startDate":"2026-11-16T19:14:04.224Z","dueDate":"2026-11-16T19:14:04.224Z","managerId":"parentObjectId","memberIds":"parentObjectId","progress":23,"assigneeId":"parentObjectId","priority":"new value","tags":"new value","estimatedHours":23,"completedAt":"2026-11-16T19:14:04.224Z"});

  beforeEach(async () => {
    thisService = await app.service("taskattachments");

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
    assert.ok(thisService, "Registered the service (taskattachments)");
  });

  describe("#create", () => {
    const options = {"taskId":`${tasksCreated._id}`,"title":"new value","description":"new value","projectId":`${projectsCreated._id}`,"name":"new value","status":"new value","startDate":"2026-11-16T19:14:04.224Z","dueDate":"2026-11-16T19:14:04.224Z","managerId":"parentObjectId","memberIds":"parentObjectId","progress":23,"assigneeId":"parentObjectId","priority":"new value","tags":"new value","estimatedHours":23,"completedAt":"2026-11-16T19:14:04.224Z","fileName":"new value","fileUrl":"new value","uploadedBy":"parentObjectId"};

    beforeEach(async () => {
      taskattachmentCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new taskattachment", () => {
      assert.strictEqual(taskattachmentCreated.taskId.toString(), options.taskId.toString());
assert.strictEqual(taskattachmentCreated.fileName, options.fileName);
assert.strictEqual(taskattachmentCreated.fileUrl, options.fileUrl);
assert.strictEqual(taskattachmentCreated.uploadedBy.toString(), options.uploadedBy.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a taskattachment by ID", async () => {
      const retrieved = await thisService.Model.findById(taskattachmentCreated._id);
      assert.strictEqual(retrieved._id.toString(), taskattachmentCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"taskId":`${tasksCreated._id}`,"fileName":"updated value","fileUrl":"updated value","uploadedBy":`${usersCreated._id}`};

    it("should update an existing taskattachment ", async () => {
      const taskattachmentUpdated = await thisService.Model.findByIdAndUpdate(
        taskattachmentCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(taskattachmentUpdated.taskId.toString(), options.taskId.toString());
assert.strictEqual(taskattachmentUpdated.fileName, options.fileName);
assert.strictEqual(taskattachmentUpdated.fileUrl, options.fileUrl);
assert.strictEqual(taskattachmentUpdated.uploadedBy.toString(), options.uploadedBy.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a taskattachment", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);
await app.service("tasks").Model.findByIdAndDelete(tasksCreated._id);;

      const taskattachmentDeleted = await thisService.Model.findByIdAndDelete(taskattachmentCreated._id);
      assert.strictEqual(taskattachmentDeleted._id.toString(), taskattachmentCreated._id.toString());
    });
  });
});