const { Thought, User } = require('../models');

const ThoughtController = {
  // add Thought to User
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then((data) => {
        console.log(data);
         User.findOneAndUpdate(
          { _id: params.id },
          { $push: { thoughts: data._id } },
          { new: true }
        ).then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
      })
     
  

  },

  // remove Thought
  removeThought({ params }, res) {
    console.log(params.id)
    
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        console.log(deletedThought)
        if (!deletedThought) {
          return res.status(404).json({ message: 'No Thought with this id!' });
        }
         User.findOneAndUpdate(
          { _id: deletedThought.userId },
          { $pull: { thoughts: deletedThought.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  getAllThought(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => {
        // If no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions : body } },
        { new: true }
      )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

};

module.exports = ThoughtController;