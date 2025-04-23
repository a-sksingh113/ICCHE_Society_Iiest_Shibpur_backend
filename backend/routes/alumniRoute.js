const express = require("express");
const { getAllAlumni, getAlumniById} = require("../controllers/alumniController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();
router.get("/",cache(600), getAllAlumni);
router.get("/:id", getAlumniById);
module.exports = router;
