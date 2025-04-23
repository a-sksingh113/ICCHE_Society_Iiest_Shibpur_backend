const express = require("express");
const { getAllFestivals, getFestivalById} = require("../controllers/festivalController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();
router.get("/festivals",cache(600), getAllFestivals);
router.get("/festivals/:id", getFestivalById);
module.exports = router;
