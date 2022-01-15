const db = require("../config/database");

const todoSchema = new db.Schema({
  text: { type: String, require: true },
  status: { type: Number, require: true },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: db.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Todo = db.model("Todo", todoSchema);
