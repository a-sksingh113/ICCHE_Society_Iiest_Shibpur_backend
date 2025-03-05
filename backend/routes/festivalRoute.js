const express = require("express");
const { getAllFestivals, getFestivalById} = require("../controllers/festivalController");
const router = express.Router();
router.get("/festivals", getAllFestivals);
router.get("/festivals/:id", getFestivalById);
module.exports = router;
