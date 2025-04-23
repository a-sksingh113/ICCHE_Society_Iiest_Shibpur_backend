const express = require("express");
const { getAllFreshersInductions, getFreshersInductionById } = require("../controllers/inductionController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();
router.get("/freshersInductions",cache(600), getAllFreshersInductions);
router.get("/freshersInductions/:id", getFreshersInductionById);
module.exports = router;