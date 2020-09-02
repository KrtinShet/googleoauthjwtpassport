const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  email: String,
  userType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

module.exports = User = mongoose.model('User', userSchema);
