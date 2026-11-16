const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("projects service", async () => {
  let thisService;
  let projectCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("projects");

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
    assert.ok(thisService, "Registered the service (projects)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value","status":"new value","startDate":"2026-11-16T19:14:04.190Z","dueDate":"2026-11-16T19:14:04.190Z","managerId":"parentObjectId","memberIds":"parentObjectId","progress":23};

    beforeEach(async () => {
      projectCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new project", () => {
      assert.strictEqual(projectCreated.name, options.name);
assert.strictEqual(projectCreated.description, options.description);
assert.strictEqual(projectCreated.status, options.status);
assert.strictEqual(projectCreated.startDate.toISOString(), options.startDate);
assert.strictEqual(projectCreated.dueDate.toISOString(), options.dueDate);
assert.strictEqual(projectCreated.managerId.toString(), options.managerId.toString());
assert.strictEqual(projectCreated.memberIds.toString(), options.memberIds.toString());
assert.strictEqual(projectCreated.progress, options.progress);
    });
  });

  describe("#get", () => {
    it("should retrieve a project by ID", async () => {
      const retrieved = await thisService.Model.findById(projectCreated._id);
      assert.strictEqual(retrieved._id.toString(), projectCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value","status":"updated value","startDate":"2026-11-16T19:14:04.190Z","dueDate":"2026-11-16T19:14:04.190Z","managerId":`${usersCreated._id}`,"memberIds":`${usersCreated._id}`,"progress":100};

    it("should update an existing project ", async () => {
      const projectUpdated = await thisService.Model.findByIdAndUpdate(
        projectCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(projectUpdated.name, options.name);
assert.strictEqual(projectUpdated.description, options.description);
assert.strictEqual(projectUpdated.status, options.status);
assert.strictEqual(projectUpdated.startDate.toISOString(), options.startDate);
assert.strictEqual(projectUpdated.dueDate.toISOString(), options.dueDate);
assert.strictEqual(projectUpdated.managerId.toString(), options.managerId.toString());
assert.strictEqual(projectUpdated.memberIds.toString(), options.memberIds.toString());
assert.strictEqual(projectUpdated.progress, options.progress);
    });
  });

  describe("#delete", async () => {
    it("should delete a project", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const projectDeleted = await thisService.Model.findByIdAndDelete(projectCreated._id);
      assert.strictEqual(projectDeleted._id.toString(), projectCreated._id.toString());
    });
  });
});