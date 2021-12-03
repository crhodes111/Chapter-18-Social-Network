const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
    username: {
      type: String,
      unique: true,
      trim: true,
      required: 'Username is required'
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']

    },
    thoughts: [],
    
    friends:[]
    
  });
  
const User = model('User', UserSchema);

// export the Pizza model
module.exports = User;