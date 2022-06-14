const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a Schema 
const UserSchema = new Schema({

  googleID: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// create collection and add schema 
module.exports = User = mongoose.model('users', UserSchema);