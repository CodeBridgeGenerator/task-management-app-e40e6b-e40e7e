
    module.exports = function (app) {
        const modelName = "tasks";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            title: { type:  String , required: true, index: true, trim: true, comment: "Task Title, inputText, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , trim: true, comment: "Description, inputTextarea, false, true, true, true, true, true, true, , , , ," },
projectId: { type: Schema.Types.ObjectId, ref: "projects", comment: "Project, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, name," },
assigneeId: { type: Schema.Types.ObjectId, ref: "users", comment: "Assigned To, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, email," },
priority: { type:  String , required: true, index: true, trim: true, comment: "Priority, dropdown, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, index: true, trim: true, comment: "Status, dropdown, false, true, true, true, true, true, true, , , , ," },
dueDate: { type: Date, comment: "Due Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
startDate: { type: Date, comment: "Start Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
tags: { type: [String] , description: "isArray", comment: "Tags, chip, false, true, true, true, true, true, true, , , , ," },
estimatedHours: { type: Number, comment: "Estimated Hours, inputNumber, false, true, true, true, true, true, true, , , , ," },
completedAt: { type: Date, comment: "Completed At, p_calendar, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };