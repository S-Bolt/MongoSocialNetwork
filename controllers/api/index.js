const router = require('express').Router();
const userRoutes = require('/userRoutes');
const thoughtRoutes = require('/thoughRoutes');

router.use('/userRoutes', userRoutes);
router.use('/thoughRoutes', thoughtRoutes);

module.exports = router;
