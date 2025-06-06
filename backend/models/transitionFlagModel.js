const mongoose = require('mongoose');

const transitionFlagSchema = new mongoose.Schema({
  date: {
    type: String, 
    required: true,
    unique: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('TransitionFlag', transitionFlagSchema);
