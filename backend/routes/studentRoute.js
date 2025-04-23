const express = require("express");
const { getAllStudents, getStudentById} = require("../controllers/studentController");
const cache = require('../middleware/redisMidlleware');
const router = express.Router();
router.get("/", cache(600),getAllStudents);
router.get("/:id", getStudentById);
module.exports = router;

