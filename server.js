const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");

const app = express();

// DB config

const db = require("./config/dev_keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
