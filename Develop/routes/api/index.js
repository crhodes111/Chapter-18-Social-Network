const router = require('express').Router();
const UserRoutes = require('./User-routes');
const ThoughtRoutes = require('./Thought-routes');

// add prefix of `/Users` to routes created in `User-routes.js`
router.use('/Users', UserRoutes);
router.use('/Thought', ThoughtRoutes);

module.exports = router;