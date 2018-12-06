const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  bio: {
    type: String,
    default: 'Hello everyone',
  },
  avatar: {
    type: String,
  },
};

module.exports = Profile = mongoose.model('profile', ProfileSchema);
