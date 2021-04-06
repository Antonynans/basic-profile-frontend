const mongoose = require("mongoose");

const schema = mongoose.Schema({
  avatars: String,
  username: String,
<<<<<<< HEAD
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: String,
  phoneNumber: { type: String, default: "" },
  address:{ type: String, default: "" },
=======
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  address:String,
>>>>>>> 60176c5bb80f87361a40de33f6cacd4109d6b915
  password: String,
  level: {type: String, default: "normal"},
  created: {type: Date, default: Date.now}
});
schema.index({email: 1}, {unique: true});

const User = mongoose.model("users", schema);
module.exports = User;