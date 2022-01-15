const db = require("../config/database");

const userSchema = new db.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
});

module.exports = User = db.model("User", userSchema);
