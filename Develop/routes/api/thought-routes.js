const router = require('express').Router();
const {
 addThought,
 removeThought,
 updateThought,
 getAllThought,
 getThoughtById,
 addReaction,
 removeReaction
  } = require('../../controllers/thought-controller');
  router
  .route('/')
  .get(getAllThought)
 

  router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought)
  .post(addThought)

  
  router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction)
  router
  .route('/:thoughtId/reactions')
  .post(addReaction);

  module.exports = router;