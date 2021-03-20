const mongoose = require("mongoose");

const schema = mongoose.schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  level: {type: String, default: "normal"},
  created: {type: Date, default: Date.now}
});
schema.index({email: 1}, {unique: true});

const User = mongoose.model("users", schema);
module.exports = User;