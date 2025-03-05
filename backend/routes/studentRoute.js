const express = require("express");
const { getAllStudents, getStudentById } = require("../controllers/studentController");
const router = express.Router();
router.get("/", getAllStudents);
router.get("/:id", getStudentById);

module.exports = router;

