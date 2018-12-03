const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');

const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

// Use images folder to save uploaded image
app.use('/images', express.static(path.join('images')));

// DB config
const db = require('./config/dev_keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {useNewUrlParser: true},
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Handle CORS
app.use(cors());

// Use routes
app.use('/api/users', users);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
