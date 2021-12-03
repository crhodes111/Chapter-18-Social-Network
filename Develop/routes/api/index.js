const router = require('express').Router();
const UserRoutes = require('./User-routes');

// add prefix of `/Users` to routes created in `User-routes.js`
router.use('/Users', UserRoutes);

module.exports = router;