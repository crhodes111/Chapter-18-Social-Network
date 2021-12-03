const { Schema, model, Types } = require('mongoose');
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
      reactionBody: {
        type: String
      },
      username: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // get: createdAtVal => dateFormat(createdAtVal)
      }
    }
  );
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    Required: "Thought Text is required"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    Required: "Username is required"
  },
  reactions: [ReactionSchema]

},
{
    toJSON: {
      virtuals: true,
    },
    id: false
  }

);
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  })
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;