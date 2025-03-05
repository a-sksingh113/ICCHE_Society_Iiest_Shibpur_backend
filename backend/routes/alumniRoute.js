const express = require("express");
const { getAllAlumni, getAlumniById} = require("../controllers/alumniController");
const router = express.Router();
router.get("/", getAllAlumni);
router.get("/:id", getAlumniById);
module.exports = router;
