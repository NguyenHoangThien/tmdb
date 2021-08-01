const express = require('express');
const router = express.Router();
const { movieController } = require('../controllers');

router.route('/movies')
  .get(movieController.getLists)

router.route('/movies/:id')
  .get(movieController.getDetails)

/**
 * Module exports
 */
module.exports = router;