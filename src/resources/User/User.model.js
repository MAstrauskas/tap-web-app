const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userMood: {
    type: String,
    required: false
  },
  tasks: [
    {
      taskId: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: false
      }
    }
  ]
});

module.exports = User = mongoose.model("User", UserSchema);
