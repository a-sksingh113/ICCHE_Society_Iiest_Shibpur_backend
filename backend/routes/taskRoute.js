const express = require('express');
const { runTransition } = require('../taskSheduler/task');
const router = express.Router();


router.post('/run-transition', runTransition); 

module.exports = router;
