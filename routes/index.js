const express = require('express');
const router = express.Router();

router.use('/login', require('./auth.routes'));
router.use('/category', require('./category.routes'));
router.use('/content', require('./content.routes'));
router.use('/theme', require('./theme.routes'));
router.use('/users', require('./users.routes'));

module.exports = router;