const express = require('express');
const router = express.Router();
const movieAPI = require('./movieAPI');

router.use(movieAPI);

module.exports = router;