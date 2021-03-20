const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require("./jwt");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.get("/", function(req, res, next) {
  return res.send("Hello Node.js");
})
const User = require("./models/userSchema");

app.post("/login", async (req, res) => {
  const doc = await User.findOne({ email: req.body.email });
  if (doc) {
    if (bcrypt.compareSync(req.body.password, doc.password)) {
      const payload = {
        id: doc._id,
        level: doc.level,
        email: doc.email
      };

      const token = jwt.sign(payload);
      console.log(token);
      res.json({ result: "success", token, message: "Login successful"});
    } else {
      // invalid password
      res.json({ result: "error", message: "Invalid password"});
    }
  } else {
    // invalid email
    res.json({ result: "error", message: "Invalid email" });
  }
});

app.post("/register", async (res, req) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    await User.create(req.body);
    res.json({ result: "success", message: "Registration successful!" });
  } catch (error) {
    res.json({ result:"error", message: error.errmsg });
  }
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});