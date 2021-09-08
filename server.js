require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
mongoose.set("useFindAndModify", false);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Handle CORS
app.use(cors());

// Use routes
app.use("/api/users", users);
app.use("/api/posts", posts);

// Server static assets if in production
// if (process.env.NODE_ENV === "production") {
// Use static folder
app.use("/uploads", express.static("uploads"));
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// }

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

// Socket io config
const io = require("socket.io")(server);
const { socketManager } = require("./config/socketio");
io.on("connection", (socket) => {
  socketManager(socket);
});
app.set("socketio", io);
