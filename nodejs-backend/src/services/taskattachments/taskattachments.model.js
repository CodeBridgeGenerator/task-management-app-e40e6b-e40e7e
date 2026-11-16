
    module.exports = function (app) {
        const modelName = "taskattachments";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            taskId: { type: Schema.Types.ObjectId, ref: "tasks", comment: "Task, dropdown, false, true, true, true, true, true, true, tasks, tasks, one-to-one, title," },
fileName: { type:  String , required: true, index: true, trim: true, comment: "File Name, inputText, false, true, true, true, true, true, true, , , , ," },
fileUrl: { type:  String , required: true, trim: true, comment: "File URL, inputText, false, true, true, true, true, true, true, , , , ," },
uploadedBy: { type: Schema.Types.ObjectId, ref: "users", comment: "Uploaded By, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, email," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };