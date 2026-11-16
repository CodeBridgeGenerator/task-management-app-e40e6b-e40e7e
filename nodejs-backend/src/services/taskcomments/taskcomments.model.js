
    module.exports = function (app) {
        const modelName = "taskcomments";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            taskId: { type: Schema.Types.ObjectId, ref: "tasks", comment: "Task, dropdown, false, true, true, true, true, true, true, tasks, tasks, one-to-one, title," },
userId: { type: Schema.Types.ObjectId, ref: "users", comment: "Commented By, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, email," },
comment: { type:  String , required: true, trim: true, comment: "Comment, inputTextarea, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };