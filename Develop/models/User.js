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
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
      ],
    
      friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
      ]
    },
      {
        toJSON: {
          virtuals: true,
        },
        id: false
      }
  );
  // get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });
const User = model('User', UserSchema);

// export the User model
module.exports = User;