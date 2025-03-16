const express = require("express");
const { handleAddFeedback } = require("../controllers/feedbackController");
const router = express.Router();

router.post('/add-feedback', handleAddFeedback);

module.exports = router;