const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtsRoutes');

router.use('/userRoutes', userRoutes);
router.use('/thoughtsRoutes', thoughtRoutes);

module.exports = router;
