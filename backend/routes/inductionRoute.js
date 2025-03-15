const express = require("express");
const { getAllFreshersInductions, getFreshersInductionById } = require("../controllers/inductionController");
const router = express.Router();
router.get("/freshersInductions", getAllFreshersInductions);
router.get("/freshersInductions/:id", getFreshersInductionById);
module.exports = router;