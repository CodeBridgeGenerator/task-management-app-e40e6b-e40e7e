
    module.exports = function (app) {
        const modelName = "projects";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, index: true, trim: true, comment: "Project Name, inputText, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , trim: true, comment: "Description, inputTextarea, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, index: true, trim: true, comment: "Status, dropdown, false, true, true, true, true, true, true, , , , ," },
startDate: { type: Date, comment: "Start Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
dueDate: { type: Date, comment: "Target Completion Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
managerId: { type: Schema.Types.ObjectId, ref: "users", comment: "Project Manager, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, email," },
memberIds: { type: [Schema.Types.ObjectId], ref: "users", description: "isArray", comment: "Team Members, multiselect, false, true, true, true, true, true, true, users, users, one-to-many, email," },
progress: { type: Number, comment: "Progress Percentage, inputNumber, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };